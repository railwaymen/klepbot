import ErrorsHelpers from "../helpers/errors-helpers";

const DEFAULT_API_URL = '/api';

class ApiService {
  static parseArray(array, attributeName) {
    array.map(element => (
      `${attributeName}[]=${element}`
    )).join('&')
  }

  static httpResponse = async (response) => {
    const { status } = response;

    if (status === 201 || status === 204) return true;
    else if (status >= 200 && status < 400) return response.json();
    else throw response.json().then(e => new ErrorsHelpers(e));
  }

  static get = async (params) => {
    const response = await fetch(`${DEFAULT_API_URL}/${params.url}`);

    return ApiService.httpResponse(response);
  }

  static post = async (params) => {
    const response = await fetch(`${DEFAULT_API_URL}/${params.url}`, {
      body: params.body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });

    return ApiService.httpResponse(response);
  }

  static put = async (params) => {
    const response = await fetch(`${DEFAULT_API_URL}/${params.url}`, {
      body: params.body,
      method: 'PUT',
      headers: params.headers || {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });

    return ApiService.httpResponse(response);
  }

  static delete = (params) => {
    return fetch(`${DEFAULT_API_URL}/${params.url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    }).then((response) => {
      if (response.status === 204) return;

      if (response.status >= 200 && response.status < 400) {
        return response.json();
      } else {
        return response.json().then(e => {throw new ErrorsHelpers(e)});
      }
    })
  }
}

export default ApiService;
