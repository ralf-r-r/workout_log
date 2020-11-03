import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { generateUploadUrl } from '../../businessLogic/businessLogic'
import { getUserId } from '../utils'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const userId = getUserId(event)
  const sessionId = event.pathParameters.sessionId
  const result = await generateUploadUrl(userId, sessionId)

  const presignedUrl:string = result.uploadUrl
  const attachmentUrl:string = result.attachmentUrl

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: presignedUrl,
      attachmentUrl: attachmentUrl
    })
  }
}
