// clien realizes methods named as http methods
export default class fetchClient {
  get() {
    return new Promise((resolve) => {
      resolve([`Whatever vexillologist church-key, sriracha tumblr food truck kitsch umami. Hell of edison bulb fixie street art, YOLO cloud bread ennui unicorn seitan irony meggings yuccie selvage tofu lyft. Copper mug air plant mixtape jianbing. Narwhal hexagon single-origin coffee green juice vegan. Hashtag drinking vinegar cred retro fanny pack. Dreamcatcher asymmetrical live-edge chartreuse hammock vexillologist godard iceland.`]);
    });
    // return fetch(url).then((response) => {
    //   if (response.ok) {
    //     return response.json()
    //   }

    //   throw new Error('Не удалость загрузить текст');
    // })
  }
}