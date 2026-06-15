import { api } from './api'
import { TypeOfTags } from '../types'

export const fetchTagsApi = async (): Promise<TypeOfTags[]> => {
  const res = await fetch(`${api}/tags`)

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.msg)
  }

  return res.json()
}