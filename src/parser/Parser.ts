import yaml from 'js-yaml';

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
};

export default Parser;