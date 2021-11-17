// clien realizes methods named as http methods
export default class fetchClient {
  get(url) {
    // return new Promise((resolve) => {
    //   resolve([`ever cloud bread ennui unicorn irony tofu. Copper air plant coffee green juice vegan.`]);
    // });
    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json()
      }

      throw new Error('Не удалость загрузить текст');
    })
  }
}