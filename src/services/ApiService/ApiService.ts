import { API } from 'aws-amplify';

type CachedResponse = {
  response: any;
  expirationTime: number;
};

let cache: { [path: string]: CachedResponse } = {};

const buildRequest = async (body: any) => {
  let request: any = {};
  if (body) {
    request.body = body;
  }
  return request;
};

class ApiService {
  public static clearCache(path: string = null) {
    if (path) {
      delete cache[path];
    } else {
      cache = {};
    }
  }

  public static async delete(
    path: string,
    requestBody: any = null
  ): Promise<any> {
    try {
      const response = await API.del(
        'pfgapi',
        path,
        await buildRequest(requestBody)
      );
      return Promise.resolve(response);
    } catch (e) {
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.log('API error in DELETE ' + path, e);
      }
      return Promise.reject(e);
    }
  }

  private static async getRequest(
    path: string
  ): Promise<any> {
    try {
      const response = await API.get('pfgapi', path, null);
      cache[path] = {
        response: response,
        expirationTime: new Date().getTime() + 60000,
      };
      return Promise.resolve(response);
    } catch (e) {
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.log('API error in GET ' + path, e);
      }
      return Promise.reject(e);
    }
  }

  public static async get(
    path: string,
    cached: boolean = true
  ): Promise<any> {
    if (cached) {
      if (cache[path]) {
        if (cache[path].expirationTime >= new Date().getTime()) {
          return Promise.resolve(cache[path].response);
        } else {
          delete cache[path];
          return this.getRequest(path);
        }
      } else {
        return this.getRequest(path);
      }
    } else {
      return this.getRequest(path);
    }
  }

  public static async post(
    path: string,
    requestBody: any = null
  ): Promise<any> {
    try {
      const response = await API.post(
        'pfgapi',
        path,
        await buildRequest(requestBody)
      );
      return Promise.resolve(response);
    } catch (e) {
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.log('API error in POST ' + path, e);
      }
      return Promise.reject(e);
    }
  }

  public static async put(
    path: string,
    requestBody: any = null
  ): Promise<any> {
    try {
      const response = await API.put(
        'pfgapi',
        path,
        await buildRequest(requestBody)
      );
      return Promise.resolve(response);
    } catch (e) {
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.log('API error in PUT ' + path, e);
      }
      return Promise.reject(e);
    }
  }
}

export default ApiService;
