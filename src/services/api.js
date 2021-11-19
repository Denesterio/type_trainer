// build routes
const routes = {
  HOST: 'https://baconipsum.com',
  API_PREFIX: 'api',
  text() {
    return [this.HOST, this.API_PREFIX].join("/")
  },
};

const makeUrl = (params = {}) => {
  const path = routes.text();
  const url = new URL(path);
  const searchKeys = Object.keys(params);
  if (searchKeys.length > 0) {
    for (const key of searchKeys) {
      url.searchParams.append(key, params[key]);
    }
  }

  return url;
}

// functions for each method
const fetchText = (params) => {
  const url = makeUrl(params);
  return new Promise((resolve) => {
    if (url) {
      resolve(['even office pork ion rest yoll papa stay directly']);
    }
  });
// return fetch(url).then((response) => {
//   if (response.ok) {
//     return response.json();
//   }
//   throw new Error('Failed to fetch');
// })
};

export default fetchText;