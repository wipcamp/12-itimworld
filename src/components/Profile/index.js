import React, { Component } from 'react'
import styled from 'styled-components'
// import InputAddress from 'react-thailand-address-autocomplete'
// import AddressFormTypeahead from 'react-thailand-address-typeahead';

import TelNumberField from './TelNumberField'
import TextField from './TextField'
import ButtonRoute from '../Core/ButtonRoute'

// const Div = styled.div`
//   .typeahead-input-hint{
//     display: none;
//   }
//   .typeahead-address-container{
//     background-color: red;
//   }
// `

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
    religion: false
    //   subdistrict : null,
    //   district : null,
    //   province : null,
    //   zipcode : null
  }
  // onChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // onSelect(fullAddress) {
  //   const { subdistrict, district, province, zipcode } = fullAddress
  //   this.setState({
  //     subdistrict,
  //     district,
  //     province,
  //     zipcode
  //   })
  // }

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
              <option value="อื่นๆ" onChange={this.handleClick}>อื่นๆ</option>
            </select>
            {
              this.state.religion === true ?
                "wow" :
                <TextField className="col-6" labelInput="" type="text" placeHolder="ซิกส์" name="religion" />
            }
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
          {/* <Div>
          <AddressFormTypeahead
            renderResult={data => <span>{`ตำบล ${data.p} อำเภอ ${data.d}`} <br /> {`จังหวัด ${data.a} รหัสไปรษณีย์ ${data.z}`}</span>}
          />
        </Div> */}
          {/* <div>
          แขวง / ตำบล
        <InputAddress
            address="subdistrict"
            value={this.state.subdistrict}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
          เขต / อำเภอ
        <InputAddress
            address="district"
            value={this.state.district}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
          <InputAddress
            address="province"
            value={this.state.province}
            onChange={this.onChange}
            onSelect={this.onSelect}
            filter={(items) => items.filter(item => item.province !== 'กรุงเทพมหานคร')}
          />
        </div> */}
          <h1>ข้อมูลฉุกเฉิน</h1>
          <TextField
            type="text"
            labelInput="เกี่ยวข้องกับน้องยังไง"
            placeHolder="บิดา"
            name="parentRaltion"
          />
          <TelNumberField labelName="เบอร์โทรศัพท์" name="parentTel" />
          <TelNumberField labelName="เบอร์ติดต่อฉุกเฉิน" name="emergencyTel" />
          <ButtonRoute buttonLeft="next" />
        </form>

      </React.Fragment>
    )
  }
}
