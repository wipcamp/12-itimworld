import React, { Component } from 'react'

import AddressField from './AddressField'
import TelNumberField from './TelNumberField'
import TextField from './TextField'
import ButtonRoute from '../Core/ButtonRoute'

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
    religion: false,
    district: '',
    province: ''
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSelect(fullAddress) {
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
        <form>
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
          <TextField className="col-6" labelInput="รหัสบัตรประชาชน" placeHolder="00-0000-0000" name="citizenID" />
          <label className="col-6">
            วัน / เดือน / ปี เกิด
            <input type="date" name="birthDate" min="2003-01-01" max="2006-12-31" required />
          </label>
          <TelNumberField labelName="เบอร์โทรศัพท์" name="telNo" />
          <label className="col-6">
            เพศสภาพ
            <select name="gender" required>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </label>
          <label className="col-6" required>
            กรุ๊ปเลือด
            <select name="booldGroup">
              {
                this.state.booldGroup.map((data, i) => <option value={data}>{data}</option>)
              }
            </select>
          </label>
          <label className="col-6" required>
            ศาสนา
            <select name="religion">
              {
                this.state.religionData.map((data, i) => <option value={data}>{data}</option>)
              }
            </select>
          </label>
          <label className="col-6">
            โรงเรียน
            <select name="school" required>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </label>
          <label className="col-6">
            ระดับชั้น
            <select name="level" required>
              <option value="ม.4">ม.4</option>
              <option value="ม.5">ม.5</option>
              <option value="ม.6">ม.6</option>
            </select>
          </label>
          <label className="col-6">
            GPAX
            <input type="number" min="1.00" max="4.00" name="GPAX" placeholder="4.00" step="0.01" required />
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
          <label for="district">
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
          <label for="province">
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

          <ButtonRoute buttonLeft="next" linkNext="/major" />
        </form>

      </React.Fragment>
    )
  }
}
