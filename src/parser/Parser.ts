import yaml from 'js-yaml';
import Papa from 'papaparse';

export type FileType = 'json' | 'yaml' | 'csv' | 'custom';

class Parser {
  public static guessFileTypeFromExtension(filename : string) : FileType {
    const filenameParts = filename.split('.');
    const extension = filenameParts[filenameParts.length - 1];
    if(extension === 'json') {
      return 'json';
    }
    if(extension === 'yml' || extension === 'yaml') {
      return 'yaml';
    }
    if(extension === 'csv') {
      return 'csv';
    }
    return 'custom';
  }

  private static parseCsvString(text: string) : any {
    const parseResult = Papa.parse(text, {header: true});
    if(parseResult.data.length === 0) {
      if(parseResult.errors.length > 0) {
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

  public static parseFile(file: File, type: FileType) : Promise<any> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.onload = () => {
        const stringContent : string = fileReader.result as string;
        try {
          let objectContent : any = {};
          if(type === 'json') {
            objectContent = Parser.parseJsonString(stringContent)
          }
          else if(type === 'yaml') {
            objectContent = Parser.parseYamlString(stringContent);
          }
          else if(type === 'csv') {
            objectContent = Parser.parseCsvString(stringContent);
          }
          resolve(objectContent);
        }
        catch(e) {
          reject(e);
        }
      }

      fileReader.readAsText(file);
    });
  }

  private static parseJsonString(text: string) : any {
    return JSON.parse(text);
  }

  private static parseYamlString(text: string) : any {
    return yaml.load(text);
  }

  public static supportedFormats() : {name: string, type: FileType}[] {
    return [
      {
        name: 'JSON',
        type: 'json'
      },
      {
        name: 'YAML',
        type: 'yaml'
      },
      {
        name: 'CSV',
        type: 'csv'
      },
      {
        name: 'Formato personalizado',
        type: 'custom'
      }
    ]
  }
};

export default Parser;