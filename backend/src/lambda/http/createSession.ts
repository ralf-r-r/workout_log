import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateSessionRequest } from '../../requests/CreateSessionRequest'
import { getUserId } from "../utils"
import { createSession } from "../../businessLogic/businessLogic"


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newSessionRequest: CreateSessionRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  const newItem = await createSession(newSessionRequest, userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}
