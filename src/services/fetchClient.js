// the client realizes methods named as http methods
export default class fetchClient {
  get(url) {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve([`ever cloud bread ennui unicorn irony tofu. Copper air plant coffee green juice vegan.`]);
    //   }, 1500);
    // });
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to fetch');
    })
  }
}