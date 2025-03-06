import FingerprintJS from '@fingerprintjs/fingerprintjs'

export const generateFingerprint = async () => {
  try {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return `fp::${result.visitorId}`
  } catch (error) {
    console.error('Failed to generate fingerprint:', error)
    return `failed to generate fingerprint`
  }
}

export const replaceSvgFill = (dataUrl: string, newColor: string): string => {
  // Разделяем Data URL на mime-тип и содержимое
  const [prefix, encodedSvg] = dataUrl.split(',')

  // Декодируем URL-encoded строку в исходный SVG
  const decodedSvg = decodeURIComponent(encodedSvg)

  // Заменяем значение fill в <path>
  const modifiedSvg = decodedSvg.replace(/fill=(['"])([^'"]*)\1/, `fill="${newColor}"`)

  // Кодируем обратно в URL-encoded формат и собираем Data URL
  const newEncodedSvg = encodeURIComponent(modifiedSvg)
  return `${prefix},${newEncodedSvg}`
}
