import React, { Component } from 'react'

import AddressField from './AddressField'
import TelNumberField from './TelNumberField'
import TextField from './TextField'
import ButtonRoute from '../Core/ButtonRoute'
import ProfileService from '../../services/ProfileService'

const { apiUrl } = window['runConfig'];
export default class Index extends Component {
  state = {
    profileData: [
      {
        labelInput: 'ชื่อ', placeHolder: 'สมชาย', name: 'firstName'
      },
      {
        labelInput: 'นามสกุล', placeHolder: 'ยอดชาย', name: 'lastName'
      },
      {
        labelInput: 'ชื่อ (ภาษาอังกฤษ)', placeHolder: 'Somchai', name: 'firstNameEN'
      },
      {
        labelInput: 'นามสกุล (ภาษาอังกฤษ)', placeHolder: 'Yodchai', name: 'lastNameEN'
      },
      {
        labelInput: 'ชื่อเล่น', placeHolder: 'สมชาย', name: 'nickName'
      },
      {
        labelInput: 'รหัสบัตรประชาชน / Passport Number', placeHolder: '1234567890987', name: 'citizenID'
      }
    ],
    congenitalData: [
      {
        labelInput: 'อาหารที่แพ้', placeHolder: 'ข้าว', name: 'allegicFood'
      },
      {
        labelInput: 'โรคประจำตัว', placeHolder: 'ขาดข้าวไม่ได้', name: 'congenitalDisease'
      },
      {
        labelInput: 'ยาที่แพ้', placeHolder: 'ยาแก้แพ้', name: 'congenitalDrug'
      }
    ],
    religionData: ['พุทธ', 'คริสต์', 'อิสลาม', 'ฮินดู', 'ซิกส์'],
    booldGroup: ['O', 'A', 'B', 'AB'],
    district: '',
    province: ''
  }

  componentDidMount () {
    this.getProfileService();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getProfileService = async () =>{
    let data = await ProfileService.getProfile(1);
  }

  onSelect = (fullAddress) => {
    const { district, province } = fullAddress
    this.setState({
      district,
      province
    })
  }

  handleClick = () => {
    this.setState({
      religion: true
    })
  }
  render() {
    return (
      <React.Fragment>
          <h1 className="col-12">ข้อมูลส่วนตัว</h1>
          {
            this.state.profileData.map((data, i) => (
              <TextField
                key={i}
                className="col-6"
                labelInput={data.labelInput}
                placeHolder={data.placeHolder}
                name={data.name}
                required="true"
              />
            ))
          }
          <label className="col-6" htmlFor="birthDate">
            วัน / เดือน / ปี เกิด
            <input type="date" name="birthDate" id="birthDate" min="2003-01-01" max="2006-12-31" required />
          </label>
          <TelNumberField labelName="เบอร์โทรศัพท์" name="telNo" />
          <label className="col-6" htmlFor="gender">
            เพศสภาพ
            <select name="gender" id="gender" required>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </label>
          <label className="col-6" htmlFor="booldGroup">
            กรุ๊ปเลือด
            <select name="booldGroup" id="booldGroup">
              {
                this.state.booldGroup.map((data, i) => <option value={data} key={i}>{data}</option>)
              }
            </select>
          </label>
          <label className="col-6" htmlFor="religion">
            ศาสนา
            <select name="religion" id="religion" required>
              {
                this.state.religionData.map((data, i) => <option value={data} key={i}>{data}</option>)
              }
            </select>
          </label>
          <label className="col-6" htmlFor="school">
            โรงเรียน
            <select name="school" id="school" required>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </label>
          <label className="col-6" htmlFor="level">
            ระดับชั้น
            <select name="level" id="level" required>
              <option value="ม.4">ม.4</option>
              <option value="ม.5">ม.5</option>
              <option value="ม.6">ม.6</option>
            </select>
          </label>
          <label className="col-6" htmlFor="gpax">
            GPAX
            <input type="number" id="gpax" min="1.00" max="4.00" name="GPAX" placeholder="4.00" step="0.01" required />
          </label>
          {
            this.state.congenitalData.map((data, i) => (
              <TextField
                key={i}
                className="col-6"
                type="text"
                labelInput={data.labelInput}
                placeHolder={data.placeHolder}
                name={data.name}
              />
            ))
          }
          <div>
          <label htmlFor="district">
              เขต / อำเภอ
            <AddressField
                address="district"
                id="district"
                name="addr_district"
                value={this.state.district}
                onChange={(e) => this.onChange(e)}
                onSelect={(e) => this.onSelect(e)}
                placeholder="เขต / อำเภอ"
              />
          </label>
          <label htmlFor="province">
              จังหวัด
              <AddressField
                address="province"
                id="province"
                name="addr_provice"
                value={this.state.province}
                onChange={(e) => this.onChange(e)}
                onSelect={(e) => this.onSelect(e)}
                placeholder="จังหวัด"
              />
          </label>
          </div>

          <h1>ข้อมูลฉุกเฉิน</h1>
          <TextField
            type="text"
            labelInput="เกี่ยวข้องกับน้องยังไง"
            placeHolder="บิดา"
            name="parentRaltion"
            required="false"
          />
          <TelNumberField labelName="เบอร์โทรศัพท์" name="parentTel" />
          <TelNumberField labelName="เบอร์ติดต่อฉุกเฉิน" name="emergencyTel" />

          <ButtonRoute displayButtonLeft="none" buttonRight="next" linkNext="/major" />
        
      </React.Fragment>
    )
  }
}
