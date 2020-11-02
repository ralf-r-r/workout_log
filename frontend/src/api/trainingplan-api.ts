import { apiEndpoint } from '../config'
import Axios from 'axios'

interface trainingPromise {
  attachmentUrl:string
}

interface UrlResult {
  uploadUrl: string
  attachmentUrl: string
}

export async function getUploadUrl(idToken: string, sessionId:string): Promise<UrlResult> {
  const response = await Axios.post(`${apiEndpoint}/trainingdata/attachment/${sessionId}`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}

export async function getTrainingSessions(idToken: string): Promise<trainingPromise> {  
  const response = await Axios.get(`${apiEndpoint}/trainingsessions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  return response.data
}