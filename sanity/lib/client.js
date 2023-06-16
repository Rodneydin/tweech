import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn,token } from '../env'

export const client = createClient({
  apiVersion,
  projectId: projectId || 'jzme8bpp',
  dataset: dataset || 'production',
  useCdn,
  token,
})
