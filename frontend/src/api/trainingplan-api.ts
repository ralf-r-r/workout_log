import { apiEndpoint } from '../config'
import Axios from 'axios'
import { Session, SessionRequest } from '../types/trainingData'

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

export async function getSessions(idToken: string): Promise<Session[]> {  
  const response = await Axios.get(`${apiEndpoint}/sessions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  return response.data.items
}

export async function createTrainingSession(idToken: string,newSessionRequest: SessionRequest): Promise<Session> {
  const response = await Axios.post(`${apiEndpoint}/createsession`,  JSON.stringify(newSessionRequest), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function deleteTrainingSession(idToken: string, sessionId: string): Promise<void>{
  await Axios.delete(`${apiEndpoint}/deletesession/${sessionId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function updateSession(idToken: string,
  sessionId: string,
  newSessionRequest: SessionRequest): Promise<void> {
  await Axios.patch(`${apiEndpoint}/updatesession/${sessionId}`,  JSON.stringify(newSessionRequest), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}