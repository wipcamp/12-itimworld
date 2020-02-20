import React, {Component} from 'react'
import styled from 'styled-components'
import {Subtitle, SmallText} from '../Core/Text'
import UserService from '../../services/UserService'
import ButtonRoute from '../Core/ButtonRoute'
import {Redirect} from 'react-router-dom'

const UploadButton = styled.button `
width: 93.33px;
height: 35.16px;
background: #16AD94;
border-radius: 4px;

  /* @media (max-width: 768px) {
    width: 150.65px!important;
    height: 49px!important;
  }

  @media (max-width: 576px) {
    width: 88.8px!important;
    height: 33.76px!important;
  } */
`
const DocumentButton = styled(UploadButton)`
background: #304051;
`

const ButttonText = styled.div `
color: white;
`
const SmallConText = styled(SmallText)`
height: 100%;
`

const Test = styled.input `
display:none;
`

const TableHeader = styled.div `
 background:#F5F6F7;
`

let uploadDocument = null;

let userId = 120001;

export default class index extends Component {

    state = {
        documentLink: "",
        redirect: false
    }

    setUpload = e => {
        uploadDocument = e;
    }

    clickUpload = () => {
        uploadDocument.click()
        console.log(uploadDocument.files);

    }

    async componentDidMount() {await this.getUserDocument()}

    getUserDocument = async () => {
        let promise;
        try {
            promise = await UserService.getDocument(userId)
            let response = promise.data;

            if (response.success) {
                this.setState({documentLink: response.data[0]})

            } else {
                this.setState({errorLoad: true})
            }
        } catch (e) {
            this.setState({errorLoad: true})
        }
    }

    uploadFile = async(e) => {
        let formData = new FormData();
        formData.append('file', uploadDocument.files[0])
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        let response = await UserService
            .uploadDocument(userId, formData, config.headers)
            .then(() => {
                UserService.postStatus(userId, {"status": "submit"})
            })
            .then(() => {
                this.getUserDocument();
            });
        console.log(response);

    }

    renderDocumentButton = () => {
        if (this.state.documentLink !== "") {
            return <DocumentButton
                className="ml-md-2 mb-2 mb-md-0"
                onClick={() => window.open(this.state.documentLink)}>
                <ButttonText>
                    แสดงไฟล์
                </ButttonText>
            </DocumentButton>
        }
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/menu'/>;
        }
        return (
            <div className="container bg-white">

                <TableHeader className="row bg-gray">
                    <Subtitle className="col-6 col-md-4 mt-3 mb-3 offset-md-1">
                        เอกสารที่ต้องอัปโหลด
                    </Subtitle>
                    <Subtitle className="col-6 col-md-6 mt-3 mb-3">
                        <p className="text-right text-md-left">
                            ภายในวันที่
                        </p>
                    </Subtitle>
                </TableHeader>
                <div className="row border-bottom md-2">
                    <div className="col-6 col-md-4 offset-md-1">
                        <Subtitle className="mt-2 mb-2">
                            ใบรับรองผลการศึกษา (ปพ.7)
                        </Subtitle>
                        <SmallConText className="mb-2">
                            อัปโหลดไฟล์ประเภท PDF<br/>
                            ขนาดไม่เกิน 5 MB
                        </SmallConText>
                    </div>
                    <div className="col-6 col-md-3 mt-3 md-3">
                        <p className="text-right text-md-left">
                            12 มีนาคม 2563
                        </p>
                    </div>
                    <div className="col-4 offset-8 offset-md-0 col-md-4 mt-md-3">
                        <div className="float-right">
                            <UploadButton className="text-center mb-2 mb-md-0" onClick={this.clickUpload}>
                                <ButttonText>
                                    อัพโหลด
                                </ButttonText>
                            </UploadButton>
                            {this.renderDocumentButton()}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-md-1 mt-3 md-5">
                        <ButtonRoute
                            className='d-flex col-12 mb-5'
                            buttonLeft="กลับ"
                            displayButtonRight="none"
                            linkBack="/menu"/>
                    </div>
                </div>
                <Test
                    type="file"
                    id="upload"
                    name="document"
                    accept=".pdf"
                    ref={this.setUpload}
                    onChange={e => this.uploadFile(e)}/>
            </div>
        )
    }
}
