import * as React from 'react'
import { DimmerTemplate } from './DimmerTemplate'
import {Form, Button,  } from 'semantic-ui-react'
import { getUploadUrl, uploadFile } from '../../api/trainingplan-api'
import Auth from '../../auth/Auth'

enum UploadState {
    NoUpload,
    FetchingPresignedUrl,
    UploadingFile}

interface ComponentProps {
    sessionID: string
    active: boolean
    onClick: any
    onFileUpload:any
    auth: Auth
}

interface ComponentState {
    file: any
    uploadState: UploadState
}

interface UrlResult {
  uploadUrl: string
  attachmentUrl: string
}

export class UploadFile extends React.PureComponent<ComponentProps, ComponentState> {

    state: ComponentState = {
        file: null,
        uploadState: UploadState.NoUpload
    }

    onFileChangeHandler(event:any){
        this.setState({
            file: event.target.files[0],
          })
    }
    
    uploadToServer = async (event: React.SyntheticEvent) => {
        event.preventDefault()
    
        try {
          if (!this.state.file) {
            alert('File should be selected')

            return
          }
    
          this.setUploadState(UploadState.FetchingPresignedUrl)
          const result: UrlResult = await getUploadUrl(this.props.auth.getIdToken(), 
                                                      this.props.sessionID)
          const uploadUrl: string = result.uploadUrl
          const attachmentUrl: string = result.attachmentUrl 

          this.setUploadState(UploadState.UploadingFile)
          await uploadFile(uploadUrl, this.state.file)
          this.props.onFileUpload(attachmentUrl, this.props.sessionID)
        } catch (e) {
          alert('Could not upload a file: ' + e.message)
        } finally {
          this.setUploadState(UploadState.NoUpload)
        }
      }
    
      setUploadState(uploadState: UploadState) {
        this.setState({
          uploadState
        })
      }
    

  render() {
    return (
        <DimmerTemplate active={this.props.active}>
            <Form >
            <Form.Field>
                <label>Select File</label>
                <input type="file" onChange={this.onFileChangeHandler.bind(this)} />
            </Form.Field>
            <Form.Field>
              {this.state.uploadState === UploadState.FetchingPresignedUrl && <label> Uploading image metadata</label>}
              {this.state.uploadState === UploadState.UploadingFile && <label>Uploading file</label>}
            </Form.Field>
            <Button type='submit' onClick={this.props.onClick} color='red'> Close </Button>
            <Button 
            type='submit' 
            onClick={this.uploadToServer} 
            color='green'
            loading={this.state.uploadState !== UploadState.NoUpload}> 
              Upload 
            </Button>
            </Form>
        </DimmerTemplate>
    )
  }
}

