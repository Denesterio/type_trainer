import fetchClient from './fetchClient.js';

// build routes
const routes = {
  HOST: 'https://baconipsum.com',
  API_PREFIX: 'api',
  text(id = '') {
    return [this.HOST, this.API_PREFIX, id].join("/")
  },
};

// use partial application; it's simpler for simple task
const buildRequest = (client, type, path, params = {}) =>
  client[type](path, params);

const makeRequest = (type, path, params) =>
  buildRequest(new fetchClient(), type, path, params);

const makeUrl = (target, params = {}) => {
  const path = params?.id ? routes[target](params.id) : routes[target]();
  const url = new URL(path);
  const searchKeys = Object.keys(params).filter((key) => key !== 'id');
  if (searchKeys.length > 0) {
    for (const key of searchKeys) {
      url.searchParams.append(key, params[key]);
    }
  }

  return url;
}

// function for each method
const get = (target, params) => {
  const url = makeUrl(target, params);
  return makeRequest("get", url);
};

export default {
  get,
};