import React, { Component } from 'react'

// import InputAddress from 'react-thailand-address-autocomplete'

import TextField from './TextField'
import ButtonRoute from '../Core/ButtonRoute'

export default class Index extends Component {
  // state = {
  //   subdistrict,
  //   district,
  //   province,
  //   zipcode
  // }
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
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h1 className="col-12">ข้อมูลส่วนตัว</h1>
          <TextField className="col-6" labelInput="ชื่อ" type="text" placeHolder="สมชาย" name="firstName" />
          <TextField className="col-6" labelInput="นามสกุล" type="text" placeHolder="ยอดชาย" name="lastName" />
          <TextField className="col-6" labelInput="ชื่อ (ภาษาอังกฤษ)" type="text" placeHolder="Sonchai" name="firstNameEN" />
          <TextField className="col-6" labelInput="นามสกุล (ภาษาอังกฤษ)" type="text" placeHolder="Yodchai" name="lastNameEN" />
          <TextField className="col-6" labelInput="ชื่อเล่น" type="text" placeHolder="สมชาย" name="nickName" />
          <TextField className="col-6" labelInput="รหัสบัตรประชาชน" type="number" placeHolder="00-0000-0000" name="telno" />
          <label className="col-6">
            วัน / เดือน / ปี เกิด
            <input type="date" id="start" name="trip-start"
              value="2018-07-22"
              min="2018-01-01" max="2018-12-31" />
          </label>
          <TextField className="col-6" labelInput="เบอร์โทรศัพท์" type="text" placeHolder="00-0000-0000" name="telno" />
          <label className="col-6">
            เพศสภาพ
            <select name="gender">
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </label>
        </div>
        {/* <label>
           แขวง / ตำบล
        <InputAddress
            address="subdistrict"
            value={this.state.subdistrict}
            onChange={this.onChange}
            onSelect={this.onSelect}
          />
        </label>
        <label>
        เขต / อำเภอ
        <InputAddress
          address="district"
          value={this.state.district}
          onChange={this.onChange}
          onSelect={this.onSelect}
        />
        </label> */}
        <ButtonRoute buttonLeft="next" />
      </React.Fragment>
    )
  }
}
