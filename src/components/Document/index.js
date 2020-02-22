import React, { Component } from 'react'
import styled from 'styled-components'
import { Subtitle, SmallText } from '../Core/Text'
import UserService from '../../services/UserService'
import ButtonRoute from '../Core/ButtonRoute'
import CustomModal from '../Core/CustomModal'

const UploadButton = styled.button`
width: 93.33px;
height: 35.16px;
background: #16AD94;
border-radius: 4px;
border-color: rgba(0,0,0,0);
`

const ContainerDiv = styled.div`
  max-width:1200px;
`

const ImageDiv = styled.div`
  @media (max-width: 768px) {
      display:none!important;
    }
`

const DocumentIcon = styled.img`
width: 40px;
height: 40px;

  @media (max-width: 768px) {
    display:none!important;
  }
`

const DocumentButton = styled(UploadButton)`
background: #304051;
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

export default class index extends Component {

  state = {
    documentLink: "",
    modal: false,
    modalText: "",
    modalLink: ""
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal, modalText: "", modalLink: "" })
  }

  setUpload = e => {
    uploadDocument = e;
  }

  clickUpload = () => {
    uploadDocument.click()
  }

  async componentDidMount() {
    await this.getUserDocument()
  }

  getUserDocument = async () => {
    let promise;
    try {
      promise = await UserService.getDocumentMe()
      let response = promise.data;

      if (response.success) {
        this.setState({ documentLink: response.data[0] })

      } else {
        this.setState({ errorLoad: true })
      }
    } catch (e) {
      this.setState({ errorLoad: true })
    }
  }

  uploadFile = async (e) => {
    if (uploadDocument.files.length !== 0) {
      let formData = new FormData();
      formData.append('file', uploadDocument.files[0])
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await UserService
        .uploadDocumentMe(formData, config.headers)
        .then((promiseDocument) => {
          const documentResponse = promiseDocument.data;
          if (documentResponse.success) {
            UserService.postStatusMe({ "status": "submit" })
          }
        })
        .then(() => {
          this.getUserDocument();
        })
        .catch((error) => {
          if (uploadDocument.files.length !== 0) {
            if (uploadDocument.files[0].size > 2097152) {
              this.setState({
                modalText: "ขนาดไฟล์ที่อัปโหลดต้องไม่เกิน 2Mb\nเว็บไซต์สำหรับย่อขนาดไฟล์ที่แนะนำ",
                modalLink: "https://www.pdfpro.co/compress-pdf",
                modal: true
              })
            } else if (uploadDocument.files[0].type !== "application/pdf") {
              this.setState({
                modalText: "ไฟล์ที่อัปโหลดต้องเป็นประเภท .pdf เท่านั้น โปรดอัพโหลดเอกสารใหม่",
                modal: true
              })
            } else {
              this.toggleModal();
            }
          }
        });
    }
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
    return (
      <ContainerDiv className="container-fluid justify-content-center bg-white">
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
          <ImageDiv className="col-md-1 mt-auto mb-auto d-flex flex-row-reverse">
            <DocumentIcon src="/img/Document/doc_icon.png" alt="doc_icon" />
          </ImageDiv>
          <div className="col-6 col-md-4 offset-md-0">
            <Subtitle className="mt-2 mb-2">
              ใบรับรองผลการศึกษา (ปพ.7)
            </Subtitle>
            <SmallConText className="mb-2">
              อัปโหลดไฟล์ประเภท PDF<br />
              ขนาดไม่เกิน 2 MB
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
        <div className="row mt-4 mb-auto">
          <div className="offset-md-1 mt-3 md-5">
            <ButtonRoute
              className='d-flex col-12 mb-5'
              buttonLeft="กลับ"
              displayButtonRight="none"
              linkBack="/menu" />
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
        <CustomModal
          header="การบันทึกข้อมูลผิดพลาด"
          paragraph={this.state.modalText !== "" ? this.state.modalText : `การอัปโหลดเอกสารเกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้\n\nโปรดติดต่อเจ้าหน้าที่`}
          paragraphLink={this.state.modalLink}
          secondaryButtonText="ปิด"
          modal={this.state.modal}
          toggle={this.toggleModal}
        />
      </ContainerDiv>
    )
  }
}
