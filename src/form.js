import axios from "axios"
import { startLoading, stopLoading, loadingMessage } from "./loading"
import { getVideoId, loadingVideo } from "./youtube-api"
import { transcribeAudio } from "./transcribe"
import { renderText } from "./render"

const form = document.querySelector('#form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {
    loadingMessage('Transcribing...')
    startLoading()
    const formData = new FormData(form)
    const url = formData.get('url')
    await loadingVideo(url)

    loadingMessage('Converting..')
    await axios.get('http://localhost:3333/audio?v=' + getVideoId(url))

    const data = await transcribeAudio()
    renderText(data)
  } catch (error) {
    console.log('Submit error: ', error)
  }finally{
    stopLoading()
  }
})