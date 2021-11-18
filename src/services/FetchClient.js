// the client realizes methods named as http methods
export default class FetchClient {
  get(url) {
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to fetch');
    })
  }
}