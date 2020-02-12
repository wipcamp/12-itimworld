import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { Button } from 'reactstrap'
import styled from 'styled-components'
import {Subtitle,SmallText} from '../Core/Text'
import {ButtonStyle} from '../Core/ButtonStyle'
import fonts from '../../config/fonts'
import UserService from '../../services/UserService'
import ButtonRoute from '../Core/ButtonRoute'

const UploadButton = styled.button`
width: 175px;
height: 33px;
background: #304151;
border-radius: 4px;
`

const TableStyle = styled(Table)`
    
`

const ContainerBox = styled.div`
height:70vh;
`

const ButttonText = styled.div`
color: white;
`
const SmallConText = styled(SmallText)`
height: 100%;
`

const TableRowAlignMiddle = styled.td`
vertical-align:middle!important;
`

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`

const Test = styled.input`
display:none;
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
            <ContainerBox className="container bg-white">
                 <TableStyle className="center">
                     <thead>
                        <tr>
                            <th></th>
                            <th><Subtitle>เอกสารที่ต้องอัพโหลด</Subtitle></th>
                            <th className="text-right"><Subtitle>ภายในวันที่</Subtitle></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <Subtitle>ปพ.5</Subtitle>
                                <SmallConText>Lorem ipsum <br /> asapkok</SmallConText>
                            </td>
                            <td></td>
                            <TableRowAlignMiddle className="align-content-center">
                                <UploadButton className="float-right text-center" onClick={this.clickUpload}>
                                        <ButttonText>
                                            อัพโหลด
                                        </ButttonText>
                                    </UploadButton>
                                    <Test type="file" id="upload" name="document" ref={this.setUpload} />
                            </TableRowAlignMiddle>
                        </tr>
                        <tr>
                            <td colSpan="4"></td>
                        </tr>
                    </tbody>
                </TableStyle>
                <ButtonRoute 
                  className= 'd-flex col-12 mb-5'
                  buttonLeft="กลับ" 
                  buttonRight="ยืนยัน" 
                  linkBack ="/menu"
                  linkNext ="/menu"
                  onClick={(e) => this.uploadFile(e)}
                />
            </ContainerBox>
        )
    }
}
