import connect from "@vkontakte/vk-connect";
connect.subscribe(() => {});

export default class VkService {
  onMovieShare(movieId) {
    connect.send("VKWebAppShare", {
      link: `https://vk.com/app7273858#movieId=${movieId}&view=movie`
    });
  }
}
