import extractPeaks from 'webaudio-peaks'

// Получение arraybuffer по url
async function getArrayBuffer (url) {
  
  const result = await new Promise(resolve => {

    let request = new XMLHttpRequest
    
    request.open("GET", url, true)
    request.responseType = 'arraybuffer'
    request.onload = () => { 
    resolve(request.response)
  }
    request.send()
  })

  return result
}

// Извлечение сэмплов из arryabuffer
export default async function getPeaksArray(URL) {

  const audioContext = new AudioContext()
  const normalizedBuffer = []

  try {
    const arrayBuffer = await getArrayBuffer(URL)

    await audioContext.decodeAudioData(arrayBuffer, (decodedData) => {

      const samplesPerPixel = 350 // Количество сэмплов для расчёта одного пика
      const isMono = true // Объединение всех каналов
      const peaks = extractPeaks(decodedData, samplesPerPixel, isMono)
      const samples = 233 // Конечное количество пиков на выходе
      const blockSize = Math.floor(peaks.data[0].length / samples)

      // Нахождение среднего значения для внутри группы сэмплов
      for (let i = 0; i < samples; i++) {

        let blockStart = blockSize * i
        let sum = 0

        for (let j = 0; j < blockSize; j++) {
          sum = sum + Math.abs(peaks.data[0][blockStart + j])
        }
        normalizedBuffer.push(sum / blockSize)
      }
    })
  } catch (error) {
    console.error(error)
  }

  return normalizedBuffer
}
