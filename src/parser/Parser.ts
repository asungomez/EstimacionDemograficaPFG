import yaml from 'js-yaml';
import Papa, { ParseConfig } from 'papaparse';

export const newLineFormats = [
  {
    name: 'windows',
    label: 'Windows',
    value: '\r\n',
  },
  {
    name: 'unix',
    label: 'Unix',
    value: '\n',
  },
  {
    name: 'guess',
    label: 'Inferir',
    value: undefined,
  },
];

const newLineNames = newLineFormats.map(format => format.name);
export type NewLineFormat = typeof newLineNames[number];

export const skipEmptyLinesOptions = [
  {
    name: 'no',
    label: 'No',
    value: false,
  },
  {
    name: 'yes',
    label: 'Omitir cadenas vacías',
    value: true,
  },
  {
    name: 'greedy',
    label: 'Omitir cadenas vacías y espacios',
    value: 'greedy',
  },
];

const skipEmptyLinesOptionNames = skipEmptyLinesOptions.map(
  option => option.name
);
export type SkipEmptyLineOption = typeof skipEmptyLinesOptionNames[number];

export type FileType = 'json' | 'yaml' | 'csv' | 'custom';

export type ParserDefinition = {
  delimiter: string;
  newLineFormat: NewLineFormat;
  headers: boolean;
  quoteChar?: string;
  escapeChar?: string;
  skipEmptyLines?: SkipEmptyLineOption;
};

type ParsersDefinition = {
  [type in FileType]: {
    name: string;
    parser: (text: string, config?: ParserDefinition) => any;
  };
};

export type RawDataItem = {
  [field: string]: string;
};

export type DataArrayType = {
  path: string[];
  data: RawDataItem[] | string[];
  commonKeys?: string[];
};

export type FileContents = {
  content: any;
  arrays?: DataArrayType[];
};

const mapConfiguration = (config: ParserDefinition): ParseConfig => ({
  delimiter: config.delimiter,
  newline: config.newLineFormat === 'guess' ? null : config.newLineFormat,
  header: config.headers,
  quoteChar: config.quoteChar.length > 0 ? config.quoteChar : null,
  escapeChar: config.escapeChar.length > 0 ? config.escapeChar : null,
  skipEmptyLines:
    config.skipEmptyLines === 'yes'
      ? true
      : config.skipEmptyLines === 'no'
      ? false
      : 'greedy',
});

const commonKeys = (data: RawDataItem[]) => {
  let keysIntersection = Object.keys(data[0]);
  for (const item of data) {
    const objectKeys = Object.keys(item);
    keysIntersection = keysIntersection.filter(key => objectKeys.includes(key));
  }
  return keysIntersection;
};

const arrayType = (data: any[]): 'string' | 'object' | 'array' | 'error' => {
  if (typeof data[0] === 'object') {
    let isArrayOfArrays = Array.isArray(data[0]);
    for (const dataItem of data) {
      if (
        typeof dataItem !== 'object' ||
        Array.isArray(dataItem) !== isArrayOfArrays
      ) {
        return 'error';
      }
    }
    return isArrayOfArrays ? 'array' : 'object';
  } else {
    for (const dataItem of data) {
      if (typeof dataItem === 'object') {
        return 'error';
      }
      return 'string';
    }
  }
};

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
        } else if (dataType === 'string') {
          // Arrays containing strings will be interpreted as
          // text arrays
          arrays.push({
            path: [...path, key],
            data: data[key].map((item: any) => '' + item),
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
    parser: text => JSON.parse(text),
  },
  yaml: {
    name: 'YAML',
    parser: text => yaml.load(text),
  },
  csv: {
    name: 'CSV',
    parser: text => {
      const parseResult = Papa.parse(text, {
        header: true,
        skipEmptyLines: 'greedy',
      });
      if (parseResult.data.length === 0) {
        if (parseResult.errors.length > 0) {
          throw new Error(parseResult.errors[0].message);
        } else {
          throw new Error('Empty dataset');
        }
      } else {
        return parseResult.data;
      }
    },
  },
  custom: {
    name: 'Fichero personalizado',
    parser: (text, config) => {
      if (!config) {
        throw new Error(
          'Configuration must be defined for parsing custom file formats'
        );
      }
      const parseResult = Papa.parse(text, mapConfiguration(config));
      if (parseResult.data.length === 0) {
        if (parseResult.errors.length > 0) {
          throw new Error(parseResult.errors[0].message);
        } else {
          throw new Error('Empty dataset');
        }
      } else {
        return parseResult.data;
      }
    },
  },
};

const transformArrayToObject = (array: string[]): { [key: string]: string } => {
  const object: { [key: string]: string } = {};
  array.forEach((item, index) => (object['' + index] = item));
  return object;
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

  static parseArraysArray(
    array: any[][],
    resolve: (value: FileContents | PromiseLike<FileContents>) => void,
    reject: (reason: { message: string }) => void
  ) {
    // Nested arrays must all be string arrays
    let valid = true;
    let minLength = array[0].length;
    for (const nestedArray of array) {
      if (arrayType(nestedArray) !== 'string') {
        valid = false;
        reject({
          message: 'Nested arrays must be string arrays',
        });
      }
      if (nestedArray.length < minLength) {
        minLength = nestedArray.length;
      }
    }
    if (valid) {
      resolve({
        content: array,
        arrays: [
          {
            path: [],
            data: array.map(item => transformArrayToObject(item)),
            commonKeys: Array.from(Array(minLength).keys()).map(
              item => '' + item
            ),
          },
        ],
      });
    }
  }

  static parseObjectsArray(
    array: any[],
    resolve: (value: FileContents | PromiseLike<FileContents>) => void,
    reject: (reason: { message: string }) => void
  ) {
    // Arrays of objects must have at least one
    // common key between all objects.
    // That key can be interpreted as the text
    // to analyze.
    const common = commonKeys(array);
    if (common.length > 0) {
      resolve({
        content: array,
        arrays: [
          {
            path: [],
            data: array,
            commonKeys: common,
          },
        ],
      });
    } else {
      reject({
        message: "The contents array doesn't meet the parsing requirements",
      });
    }
  }

  static parseStringsArray(
    array: any[],
    resolve: (value: FileContents | PromiseLike<FileContents>) => void
  ) {
    // String arrays will be interpreted as text arrays
    // without any additional metadata
    resolve({
      content: array,
      arrays: [
        {
          path: [],
          data: array.map(item => '' + item),
        },
      ],
    });
  }

  static parseArray(
    array: any[],
    resolve: (value: FileContents | PromiseLike<FileContents>) => void,
    reject: (reason: { message: string }) => void
  ) {
    // If the root object is an array, check if it's
    // a valid array
    const dataType = arrayType(array);
    if (dataType === 'object') {
      this.parseObjectsArray(array, resolve, reject);
    } else if (dataType === 'string') {
      this.parseStringsArray(array, resolve);
    } else if (dataType === 'array') {
      this.parseArraysArray(array, resolve, reject);
    } else {
      reject({
        message: "The contents array doesn't meet the parsing requirements",
      });
    }
  }

  static parseObject(
    object: any,
    resolve: (value: FileContents | PromiseLike<FileContents>) => void,
    reject: (reason: { message: string }) => void
  ) {
    // If the root object is an object, it needs to have at least one
    // array in its properties
    const arrays = extractArrays(object);
    if (arrays.length > 0) {
      resolve({
        content: object,
        arrays: arrays,
      });
    } else {
      reject({
        message: 'The file contents must have at least one array',
      });
    }
  }

  public static parseFile(
    file: File,
    type: FileType,
    config?: ParserDefinition
  ): Promise<FileContents> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.onload = () => {
        const stringContent: string = fileReader.result as string;
        try {
          const objectContent: any = parsers[type].parser(
            stringContent,
            config
          );
          console.log(objectContent);
          if (typeof objectContent === 'object') {
            if (Array.isArray(objectContent)) {
              this.parseArray(objectContent, resolve, reject);
            } else {
              this.parseObject(objectContent, resolve, reject);
            }
          } else {
            reject({
              message: 'The file contents must be an array or an object',
            });
          }
        } catch (e) {
          reject(e);
        }
      };

      fileReader.readAsText(file);
    });
  }

  public static supportedFormats(): { name: string; type: FileType }[] {
    const formats = [];
    for (const format in parsers) {
      formats.push({
        name: parsers[format as FileType].name,
        type: format as FileType,
      });
    }
    return formats;
  }
}

export default Parser;
