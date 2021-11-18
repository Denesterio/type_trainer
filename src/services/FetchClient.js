// the client realizes methods named as http methods
export default class FetchClient {
  get() {
    return new Promise((resolve) => {
      resolve(['even office pork ion rest yoll papa stay directly']);
    });
    // return fetch(url).then((response) => {
    //   if (response.ok) {
    //     return response.json();
    //   }

    //   throw new Error('Failed to fetch');
    // })
  }
}