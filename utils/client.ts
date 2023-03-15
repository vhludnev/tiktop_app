import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '9kwq6gem',
  dataset: 'production',
  apiVersion: '2023-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})
