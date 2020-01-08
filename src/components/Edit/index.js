import React, { Component } from 'react'

import AddressField from '../Profile/AddressField'
import TelNumberField from '../Profile/TelNumberField'
import TextField from '../Profile/TextField'
import ButtonRoute from '../Core/ButtonRoute'
import UserService from '../../services/UserService'

export default class Index extends Component {
  state = {
    profileData: [
      {
        labelInput: 'ชื่อ', placeHolder: 'สมชาย', name: 'firstName', value: ''
      },
      {
        labelInput: 'นามสกุล', placeHolder: 'ยอดชาย', name: 'lastName', value: ''
      },
      {
        labelInput: 'ชื่อ (ภาษาอังกฤษ)', placeHolder: 'Somchai', name: 'firstNameEn', value: ''
      },
      {
        labelInput: 'นามสกุล (ภาษาอังกฤษ)', placeHolder: 'Yodchai', name: 'lastNameEn', value: ''
      },
      {
        labelInput: 'ชื่อเล่น', placeHolder: 'สมชาย', name: 'nickName', value: ''
      },
      {
        labelInput: 'รหัสบัตรประชาชน / Passport Number', placeHolder: '1234567890987', name: 'citizenId', value: ''
      },
      {
        labelInput: 'สายการเรียน', placeHolder: 'วิทย์-ตณิต', name: 'schoolMajor', value: ''
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
    data: {
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
    buttonValue: true
  }


  async componentDidMount() {
    console.log(this.state.data)
    await this.getUserService()
  }

  componentDidUpdate() {
    console.log(this.state.data)
    if (this.state.newUser != null) {
      if (this.state.value) {
        this.setState({
          buttonValue: false
        })
      }
    }
  }

  getUserService = async () => {
    let data = await UserService.getUser(120001)
    const dataFormJSON = data.data.data[0]
    this.setState({
      data: dataFormJSON
    })
    // console.log(data)
    this.setValue(dataFormJSON)
  }

  setValue = (data) => {
    for (const [dataArrayFromData, dataFromData] of data) {
      for (const [dataArrayFromState, dataFromState] of this.state.profileData) {
        if (dataArrayFromData === dataArrayFromState) {
          console.log(dataArrayFromState+"="+dataFromData)
          this.setState((prevState) => ({
            profileData: [
              ...prevState.profileData,
              {
                ...prevState.this,
                value: dataFromData
              }
            ]
          })
          )}
      }
    }
  }

  putUser = async (data) => {
    // e.preventDefault()
    const nonRequireKey = [
      "allergicFood",
      "congenitalDisease",
      "congenitalDrug"
    ];
    Object.keys(data).map((keyData) => {
      if (!nonRequireKey.includes(keyData, 0)) {
        if (data[keyData] == null) {
          alert(keyData + " cannot be empty")
        }
      }
    })

    let data1 = await UserService.putUser(data)
    // console.log(data)
    // console.log(data1)
  }

  onChange = (e) => {
    this.setState({
      newUser: {
        [e.target.name]: e.target.value
      }
    })

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
          data: {
            ...prevState.data,
            address: {
              ...prevState.data.address,
              [dataArray]: dataFromEntity
            }
          }
        })
        )
      }
    }
  }

  handleClick = () => {
    this.setState({
      religion: true
    })
  }

  handleChange = (event) => {
    // console.log(2)
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
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value
      }
    }
    ))
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
              value={data.value}
              name={data.name}
              onChange={(e) => this.handleChange(e)}
              required
            />
          ))
        }
        <label className="col-6" htmlFor="birthDate">
          วัน / เดือน / ปี เกิด
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            min="1995-01-01"
            max="20010-12-31"
            value={this.state.data.birthDate}
            onChange={(e) => this.handleChange(e)}
            required
          />
        </label>
        <TelNumberField labelInput="เบอร์โทรศัพท์" name="telNo" value={this.state.data.telNo} onChange={(e) => this.handleChange(e)} required />
        <label className="col-6" htmlFor="gender">
          เพศสภาพ
            <select name="gender" id="gender" onChange={(e) => this.handleChange(e)} required>
            <option value="">เลือกเพศ</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
          </select>
        </label>
        <label className="col-6" htmlFor="bloodGroup">
          กรุ๊ปเลือด
            <select name="bloodGroup" id="bloodGroup" onChange={(e) => this.handleChange(e)} required>
            {
              this.state.booldGroupData.map((data, i) => <option value={data} key={i}>{data}</option>)
            }
          </select>
        </label>
        <label className="col-6" htmlFor="religion">
          ศาสนา
            <select name="religion" id="religion" onChange={(e) => this.handleChange(e)} required>
            {
              this.state.religionData.map((data, i) => <option value={data} key={i}>{data}</option>)
            }
          </select>
        </label>
        <TextField
          className="col-6"
          labelInput="โรงเรียน"
          placeHolder="ส่วนบุญโญปภัมภ์ ลำพูน"
          name="school"
          onChange={(e) => this.handleChange(e)}
          required
        />
        <label className="col-6" htmlFor="level">
          ระดับชั้น
            <select name="level" id="level" onChange={(e) => this.handleChange(e)} required>
            <option value="">เลือกระดับชั้น</option>
            <option value="ม.4">ม.4</option>
            <option value="ม.5">ม.5</option>
            <option value="ม.6">ม.6</option>
          </select>
        </label>
        <label className="col-6" htmlFor="gpax">
          GPAX
            <input type="number" id="gpax" min="1.00" max="4.00" name="gpax" placeholder="4.00" step="0.01" onChange={(e) => this.handleChange(e)} required />
        </label>
        <label className="col-6" htmlFor="email">
          e-mail
            <input type="email" id="email" name="email" placeholder="wipccamp@wip.camp" onChange={(e) => this.handleChange(e)} required />
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
              onChange={(e) => this.handleChange(e)}
            />
          ))
        }
        <div>
          <AddressField
            labelInput="เขต / อำเภอ"
            address="district"
            id="district"
            name="addrDistrict"
            value={this.state.district}
            onChange={(e) => this.onChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="เขต / อำเภอ"
            required
          />
          <AddressField
            labelInput="จังหวัด"
            address="province"
            id="province"
            name="addrProvice"
            value={this.state.province}
            onChange={(e) => this.onChange(e)}
            onSelect={(e) => this.onSelect(e)}
            placeholder="จังหวัด"
            required
          />
        </div>

        <h1>ข้อมูลฉุกเฉิน</h1>
        <TextField
          type="text"
          labelInput="เกี่ยวข้องกับน้องยังไง"
          placeHolder="บิดา"
          name="parentRelation"
          onChange={(e) => this.handleChange(e)}
          required
        />
        <TelNumberField labelInput="เบอร์โทรศัพท์" name="parentTel" onChange={(e) => this.handleChange(e)} required />
        <TelNumberField labelInput="เบอร์ติดต่อฉุกเฉิน" name="telEmergency" onChange={(e) => this.handleChange(e)} required />
        <br />
        <div className="d-flex justify-content-around ml-4 mr-5">
          <ButtonRoute buttonLeft="ยกเลิก" linkBack="/success" displayButtonRight="none" />
          <button disabled={this.state.buttonValue}>บันทึก</button>
        </div>
      </React.Fragment>
    )
  }
}
