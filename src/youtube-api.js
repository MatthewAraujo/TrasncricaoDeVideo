import { loadingMessage } from "./loading";

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // 3. This function creates an <iframe> (and YouTube player)

window.YTPlayer = null

export function getVideoId(url){
  const [, part2] = url.split('?v=')
  const [videoId, ] = part2.split('&')
  return videoId
}

export function loadingVideo(url){
  loadingMessage('Loading video...')
  return new Promise((resolve, reject) => {
    window.YTPlayer = new window.YT.Player('youtubeVideo', {
      videoId: getVideoId(url),
      events: {
        'onReady': resolve()
      }
    })
  })
 
}