import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId,token } from '../env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'jzme8bpp',
  dataset: dataset || 'production',
  token: token
})

export const urlForImage = (source) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
