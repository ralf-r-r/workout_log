import * as AWS  from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { SessionItem } from '../models/TrainingData'

const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)

export class DataAccess {

    constructor(
        private readonly docClient:DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly workoutTable = process.env.WORKOUT_TABLE,
        private readonly bucketName = process.env.TRAININGPLAN_S3_BUCKET,
        private readonly s3 = new AWS.S3({signatureVersion: 'v4'})
        ) {}

    async getTrainingPlans(userId: string){
      return await this.docClient.query({
            TableName: this.workoutTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            }
          })
          .promise()
      }

    async updateUrl(userId:string, imageId:string, sessionId:string){
      const attachmentUrl:string = `https://${this.bucketName}.s3.eu-central-1.amazonaws.com/${userId}${imageId}${sessionId}`

      await this.docClient.update({
        TableName: this.workoutTable,
        Key: {userId: userId, sessionId: sessionId},
        UpdateExpression: 'set #attachmentUrl=:attachmentUrl',
        ExpressionAttributeValues: {
          ':attachmentUrl': attachmentUrl,
        },
        ExpressionAttributeNames: {
         '#attachmentUrl': 'attachmentUrl'
       },
        ReturnValues: 'UPDATED_OLD'
      })
      .promise()

      return attachmentUrl
    }

    async generateUploadUrl(userId:string, imageId:string, sessionId:string){
      return this.s3.getSignedUrl('putObject', {
        Bucket: this.bucketName,
        Key: userId.concat(imageId).concat(sessionId),
        Expires: 300})
    }

    async createSession(newItem:SessionItem){
      await this.docClient.put({
        TableName: this.workoutTable,
        Item: newItem
      }).promise()
  }

  async getSessions(userId: string){
    return await this.docClient.query({
        TableName: this.workoutTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()
}

async deleteSession(userId: string, sessionId: string){
  await this.docClient.delete({
      TableName: this.workoutTable,
      Key: {
        userId: userId,
        sessionId: sessionId
      }
  }).promise()
}

}