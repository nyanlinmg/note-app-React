import { api, apiClient } from './apiClient'
import { TypeOfTags } from '../types'

export const fetchTagsApi = async (): Promise<TypeOfTags[]> => {
  return apiClient(`/tags`);
}