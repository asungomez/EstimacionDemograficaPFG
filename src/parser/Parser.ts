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

type DataItem = {
  [field: string]: string;
};

export type DataArrayType = {
  path: string[];
  data: DataItem[] | string[];
  commonKeys?: string[];
};

export type FileContents = {
  content: any;
  arrays?: DataArrayType[]
};

const mapConfiguration = (config: ParserDefinition): ParseConfig => ({
  delimiter: config.delimiter,
  newline: config.newLineFormat === 'guess' ? null : config.newLineFormat,
  header: config.headers,
  quoteChar: config.quoteChar.length > 0 ? config.quoteChar : null,
  escapeChar: config.escapeChar.length > 0 ? config.escapeChar : null,
  skipEmptyLines: config.skipEmptyLines === 'yes' ? true : config.skipEmptyLines === 'no' ? false : 'greedy',
});

const commonKeys = (data: DataItem[]) => {
  let keysIntersection = Object.keys(data[0]);
  for (const item of data) {
    const objectKeys = Object.keys(item);
    keysIntersection = keysIntersection.filter(key => objectKeys.includes(key));
  }
  return keysIntersection;
};

const arrayType = (data: any[]): 'string' | 'object' | 'error' => {
  if (typeof data[0] === 'object') {
    for (const dataItem of data) {
      if (typeof dataItem !== 'object' || Array.isArray(dataItem)) {
        return 'error';
      }
    }
    return 'object';
  }
  else {
    for (const dataItem of data) {
      if (typeof dataItem === 'object') {
        return 'error';
      }
      return 'string';
    }
  }
}

const extractArraysRecursive = (data: any, path: string[]): DataArrayType[] => {
  const arrays: DataArrayType[] = [];
  for (const key in data) {
    // Primitive data cannot be used as dataset, it needs to be
    // an array
    if (typeof data[key] === 'object') {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        const dataType = arrayType(data[key]);
        if (dataType === 'object') {
          // Arrays containing objects need to have at least one
          // common key between all objects
          const common = commonKeys(data[key]);
          if (common.length > 0) {
            arrays.push({
              path: [...path, key],
              data: data[key],
              commonKeys: common,
            });
          }
        }
        else if (dataType === 'string') {
          // Arrays containing strings will be interpreted as
          // text arrays
          arrays.push({
            path: [...path, key],
            data: data[key].map((item: any) => ''+item)
          });
        }
      } else {
        // Look for arrays in the nested object
        const nestedArrays = extractArraysRecursive(data[key], [...path, key]);
        arrays.push(...nestedArrays);
      }
    }
  }
  return arrays;
};

const extractArrays = (data: any) => extractArraysRecursive(data, []);


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
      if (!config) {
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

  public static parseFile(file: File, type: FileType, config?: ParserDefinition): Promise<FileContents> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.onload = () => {
        const stringContent: string = fileReader.result as string;
        try {
          const objectContent: any = parsers[type].parser(stringContent, config);
          if (typeof objectContent === 'object') {
            if (Array.isArray(objectContent)) {
              // If the root object is an array, check if it's
              // a valid array
              const dataType = arrayType(objectContent);
              if(dataType === 'object') {
                // Arrays of objects must have at least one
                // common key between all objects.
                // That key can be interpreted as the text
                // to analyze.
                const common = commonKeys(objectContent);
                if(common.length > 0) {
                  resolve({
                    content: objectContent,
                    arrays: [{
                      path: [],
                      data: objectContent,
                      commonKeys: common
                    }]
                  })
                }
                else {
                  reject({message: 'The contents array doesn\'t meet the parsing requirements'});
                }
              }
              else if(dataType === 'string') {
                // String arrays will be interpreted as text arrays
                // without any additional metadata
                resolve({
                  content: objectContent,
                  arrays: [{
                    path: [],
                    data: objectContent.map(item => ''+item)
                  }]
                })
              }
              else {
                reject({message: 'The contents array doesn\'t meet the parsing requirements'});
              }
            }
            else {
              // If the root object is an object, it needs to have at least one 
              // array in its properties
              const arrays = extractArrays(objectContent);
              if(arrays.length > 0) {
                resolve({
                  content: objectContent,
                  arrays: arrays
                });
              }
              else {
                reject({
                  message: 'The file contents must have at least one array'
                })
              }
            }
          }
          else {
            reject({
              message: 'The file contents must be an array or an object'
            })
          }
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