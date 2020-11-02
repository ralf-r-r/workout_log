import { DataAccess } from '../dataAccess/dataAccess'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

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