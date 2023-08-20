import { pipeline } from '@xenova/transformers'
import { loadingMessage } from "./loading"

var data = null
export async function transcribeAudio(){
  const options = {
    chunk_length_s: 30,
    stride_length_s:5,
    language: 'portuguese',
    task: 'transcribe',
    return_timestamps: true,
  }

  try {
    console.time()
    loadingMessage('Transcribiendo audio...')

    const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small')
    console.log(transcriber)
    data = await transcriber('../audio.mp3', options)

  } catch (error) {
    throw new Error(error)
  }finally{
    console.timeEnd()
    console.log(data)
    return data
  }

}