import React, { Component } from 'react'
import styled from 'styled-components'

import AddressField from '../Core/AddressField'
import TelNumberField from '../Core/TelNumberField'
import TextField from '../Core/TextField'
import ButtonRoute from '../Core/ButtonRoute'
import UserService from '../../services/UserService'
import Field from '../Core/Field'
import EditModal from './EditModal'

const userId = 120001;

const Header = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;
  text-align: center;
  color: #000000;
`
export default class Index extends Component {
  state = {
    profileDataFirstSection: [
      {
        labelInput: 'ชื่อ', placeHolder: 'วิปโป้', name: 'firstName', additionalText: 'ไม่ต้องใส่คำนำหน้าชื่อ'
      },
      {
        labelInput: 'นามสกุล', placeHolder: 'ใจดี', name: 'lastName'
      },
      {
        labelInput: 'Firstname', placeHolder: '', name: 'firstNameEn', additionalText: 'ไม่ต้องใส่คำนำหน้าชื่อ'
      },
      {
        labelInput: 'Lastname', placeHolder: '', name: 'lastNameEn'
      },
      {
        labelInput: 'ชื่อเล่น', placeHolder: '', name: 'nickName'
      }
    ],
    profileDataSecondSection: [
      {
        labelInput: 'รหัสบัตรประชาชน', placeHolder: '', name: 'citizenId'
      }
    ],
    congenitalData: [
      {
        labelInput: 'อาหารที่แพ้', placeHolder: 'ข้าว', name: 'allergicFood'
      },
      {
        labelInput: 'โรคประจำตัว', placeHolder: 'ขาดข้าวไม่ได้', name: 'congenitalDisease'
      },
      {
        labelInput: 'ยาที่แพ้', placeHolder: 'ยาแก้แพ้', name: 'congenitalDrug'
      }
    ],
    religionData: ['เลือกศาสนา', 'พุทธ', 'คริสต์', 'อิสลาม', 'ฮินดู', 'ซิกส์'],
    booldGroupData: ['เลือกกรู๊ปเลือด', 'O', 'A', 'B', 'AB'],
    district: '',
    province: '',
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
      schoolMajor: '',
      level: '',
      gpax: '',
      email: '',
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
    buttonValue: true
  }


  async componentDidMount() {
    let promise;
    try {
      promise = await this.getUserService();
      let response = promise.data;

      if (response.success) {
        this.setState({
          oldUser: response.data[0],
          oldData: response.data[0]
        });
      } else {
        console.log("Error get User request")
      }
    } catch (e) {
      console.log("Error get User promise")
    }
  }

  componentDidUpdate() {
    console.log(this.state.oldUser)

    if (this.state.newUser !== '') {
      if (this.state.buttonValue) {
        this.setState({
          buttonValue: false
        })
      }
    }
  }

  getUserService = async () => {
    return await UserService.getUser(userId);
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
            address: {
              ...prevState.newUser.address,
              [dataArray]: dataFromEntity
            }
          }
        })
        )
      }
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "district" || name === "province") {
      this.setState((prevState) => ({
        [name]: value,
        oldUser: {
          ...prevState.oldUser,
          address: {
            ...prevState.oldUser.address,
            [name]: value
          }
        },
        newUser:{
          ...prevState.newUser,
            [name]: value
        }
      })
      )
    }
    if (name === "parentRelation" || name === "parentTel") {
      const newName = name === "parentRelation" ? "relation" : "telNo"
      this.setState((prevState) => ({
        oldUser: {
          ...prevState.oldUser,
          parent: {
            ...prevState.oldUser.parent,
            [newName]: value
          }
        },
        newUser: {
          ...prevState.newUser,
          [name]: value
          }
        }
      ))
    }
    this.setState((prevState) => ({
      oldUser: {
        ...prevState.oldUser,
        [name]: value
      },
      newUser: {
        ...prevState.newUser,
        [name]: value
        }
      }
    ))
  }

  render() {
    return (
      <div className="container">
        <Header className="text-center pt-5"> แก้ไขข้อมูลส่วนตัว </Header> 
        <section>
          <h3 className="col-12">ข้อมูลส่วนตัว</h3>
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
                required
              />
            ))
          }
          <label className="col-12 col-md-6 form-group" htmlFor="gender">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">เพศ </div>
              <div className="col-12 col-md-8">
                <select className="form-control" name="gender" id="gender" value={this.state.oldUser.gender} onChange={(e) => this.handleChange(e)} required>
                  <option value="">เลือกเพศ</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                </select>
              </div>
            </div>
          </label>
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
                  max="20010-12-31"
                  value={this.state.oldUser.birthDate}
                  onChange={(e) => this.handleChange(e)}
                  required
                />
              </div>
            </div>
          </label>
          <label className="col-12 col-md-6 form-group" htmlFor="religion">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">ศาสนา</div>
              <div className="col-12 col-md-8">
                <select className="form-control" name="religion" id="religion" value={this.state.oldUser.religion} onChange={(e) => this.handleChange(e)} required>
                  {this.state.religionData.map((data, i) => <option value={data} key={i}>{data}</option>)}
                </select>
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
                value={this.state.oldUser.citizenId}
                name={data.name}
                onChange={(e) => this.handleChange(e)}
                additional="form-text text-muted"
                additionalText={data.additionalText}
                required
              />
            ))
          }
          <label className="col-12 col-md-6 form-group" htmlFor="bloodGroup">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">กรุ๊ปเลือด</div>
              <div className="col-12 col-md-8">
                <select className="form-control" name="bloodGroup" id="bloodGroup" value={this.state.oldUser.bloodGroup} onChange={(e) => this.handleChange(e)} required>
                  {this.state.booldGroupData.map((data, i) => <option value={data} key={i}>{data}</option>)}
                </select>
              </div>
            </div>
          </label>
          {
            this.state.congenitalData.map((data, i) => (
              <TextField
                key={i}
                className="col-12 col-md-6 form-group"
                leftSide="col-12 col-md-4 col-form-label text-md-right"
                rightSide="col-12 col-md-8"
                type="text"
                labelInput={data.labelInput}
                placeHolder={data.placeHolder}
                value={this.state.oldUser[data.name]}
                name={data.name}
                onChange={(e) => this.handleChange(e)}
              />
            ))
          }
          </section>
        <section>
          <h3 className="col-12">ข้อมูลการติดต่อ</h3>

          <AddressField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="จังหวัด"
            address="province"
            id="province"
            name="addrProvice"
            value={this.state.oldUser.address.province}
            onChange={(e) => this.handleChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="เลือก"
            required
          />

          <AddressField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="เขต / อำเภอ"
            address="district"
            id="district"
            name="addrDistrict"
            value={this.state.oldUser.address.district}
            onChange={(e) => this.handleChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="เลือก"
            required
          />

          <TelNumberField labelInput="เบอร์โทรศัพท์" name="telNo" value={this.state.oldUser.telNo} onChange={(e) => this.handleChange(e)} required />
          <Field
            className="col-12 col-md-6 form-group"
            name="email"
            type="email"
            labelInput="E-Mail"
            placeHolder=""
            value={this.state.oldUser.email}
            onChange={(e) => this.handleChange(e)}
            required="required" />
          <TelNumberField labelInput="เบอร์โทรผู้ปกครอง" name="parentTel" value={this.state.oldUser.parent.telNo} onChange={(e) => this.handleChange(e)} required />
          <TextField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            type="text"
            labelInput="ผู้ปกครองเกี่ยวข้องเป็น"
            placeHolder=""
            name="parentRelation"
            value={this.state.oldUser.parent.relation}
            onChange={(e) => this.handleChange(e)}
            required
          />
          <TelNumberField labelInput="เบอร์โทรฉุกเฉิน" name="telEmergency" value={this.state.oldUser.telEmergency} onChange={(e) => this.handleChange(e)} required />
        </section>
        <section>
          <h3 className="col-12">ข้อมูลการศึกษา</h3>
          <TextField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="โรงเรียน"
            placeHolder="เลือก"
            name="school"
            value={this.state.oldUser.school}
            onChange={(e) => this.handleChange(e)}
            required
          />
          <label className="col-12 col-md-6 form-group" htmlFor="level">
            <div className="row">
              <div className="col-12 col-md-4 col-form-label text-md-right">ระดับชั้น</div>
              <div className="col-12 col-md-8">
                <select className="form-control" name="level" id="level" value={this.state.oldUser.level} onChange={(e) => this.handleChange(e)} required>
                  <option value="">เลือก</option>
                  <option value="ม.4">ม.3 ขึ้น ม.4</option>
                  <option value="ม.5">ม.4 ขึ้น ม.5</option>
                  <option value="ม.6">ม.5 ขึ้น ม.6</option>
                </select>
              </div>
            </div>
          </label>
          <TextField
            className="col-12 col-md-6 form-group"
            leftSide="col-12 col-md-4 col-form-label text-md-right"
            rightSide="col-12 col-md-8"
            labelInput="สายการเรียน"
            placeHolder="เลือก"
            name="schoolMajor"
            value={this.state.oldUser.schoolMajor}
            onChange={(e) => this.handleChange(e)}
            required
          />
          <Field
            className="col-12 col-md-6 form-group"
            name="gpax"
            type="number"
            labelInput="เกรดเฉลี่ย"
            placeHolder=""
            step="0.01"
            min="1.00"
            max="4.00"
            value={this.state.oldUser.gpax}
            onChange={(e) => this.handleChange(e)}
            required="required" />
        </section>

        <h3 className="col-12">ผลงานและทักษะทางด้านคอมพิวเตอร์</h3>
        <textarea class="form-control" placeholder="ผลงาน" rows="4" name="skill" value={this.state.oldUser.skill} onChange={(e) => this.handleChange(e)}></textarea>

        <div className="d-flex justify-content-between ml-4 mr-5">
          <ButtonRoute className="my-5" buttonLeft="ยกเลิก" linkBack="/success" displayButtonRight="none" />
          <EditModal className="my-5" disabled={this.state.buttonValue} newUser={this.state.newUser} data={this.state.oldUser}/>
        </div>
     </div>
    )
  }
}
