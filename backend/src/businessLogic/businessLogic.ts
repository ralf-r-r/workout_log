import { DataAccess } from '../dataAccess/dataAccess'
import { createLogger } from '../utils/logger'
import { SessionItem } from '../models/TrainingData'
import * as uuid from 'uuid'
import { CreateSessionRequest } from '../requests/CreateSessionRequest'

const logger = createLogger('todo_app_logger')
const dataAccess = new DataAccess()

export async function generateUploadUrl(userId:string, sessionId:string) {
    const imageId: string = uuid.v4()
    const uploadUrl:string = await dataAccess.generateUploadUrl(userId, imageId, sessionId)
    const attachmentUrl:string = await dataAccess.updateUrl(userId, imageId, sessionId)
    logger.info('Generated upload url and updated attachmentUrl in todoItem', {
        userId: userId,
        tainingPlanId: sessionId,
        uploadUrl: uploadUrl,
        attachmentUrl: attachmentUrl
    })
    return {uploadUrl:uploadUrl, attachmentUrl: attachmentUrl}
}

export async function getTrainingPlans(userId: string) {
    logger.info('Getting all Training palns', {
        userId: userId,
    })
    return await dataAccess.getTrainingPlans(userId)
}

export async function createSession(newSessionRequest: CreateSessionRequest, userId:string) {
    const sessionId: string = uuid.v4()
  
    const newItem:SessionItem  = {
      userId: userId,
      sessionId: sessionId,
      ...newSessionRequest,
    }

    await dataAccess.createSession(newItem)

    logger.info('Created new item', {
        userId: userId,
        sessionId: sessionId,  
    })

    return newItem
}

export async function getSessions(userId: string) {
    logger.info('Getting all todo items', {
        userId: userId,
    })
    return await dataAccess.getSessions(userId)
}

export async function deleteSession(userId: string, sessionId: string) {
    logger.info('Deleting todo item', {
        userId: userId,
        sessionId: sessionId,  
    })
    await dataAccess.deleteSession(userId, sessionId)
}