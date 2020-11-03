import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { SessionRequest } from '../../models/trainingData'
import { updateSession } from "../../businessLogic/businessLogic"
import { getUserId } from "../utils"


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const sessionId = event.pathParameters.sessionId
  const updatedSession: SessionRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  await updateSession(userId, sessionId, updatedSession)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      body: ''
    })
  }
}
