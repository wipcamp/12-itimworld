import React, { Component } from 'react'
import styled from 'styled-components'

import TelNumberField from '../Core/TelNumberField'
import TextField from '../Core/TextField'
import ButtonRoute from '../Core/ButtonRoute'
import UserService from '../../services/UserService'
import Field from '../Core/Field'
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

let checkBoxRef = null;
let profileFormRef = null;
let etcCheck = false;

export default class Index extends Component {
  state = {
    finishLoad: false,
    errorLoad: false,
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
    // ],
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
    newUser: '',
    oldUser: {
      firstName: '',
      firstNameEn: '',
      lastName: '',
      lastNameEn: '',
      nickName: '',
      citizenId: '',
      telNo: '',
      gender: '',
      birthDate: '',
      bloodGroup: '',
      religion: '',
      email: '',
      knowWhence: '',
      school: {
        name: '',
        level: '',
        major: '',
        gpax: ''
      },
      allergicFood: '',
      congenitalDisease: '',
      congenitalDrug: '',
      parent: {
        relation: '',
        telNo: ''
      },
      telEmergency: '',
      address: {
        province: '',
        district: ''
      }
    },
    oldData: null,
    buttonDisable: true,
    knowWhence: "",
    etcInput: false,
    redirect: false,
    confirmModal: false,
    alertModal: false,
    isUserAcceptedData: false
  }

  componentDidCatch() {
    this.setState({ errorLoad: true })
  }

  toggleAlertModal = () => {
    this.setState({ alertModal: !this.state.alertModal })
  }

  toggleConfirmModal = () => {
    this.setState({ confirmModal: !this.state.confirmModal })
  }

  submitForm = (e) => {
    e.preventDefault();
    this.toggleConfirmModal();
  }

  async componentDidMount() {
    await this.getUserService()
      .then((promise) => {
        const response = promise.data;
        let responseData = response.data[0];

        if (responseData.parent === null) {
          responseData.parent = {telNo:"",relation:""}
        }

        if (response.success) {
          this.setState({
            oldUser: responseData,
            oldData: responseData,
            finishLoad: true,
            isUserAcceptedData: responseData.userStatus.acceptedStoreData
          });
          this.setState({ knowWhence: responseData.knowWhence });
          this.validateCheckboxField();
          if (responseData.knowWhence.etc !== "") {
            etcCheck = true;
            this.setState({ etcInput: true });
          }
        } else {
          this.setState({ errorLoad: true })
        }
      })
      .catch(() => this.setState({ errorLoad: true }));
  }

  renderInputButton = () => {
    if (this.state.etcInput) {
      return <input class="form-control ml-2" type="text" name="etc" onChange={e => this.handleChange(e)} value={this.state.oldUser.knowWhence.etc} required={true} disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")} />
    }
  }

  setEtcInput = (e, boolean) => {
    this.setState({ etcInput: boolean })
    etcCheck = boolean
    if (!boolean) {
      this.setState((prevState) => ({
        newUser: {
          ...prevState.newUser,
          knowWhence: {
            ...prevState.newUser.knowWhence,
            etc: ""
          }
        },
        oldUser: {
          ...prevState.oldUser,
          knowWhence: {
            ...prevState.oldUser.knowWhence,
            etc: ""
          }
        }
      }))
    }
  }

  isExist = (data) => {
    return data !== undefined && data !== null && Object.keys(data).length !== 0
  }

  isKnowWhenceHasData = () => {
    const newUser = this.state.newUser;
    if (this.isExist(newUser) && this.isExist(newUser.knowWhence)) {
      const knowWhence = newUser.knowWhence;
      return knowWhence.facebook === true || knowWhence.camphub === true || knowWhence.dekd === true || knowWhence.sit === true || this.isExist(knowWhence.etc)
    } else {
      return false;
    }
  }

  componentDidUpdate() {

    if (this.state.newUser !== '') {
      if (Object.keys(this.state.newUser).length > 1) {
        if (this.state.buttonDisable)
          this.setState({ buttonDisable: false })
      } else {
        if (Object.keys(this.state.newUser).includes("knowWhence")) {
          if (this.isKnowWhenceHasData()) {
            if (this.state.buttonDisable)
              this.setState({ buttonDisable: false })
          } else {
            if (!this.state.buttonDisable)
              this.setState({ buttonDisable: true })
          }
        } else {
          if (this.state.buttonDisable)
            this.setState({ buttonDisable: false })
        }
      }
    } else {
      if (!this.state.buttonDisable)
        this.setState({ buttonDisable: true })
    }
  }

  getUserService = async () => {
    return await UserService.getMe();
  }


  onSelect = (fullAddress) => {
    const { district, province } = fullAddress
    this.setState({
      district,
      province
    })
    this.arrayToObj(fullAddress);
  }

  arrayToObj = (fullAddress) => {
    const dataEntries = Object.entries(fullAddress)
    for (const [dataArray, dataFromEntity] of dataEntries) {
      if (dataArray === "district" || dataArray === "province") {
        this.setState((prevState) => ({
          oldUser: {
            ...prevState.oldUser,
            address: {
              ...prevState.oldUser.address,
              [dataArray]: dataFromEntity
            }
          },
          newUser: {
            ...prevState.newUser,
            [dataArray]: dataFromEntity
          }
        })
        )
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "parentRelation" || name === "parentTel") {
      const newName = name === "parentRelation" ? "relation" : "telNo"
      this.setState((prevState) => ({
        newUser: {
          ...prevState.newUser,
          parent: {
            ...prevState.newUser.parent,
            [newName]: value
          }
        },
        oldUser: {
          ...prevState.oldUser,
          parent: {
            ...prevState.oldUser.parent,
            [newName]: value
          }
        }
      }
      ))
    }
    else if (name.match("school") !== null) {
      const keyName = name.replace("school", "").toLowerCase();
      this.setState((prevState) => ({
        newUser: {
          ...prevState.newUser,
          school: {
            ...prevState.newUser.school,
            [keyName]: value
          }
        },
        oldUser: {
          ...prevState.oldUser,
          school: {
            ...prevState.oldUser.school,
            [keyName]: value
          }
        }
      })
      )
    }
    else if (name === "etc") {
      this.setState((prevState) => ({
        newUser: {
          ...prevState.newUser,
          knowWhence: {
            ...prevState.newUser.knowWhence,
            etc: value
          }
        },
        oldUser: {
          ...prevState.oldUser,
          knowWhence: {
            ...prevState.oldUser.knowWhence,
            etc: value
          }
        }
      }))
    }
    else if (name === "knowWhence") {
      let checked = event.target.checked;

      this.setState((prevState) => ({
        newUser: {
          ...prevState.newUser,
          knowWhence: {
            ...prevState.newUser.knowWhence,
            [value]: checked
          }
        },
        oldUser: {
          ...prevState.oldUser,
          knowWhence: {
            ...prevState.oldUser.knowWhence,
            [value]: checked
          }
        }
      }))
    }
    else {
      this.setState((prevState) => (
        {
          newUser: {
            ...prevState.newUser,
            [name]: value
          },
          oldUser: {
            ...prevState.oldUser,
            [name]: value
          }
        }
      ))
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
    Object.keys(this.state.oldUser.knowWhence).forEach((keyName) => {
      if (keyName !== "etc") {
        if (!this.state.oldUser.knowWhence[keyName]) {
          countNotSelect += 1;
        }
      } else {
        if (this.state.oldUser.knowWhence.etc === "") {
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

  putUser = async (data) => {
    await UserService.putMe(data)
      .then(() => this.setState({ redirect: true }))
      .catch(() => this.toggleAlertModal())
  }

  resubmitAndCloseModal = () => {
    this.toggleAlertModal();
    this.clickSubmit();
  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/menu' />;
    }

    if (!this.state.finishLoad || this.state.errorLoad) {
      return <Waiting error={this.state.errorLoad} />
    } else {
      return (
        <ContainerDiv className="container-fluid justify-content-center" style={{ paddingBottom: '30px' }}>
          <div className="card p-5" style={{ boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`, borderRadius: `4px`, backgroundColor: `rgba(255, 255, 255, 0.9)` }}>
            <form onSubmit={e => { this.submitForm(e) }}>
              <h1 className="text-center"> แก้ไขข้อมูลส่วนตัว </h1>
              <section>
                <SectionHeader className="col-12">ข้อมูลส่วนตัว</SectionHeader>
                {
                  this.state.profileDataFirstSection.map((data, i) => (
                    <TextField
                      key={i}
                      className="col-12 col-md-6 form-group"
                      leftSide="col-12 col-md-4 col-form-label text-md-right"
                      rightSide="col-12 col-md-8"
                      labelInput={data.labelInput}
                      placeHolder={data.placeHolder}
                      value={this.state.oldUser[data.name]}
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
                  selectValue={this.state.oldUser.gender}
                  labelName="เพศสภาพ"
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("gender")}
                />
                <label className="col-12 col-md-6 form-group" htmlFor="birthDate">
                  <div className="row">
                    <div className="col-12 col-md-4 col-form-label text-md-right">วันเกิด</div>
                    <div className="col-12 col-md-8">
                      <input
                        className="form-control"
                        type="date"
                        name="birthDate"
                        id="birthDate"
                        min="1995-01-01"
                        max="2010-12-31"
                        value={this.state.oldUser.birthDate}
                        onChange={(e) => this.handleChange(e)}
                        required={true}
                        disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("birthdate")}
                      />
                    </div>
                  </div>
                </label>
                {/* <SelectField
                  dataOptions={this.state.religionData}
                  onClickFunc={this.handleChange}
                  selectId="religion"
                  selectName="religion"
                  selectValue={this.state.oldUser.religion}
                  labelName="ศาสนา"
                /> */}
                {
                  this.state.profileDataSecondSection.map((data, i) => (
                    <TextField
                      key={i}
                      className="col-12 col-md-6 form-group"
                      leftSide="col-12 col-md-4 col-form-label text-md-right"
                      rightSide="col-12 col-md-8"
                      labelInput={data.labelInput}
                      placeHolder={data.placeHolder}
                      value={this.state.oldUser.citizenId}
                      name={data.name}
                      onChange={(e) => this.handleChange(e)}
                      additional="form-text text-muted"
                      additionalText={data.additionalText}
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
                  selectValue={this.state.oldUser.bloodGroup}
                  labelName="กรุ๊ปเลือด"
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("bloodgroup")}
                /> */}
              </section>

              <section>
                <SectionHeader className="col-12">ข้อมูลการติดต่อ</SectionHeader>

                <TextField
                  className="col-12 col-md-6 form-group"
                  leftSide="col-12 col-md-4 col-form-label text-md-right"
                  rightSide="col-12 col-md-8"
                  labelInput="จังหวัด"
                  id="province"
                  name="province"
                  value={this.state.oldUser.province}
                  onChange={(e) => this.handleChange(e)}
                  placeholder="เลือก"
                  pattern={regexPattern.th}
                  title="โปรดกรอกเป็นภาษาไทย"
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("province")}
                />

                <TelNumberField
                  labelInput="เบอร์โทรศัพท์"
                  name="telNo"
                  value={this.state.oldUser.telNo}
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
                  value={this.state.oldUser.email}
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("email")}
                />
                <TelNumberField
                  labelInput="เบอร์โทรผู้ปกครอง"
                  name="parentTel"
                  value={this.state.oldUser.parent.telNo}
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
                  value={this.state.oldUser.parent.relation}
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("parentrelation")}
                />
                <TelNumberField
                  labelInput="เบอร์โทรฉุกเฉิน"
                  name="telEmergency"
                  value={this.state.oldUser.telEmergency}
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
                  value={this.state.oldUser.school.name}
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("schoolName")}
                />
                <SelectField
                  dataOptions={this.state.schoolLevelData}
                  onClickFunc={this.handleChange}
                  selectId="level"
                  selectName="schoolLevel"
                  selectValue={this.state.oldUser.school.level}
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
                  value={this.state.oldUser.school.major}
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
                  value={this.state.oldUser.school.gpax}
                  onChange={(e) => this.handleChange(e)}
                  required={true}
                  disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("schoolgpax")}
                />
              </section>
              <section>
                <SectionHeader className="col-12">ช่องทางที่รู้จักค่าย</SectionHeader>
                <MinHeightRow className="row form-group checkbox-group required">
                  <div className="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-1">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceFacebook"
                      value="facebook"
                      onClick={e => this.handleChange(e)}
                      checked={this.state.oldUser.knowWhence.facebook}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceFacebook">Facebook</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceCamphub"
                      value="camphub"
                      onClick={e => this.handleChange(e)}
                      checked={this.state.oldUser.knowWhence.camphub}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceCamphub">CampHub</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceDek-D"
                      value="dekd"
                      onClick={e => this.handleChange(e)}
                      checked={this.state.oldUser.knowWhence.dekd}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceDek-D">Dek-D</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceSIT"
                      value="sit"
                      onClick={e => this.handleChange(e)}
                      checked={this.state.oldUser.knowWhence.sit}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceSIT">SIT</label>
                  </div>
                  <div class="form-check form-check-inline col-8 offset-2 col-md-2 offset-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="knowWhence"
                      id="knowWhenceEtc"
                      value={null}
                      onClick={e => this.setEtcInput(e, !this.state.etcInput)}
                      ref={this.setEtcBoxRef}
                      checked={etcCheck}
                      required={true}
                      disabled={!this.state.isUserAcceptedData && notStoreableFieldName.includes("knowwhence")}
                    />
                    <label class="form-check-label" for="knowWhenceEtc">อื่นๆ</label>
                    {this.renderInputButton()}
                  </div>
                </MinHeightRow>
                <div className="row">
                  <div className="col-1"></div>
                  <SmallText class="col pt-2">น้องสามารถเลือกได้มากกว่าหนึ่งอย่าง</SmallText>
                </div>
              </section>
              <section>
                <SectionHeader className="col-12">ผลงานและทักษะทางด้านคอมพิวเตอร์</SectionHeader>
                <textarea
                  class="form-control"
                  placeholder="ผลงาน"
                  rows="4"
                  name="computerWorks"
                  value={this.state.oldUser.computerWorks}
                  onChange={(e) => this.handleChange(e)}
                ></textarea>
              </section>
              <NotDisplayButton ref={this.setProfileFormRef}> asd</NotDisplayButton>
            </form>
            <div className="d-flex justify-content-between mt-5 mb-auto">
              <ButtonRoute
                displayButtonRight="none"
                linkBack="menu"
                className=""
              />
              <ButtonStyle onClick={() => this.clickSubmit()} disabled={this.state.buttonDisable} > ยืนยัน </ButtonStyle>
              <CustomModal
                modal={this.state.confirmModal}
                toggle={this.toggleConfirmModal}
                header="ยืนยันการแก้ไขข้อมูล"
                paragraph="ต้องการแก้ไขข้อมูลใช่หรือไม่"
                primaryButtonDisplay="flex"
                primaryButtonText="ยืนยัน"
                primaryOnClick={e => this.putUser(this.state.oldUser)}
              />
              <CustomModal
                header="การบันทึกข้อมูลผิดพลาด"
                paragraph="การบันทึกข้อมูลเกิดข้อผิดพลาด ไม่สามารถส่งข้อมูลได้ กรุณากดยืนยันข้อมูลใหม่อีกครั้ง"
                secondaryButtonText="ยกเลิก"
                primaryButtonDisplay="flex"
                primaryButtonText="ยืนยัน"
                primaryOnClick={() => { this.resubmitAndCloseModal() }}
                modal={this.state.alertModal}
                toggle={this.toggleAlertModal}
              />
            </div>
          </div>
        </ContainerDiv>
      )
    }
  }
}
