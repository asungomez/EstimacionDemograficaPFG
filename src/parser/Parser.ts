import yaml from 'js-yaml';
import Papa, { ParseConfig } from 'papaparse';

export const newLineFormats = [
  {
    name: 'windows',
    label: 'Windows',
    value: '\r\n'
  },
  {
    name: 'unix',
    label: 'Unix',
    value: '\n'
  },
  {
    name: 'guess',
    label: 'Inferir',
    value: undefined
  }
];

const newLineNames = newLineFormats.map(format => format.name);
export type NewLineFormat = typeof newLineNames[number];

export const skipEmptyLinesOptions = [
  {
    name: 'no',
    label: 'No',
    value: false
  },
  {
    name: 'yes',
    label: 'Omitir cadenas vacías',
    value: true
  },
  {
    name: 'greedy',
    label: 'Omitir cadenas vacías y espacios',
    value: 'greedy'
  }
];

const skipEmptyLinesOptionNames = skipEmptyLinesOptions.map(option => option.name);
export type SkipEmptyLineOption = typeof skipEmptyLinesOptionNames[number];

export type FileType = 'json' | 'yaml' | 'csv' | 'custom';

export type ParserDefinition = {
  delimiter: string;
  newLineFormat: NewLineFormat;
  headers: boolean;
  quoteChar?: string;
  escapeChar?: string;
  skipEmptyLines?: SkipEmptyLineOption;
}

type ParsersDefinition = {
  [type in FileType]: {
    name: string,
    parser: (text: string, config?: ParserDefinition) => any;
  }
}

const mapConfiguration = (config: ParserDefinition) : ParseConfig => ({
  delimiter: config.delimiter,
  newline: config.newLineFormat === 'guess' ? null : config.newLineFormat,
  header: config.headers,
  quoteChar: config.quoteChar.length > 0 ? config.quoteChar : null,
  escapeChar: config.escapeChar.length > 0 ? config.escapeChar : null,
  skipEmptyLines: config.skipEmptyLines === 'yes' ? true : config.skipEmptyLines === 'no' ? false : 'greedy',
});

const parsers: ParsersDefinition = {
  json: {
    name: 'JSON',
    parser: (text) => JSON.parse(text)
  },
  yaml: {
    name: 'YAML',
    parser: (text) => yaml.load(text)
  },
  csv: {
    name: 'CSV',
    parser: (text) => {
      const parseResult = Papa.parse(text, { header: true, skipEmptyLines: 'greedy' });
      if (parseResult.data.length === 0) {
        if (parseResult.errors.length > 0) {
          throw new Error(parseResult.errors[0].message);
        }
        else {
          throw new Error('Empty dataset');
        }
      }
      else {
        return parseResult.data;
      }
    }
  },
  custom: {
    name: 'Fichero personalizado',
    parser: (text, config) => {
      if(!config) {
        throw new Error('Configuration must be defined for parsing custom file formats');
      }
      const parseResult = Papa.parse(text, mapConfiguration(config));
      if (parseResult.data.length === 0) {
        if (parseResult.errors.length > 0) {
          throw new Error(parseResult.errors[0].message);
        }
        else {
          throw new Error('Empty dataset');
        }
      }
      else {
        return parseResult.data;
      }
    }
  },
};

class Parser {

  public static guessFileTypeFromExtension(filename: string): FileType {
    const filenameParts = filename.split('.');
    const extension = filenameParts[filenameParts.length - 1];
    if (extension === 'json') {
      return 'json';
    }
    if (extension === 'yml' || extension === 'yaml') {
      return 'yaml';
    }
    if (extension === 'csv') {
      return 'csv';
    }
    return 'custom';
  }

  public static parseFile(file: File, type: FileType, config?: ParserDefinition): Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.onload = () => {
        const stringContent: string = fileReader.result as string;
        try {
          const objectContent: any = parsers[type].parser(stringContent, config);
          resolve(objectContent);
        }
        catch (e) {
          reject(e);
        }
      }

      fileReader.readAsText(file);
    });
  }

  public static supportedFormats(): { name: string, type: FileType }[] {
    const formats = [];
    for (const format in parsers) {
      formats.push({
        name: parsers[format as FileType].name,
        type: format as FileType
      });
    }
    return formats;
  }
};

export default Parser;