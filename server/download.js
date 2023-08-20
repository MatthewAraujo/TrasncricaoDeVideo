import ytdl from "ytdl-core";
import fs from "fs";

export const downloader = (videoId) => new Promise((resolve, reject) => {
  const videoURL = 'https://www.youtube.com/watch?v=' + videoId

  ytdl(videoURL, { 
    quality: 'lowestaudio',
    filter: 'audioonly' 
  }).on('end', () => {
    resolve()
  }).on('error', (error) => {
    reject(error)
  }).pipe(fs.createWriteStream('audio.mp4'))
})