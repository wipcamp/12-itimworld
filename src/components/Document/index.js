import React, { Component } from 'react'
import styled from 'styled-components'
import {Subtitle,SmallText} from '../Core/Text'
import UserService from '../../services/UserService'
import ButtonRoute from '../Core/ButtonRoute'

const UploadButton = styled.button`
  width: 175px;
  height: 33px;
  background: #304151;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 155px!important;
    height: 33px!important;
    /* width: 150.65px!important;
    height: 49px!important; */
  }

  @media (max-width: 576px) {
    width: 88.8px!important;
    height: 33.76px!important;
  }
`

const ButttonText = styled.div`
color: white;
`
const SmallConText = styled(SmallText)`
height: 100%;
`

const Test = styled.input`
display:none;
`

const TableHeader = styled.div`
 background:#F5F6F7;
`

let uploadDocument = null;

let userId = 120001;

export default class index extends Component {

    setUpload = e => {
        uploadDocument = e;
    }
    
    clickUpload = () =>{
        uploadDocument.click()
        console.log(uploadDocument.files);
        
    }

    componentDidMount(){
        console.log(uploadDocument);
    }

    uploadFile = async (e) =>{
        let formData = new FormData();
        formData.append('file',uploadDocument.files[0])
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let response = await UserService.uploadDocument(userId,formData,config.headers).then(() => {UserService.postStatus(userId,{"status":"submit"})});
        console.log(response);
        
    }

    render() {
        return (
            <div className="container bg-white">

              <TableHeader className="row bg-gray">
                <Subtitle className="col-5 col-md-5 mt-3 mb-3 offset-md-1">เอกสารที่ต้องอัพโหลด</Subtitle>
                <Subtitle className="col-6 col-md-6 mt-3 mb-3">
                  <p className="text-right text-md-left">
                    ภายในวันที่
                  </p>
                </Subtitle>
              </TableHeader>
              <div className="row border-bottom md-2">
                <div className="col-12 col-md-5 offset-md-1">
                <Subtitle className="mt-2 mb-2">ปพ.5</Subtitle>
                <SmallConText className="mb-2">Lorem ipsum <br /> asapkok</SmallConText>
                </div>
                <div className="col-12 col-md-5 justify-content-end mt-3 md-3 mr-1 ">
                  <UploadButton  className="float-right text-center"  onClick={this.clickUpload}>
                    <ButttonText>
                      อัพโหลด
                    </ButttonText>
                  </UploadButton>
                </div>
              </div>
              <div className="row">
                <div className="offset-md-1 mt-3 md-5">
                <ButtonRoute 
                  className= 'd-flex col-12 mb-5'
                  buttonLeft="กลับ"
                  displayButtonRight="none"
                  linkBack ="/menu"
                />
                </div>
              </div>
                    <Test 
                      type="file" 
                      id="upload" 
                      name="document" 
                      accept=".pdf" 
                      ref={this.setUpload} 
                     onChange={e => this.uploadFile(e)}
                    />
            </div>
        )
    }
}
