import React, { Component } from 'react'
import TelNumberField from '../Core/TelNumberField'
import TextField from '../Core/TextField'
import UserService from '../../services/UserService'
import Field from '../Core/Field'
import styled from 'styled-components'
import { SmallText } from '../Core/Text'
import { ButtonStyle } from '../Core/ButtonStyle'
import SelectField from '../Core/SelectField'
import { MinHeightRow } from '../Core/FieldStyle'
import { Redirect } from 'react-router-dom'
import regexPattern from '../Core/RegexPattern'
import CustomModal from '../Core/CustomModal'
import Waiting from '../Core/Waiting'
import notStoreableFieldName from '../Core/NotStoreableFieldName'

const SectionHeader = styled.h3`
  margin-top:30px;
  margin-bottom:20px;
`
const ContainerDiv = styled.div`
  max-width:1200px;
`

const NotDisplayButton = styled.button`
  display:none;
`

const RedText = styled.span`
  color: red;
`

let checkBoxRef = null;
let profileFormRef = null;

export default class Index extends Component {
  state = {
    profileDataFirstSection: [
      {
        labelInput: 'ชื่อ', placeHolder: '', name: 'firstName', additionalText: 'ไม่ต้องใส่คำนำหน้าชื่อ'
      },
      {
        labelInput: 'นามสกุล', placeHolder: '', name: 'lastName'
      },
      {
        labelInput: 'Firstname', placeHolder: '', name: 'firstNameEn', additionalText: 'ไม่ต้องใส่คำนำหน้าชื่อ', pattern: regexPattern.eng
      },
      {
        labelInput: 'Lastname', placeHolder: '', name: 'lastNameEn', pattern: regexPattern.eng
      },
      {
        labelInput: 'ชื่อเล่น', placeHolder: 'กรอกเป็นภาษาไทย', name: 'nickName'
      }
    ],
    genderData: [
      {
        value: "ชาย",
        text: "ชาย"
      },
      {
        value: "หญิง",
        text: "หญิง"
      }
    ],
    profileDataSecondSection: [
      {
        labelInput: 'รหัสบัตรประชาชน', placeHolder: '', name: 'citizenId'
      }
    ],
    // congenitalData: [
    //   {
    //     labelInput: 'โรคประจำตัว', placeHolder: 'หากไม่มีให้ใส่ -', name: 'congenitalDisease'
    //   },
    //   {
    //     labelInput: 'อาหารที่แพ้', placeHolder: 'หากไม่มีให้ใส่ -', name: 'allergicFood'
    //   },
    //   {
    //     labelInput: 'ยาที่แพ้', placeHolder: 'หากไม่มีให้ใส่ -', name: 'congenitalDrug'
    //   }
    // ]
    // ,
    religionData: [
      {
        value: "พุทธ",
        text: "พุทธ"
      },
      {
        value: 'คริสต์',
        text: 'คริสต์'
      },
      {
        value: 'อิสลาม',
        text: 'อิสลาม'
      },
      {
        value: 'ฮินดู',
        text: 'ฮินดู'
      },
      {
        value: 'ซิกส์',
        text: 'ซิกส์'
      },
      {
        value: 'ไม่มี',
        text: 'ไม่มี'
      }],
    booldGroupData: [
      {
        value: 'A',
        text: 'A'
      },
      {
        value: 'B',
        text: 'B'
      },
      {
        value: 'O',
        text: 'O'
      },
      {
        value: 'AB',
        text: 'AB'
      }],
    schoolLevelData: [
      {
        value: 'ม.4',
        text: 'ม.3 ขึ้น ม.4'
      },
      {
        value: 'ม.5',
        text: 'ม.4 ขึ้น ม.5'
      },
      {
        value: 'ม.6',
        text: 'ม.5 ขึ้น ม.6'
      },
      {
        value: 'ปี.1',
        text: 'ม.6 ขึ้น ปี.1'
      }
    ],
    data: {
      firstName: null,
      firstNameEn: null,
      lastName: null,
      lastNameEn: null,
      nickName: null,
      citizenId: null,
      telNo: null,
      gender: null,
      birthDate: null,
      bloodGroup: null,
      religion: null,
      email: null,
      allergicFood: null,
      congenitalDisease: null,
      congenitalDrug: null,
      parent: {
        relation: null,
        telNo: null
      },
      school: {
        name: null,
        level: null,
        major: null,
        gpax: null
      },
      telEmergency: null,
      province: null,
      knowWhence: {
        facebook: false,
        dekd: false,
        sit: false,
        camphub: false,
        etc: ""
      }
    },
    errorMsg: [],
    etcInput: false,
    redirect: false,
    modal: false,
    finishLoad: false,
    errorLoad: false,
    isUserAcceptedData: false
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  componentDidCatch() {
    this.toggleModal();
  }

  async componentDidMount() {
    await this.getUser();

  }

  componentDidUpdate() {
  }

  getUser = async () => {
    await UserService.getMe()
      .then((promise) => {
        const response = promise.data;
        if (response.success) {
          this.setState({ finishLoad: true, isUserAcceptedData: response.data[0].userStatus.acceptedStoreData })
        } else {
          this.setState({ errorLoad: true })
        }
      })
      .catch(() => {
        this.setState({ errorLoad: true })
      })
  }

  putUser = async (data, event) => {
    event.preventDefault();
    await UserService.putMe(data)
      .then(() => UserService.postStatusMe({ "status": "register" }))
      .then(() => this.setState({ redirect: true }))
      .then(() => this.forceUpdate())
      .catch(() => this.toggleModal())
  }

  handleClick = () => {
    this.setState({
      religion: true
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "parentRelation" || name === "parentTel") {
      const newName = name === "parentRelation" ? "relation" : "telNo"
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          parent: {
            ...prevState.data.parent,
            [newName]: value
          }
        }
      }
      ))
    }
    else if (name.match("school") !== null) {
      const keyName = name.replace("school", "").toLowerCase();
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          school: {
            ...prevState.data.school,
            [keyName]: value
          }
        }
      })
      )
    }
    else if (name === "etc") {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          knowWhence: {
            ...prevState.data.knowWhence,
            etc: value
          }
        }
      }))
    }
    else if (name === "knowWhence") {
      let checked = event.target.checked;

      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          knowWhence: {
            ...prevState.data.knowWhence,
            [value]: checked
          }
        }
      }))
    }
    else {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          [name]: value
        }
      }
      ))
    }
  }

  renderInputButton = () => {
    if (this.state.etcInput) {
      return <input class="form-control ml-2" type="text" name="etc" onChange={e => this.handleChange(e)} required={true} disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")} />
    }
  }

  setEtcInput = (e, boolean) => {
    this.setState({ etcInput: boolean })
    if (!boolean) {
      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          knowWhence: {
            ...prevState.data.knowWhence,
            etc: ""
          }
        }
      }))
    }
  }

  setEtcBoxRef = e => {
    checkBoxRef = e;
  }

  clickBox = () => {
    checkBoxRef.click()
  }

  setProfileFormRef = e => {
    profileFormRef = e;
  }

  clickSubmit = () => {

    this.validateCheckboxField();

    profileFormRef.click();
  }

  validateCheckboxField = () => {
    let countNotSelect = 0;

    Object.keys(this.state.data.knowWhence).forEach((keyName) => {
      if (keyName !== "etc") {
        if (!this.state.data.knowWhence[keyName]) {
          countNotSelect += 1;
        }
      } else {
        if (this.state.data.knowWhence.etc === "") {
          countNotSelect += 1;
        }
      }
    })

    if (countNotSelect !== 5) {
      checkBoxRef.required = false;
    } else {
      checkBoxRef.required = true;
    }
  }

  resubmitAndCloseModal = () => {
    this.toggleModal();
    this.clickSubmit();
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to='/menu' />;
    }

    if (!this.state.finishLoad || this.state.errorLoad) {
      return <Waiting error={this.state.errorLoad} />
    } else {
      return (
        <ContainerDiv className="container-fluid justify-content-center" style={{ paddingBottom: '30px' }}>
          <div className="card p-5" style={{ boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`, borderRadius: `4px`, backgroundColor: `rgba(255, 255, 255, 0.9)` }}>
            <form onSubmit={e => { this.putUser(this.state.data, e) }}>
              <h1 className="text-center">ข้อมูลส่วนตัว</h1>
              <section>
                <SectionHeader className="col-12">ข้อมูลทั่วไป</SectionHeader>
                {
                  this.state.profileDataFirstSection.map((data, i) => (
                    <TextField
                      key={i}
                      className="col-12 col-md-6 form-group"
                      leftSide="col-12 col-md-4 col-form-label text-md-right"
                      rightSide="col-12 col-md-8"
                      labelInput={data.labelInput}
                      placeHolder={data.placeHolder}
                      name={data.name}
                      onChange={(e) => this.handleChange(e)}
                      additional="form-text text-muted"
                      additionalText={data.additionalText}
                      pattern={data.pattern === regexPattern.eng ? regexPattern.eng : regexPattern.th}
                      title={data.pattern === regexPattern.eng ? "โปรดกรอกภาษาอังกฤษ" : "โปรดกรอกภาษาไทย"}
                      required={true}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes(data.name.toLowerCase())}
                    />
                  ))
                }
                <SelectField
                  dataOptions={this.state.genderData}
                  onClickFunc={this.handleChange}
                  selectId="gender"
                  selectName="gender"
                  labelName="เพศสภาพ"
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("gender")}
                />
                <label className="col-12 col-md-6 form-group" htmlFor="birthDate">
                  <div className="row">
                    <div className="col-12 col-md-4 col-form-label text-md-right">วันเกิด <RedText> *</RedText></div>
                    <div className="col-12 col-md-8">
                      <input
                        className="form-control"
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        min="1995-01-01"
                        max="2010-12-31"
                        value={this.state.data.birthDate}
                        onChange={(e) => this.handleChange(e)}
                        required={true}
                        disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("birthdate")}
                      />
                    </div>
                  </div>
                </label>
                {
                  this.state.profileDataSecondSection.map((data, i) => (
                    <TextField
                      key={i}
                      className="col-12 col-md-6 form-group"
                      leftSide="col-12 col-md-4 col-form-label text-md-right"
                      rightSide="col-12 col-md-8"
                      labelInput={data.labelInput}
                      placeHolder={data.placeHolder}
                      name={data.name}
                      pattern="[0-9]{13}"
                      maxlength="13"
                      onChange={(e) => this.handleChange(e)}
                      additional="form-text text-muted"
                      required={true}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes(data.name.toLowerCase())}
                    />
                  ))
                }
                {/* <SelectField
                  dataOptions={this.state.booldGroupData}
                  onClickFunc={this.handleChange}
                  selectId="bloodGroup"
                  selectName="bloodGroup"
                  labelName="กรุ๊ปเลือด"
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("bloodgroup")}
                /> */}
                {
                  // this.state.congenitalData.map((data, i) => (
                  //   <TextField
                  //     key={i}
                  //     className="col-12 col-md-6 form-group"
                  //     leftSide="col-12 col-md-4 col-form-label text-md-right"
                  //     rightSide="col-12 col-md-8"
                  //     type="text"
                  //     labelInput={data.labelInput}
                  //     placeHolder={data.placeHolder}
                  //     name={data.name}
                  //     required={false}
                  //     disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes(data.name.toLowerCase())}
                  //     onChange={(e) => this.handleChange(e)}
                  //   />
                  // ))
                }
              </section>

              <section>
                <SectionHeader className="col-12">ข้อมูลการติดต่อ</SectionHeader>

                <TextField
                  className="col-12 col-md-6 form-group"
                  leftSide="col-12 col-md-4 col-form-label text-md-right"
                  rightSide="col-12 col-md-8"
                  labelInput="จังหวัด"
                  address="province"
                  id="province"
                  name="province"
                  value={this.state.data.province}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="จังหวัด"
                  pattern={regexPattern.th}
                  title="โปรดกรอกภาษาไทย"
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("province")}
                />

                <TelNumberField
                  labelInput="เบอร์โทรศัพท์"
                  name="telNo"
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("telno")}
                />
                <Field
                  className="col-12 col-md-6 form-group"
                  name="email"
                  type="email"
                  labelInput="E-Mail"
                  placeHolder=""
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("email")}
                />
                <TelNumberField
                  labelInput="เบอร์โทรผู้ปกครอง"
                  name="parentTel"
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("parenttel")}
                />
                {/* <TextField
                  className="col-12 col-md-6 form-group"
                  leftSide="col-12 col-md-4 col-form-label text-md-right"
                  rightSide="col-12 col-md-8"
                  type="text"
                  labelInput="ผู้ปกครองเกี่ยวข้องเป็น"
                  placeHolder=""
                  name="parentRelation"
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("parentrelation")}
                />
                <TelNumberField
                  labelInput="เบอร์โทรฉุกเฉิน"
                  name="telEmergency"
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("telemergency")}
                /> */}
              </section>
              <section>
                <SectionHeader className="col-12">ข้อมูลการศึกษา</SectionHeader>
                <TextField
                  className="col-12 col-md-6 form-group"
                  leftSide="col-12 col-md-4 col-form-label text-md-right"
                  rightSide="col-12 col-md-8"
                  labelInput="โรงเรียน"
                  placeHolder="ชื่อโรงเรียนแบบเต็ม"
                  name="schoolName"
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("schoolname")}
                />
                <SelectField
                  dataOptions={this.state.schoolLevelData}
                  onClickFunc={this.handleChange}
                  selectId="level"
                  selectName="schoolLevel"
                  labelName="ระดับชั้น"
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("schoollevel")}
                />
                <TextField
                  className="col-12 col-md-6 form-group"
                  leftSide="col-12 col-md-4 col-form-label text-md-right"
                  rightSide="col-12 col-md-8"
                  labelInput="สายการเรียน"
                  placeHolder="เลือก"
                  name="schoolMajor"
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("schoolmajor")}
                />
                <Field
                  className="col-12 col-md-6 form-group"
                  name="schoolGpax"
                  type="number"
                  labelInput="เกรดเฉลี่ยเทอมล่าสุด"
                  placeHolder=""
                  step="0.01"
                  min="1.00"
                  max="4.00"
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("schoolgpax")}
                />
              </section>
              <section>
                <SectionHeader className="col-12">ช่องทางที่รู้จักค่าย</SectionHeader>
                <div className="row col-auto offset-0 offset-md-1 ml-1 ml-md-0 mb-2 mb-md-1">
                  <SmallText class="pt-2">น้องสามารถเลือกได้มากกว่าหนึ่งอย่าง</SmallText>
                </div>
                <MinHeightRow className="row form-group checkbox-group required offset-md-1 offset-0">
                  <div className="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0 mb-2 mb-md-0 ml-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceFacebook"
                      value="facebook"
                      onClick={e => this.handleChange(e)}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceFacebook">Facebook</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0 mb-2 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceCamphub"
                      value="camphub"
                      onClick={e => this.handleChange(e)}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceCamphub">CampHub</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0 mb-2 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceDek-D"
                      value="dekd"
                      onClick={e => this.handleChange(e)}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceDek-D">Dek-D</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0 mb-2 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceSIT"
                      value="sit"
                      onClick={e => this.handleChange(e)}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceSIT">SIT</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0 mb-2 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceEtc"
                      value={null}
                      onClick={e => this.setEtcInput(e, !this.state.etcInput)}
                      ref={this.setEtcBoxRef}
                      required={true}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceEtc">อื่นๆ</label>
                    {this.renderInputButton()}
                  </div>
                </MinHeightRow>
              </section>
              <section>
                <SectionHeader className="col-12">ผลงานและทักษะทางด้านคอมพิวเตอร์</SectionHeader>
                <textarea
                  class="form-control"
                  placeholder="ผลงาน"
                  rows="4"
                  name="computerWorks"
                  onChange={(e) => this.handleChange(e)}
                ></textarea>
              </section>
              <NotDisplayButton ref={this.setProfileFormRef}> asd</NotDisplayButton>
            </form>
            <div className="d-flex justify-content-end mt-5 mb-auto">
              <ButtonStyle onClick={(e) => this.clickSubmit(e)}>ยืนยัน</ButtonStyle>
            </div>
          </div>
          <CustomModal
            header="การบันทึกข้อมูลผิดพลาด"
            paragraph="การบันทึกข้อมูลเกิดข้อผิดพลาด ไม่สามารถส่งข้อมูลได้ กรุณากดยืนยันข้อมูลใหม่อีกครั้ง"
            secondaryButtonText="ยกเลิก"
            primaryButtonDisplay="flex"
            primaryButtonText="ยืนยัน"
            primaryOnClick={() => { this.resubmitAndCloseModal() }}
            modal={this.state.modal}
            toggle={this.toggleModal}
          />
        </ContainerDiv>
      )
    }
  }
}
