import React, { Component } from 'react'

import AddressField from '../Core/AddressField'
import TelNumberField from '../Core/TelNumberField'
import TextField from '../Core/TextField'
import ButtonRoute from '../Core/ButtonRoute'
import UserService from '../../services/UserService'

const userId = 120001;
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

        console.log(this.state.oldUser);
      } else {
        console.log("Error get User request")
      }
    } catch (e) {
      console.log("Error get User promise")
    }
  }

  componentDidUpdate() {
    // console.log(this.state.newUser)
    if (this.state.newUser != '') {
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

    let data1 = await UserService.putUser(userId, data)
    // console.log(data)
    // console.log(data1)
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
          address: {
            ...prevState.newUser.address,
            [name]: value
          }
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
          parent: {
            ...prevState.newUser.parent,
            [name]: value
          }
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
              value={this.state.oldUser[data.name]}
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
            value={this.state.oldUser.birthDate}
            onChange={(e) => this.handleChange(e)}
            required
          />
        </label>
        <TelNumberField labelInput="เบอร์โทรศัพท์" name="telNo" value={this.state.oldUser.telNo} onChange={(e) => this.handleChange(e)} required />
        <label className="col-6" htmlFor="gender">
          เพศสภาพ
            <select name="gender" id="gender" value={this.state.oldUser.gender} onChange={(e) => this.handleChange(e)} required>
            <option value="">เลือกเพศ</option>
            <option value="ชาย">ชาย</option>
            <option value="หญิง">หญิง</option>
          </select>
        </label>
        <label className="col-6" htmlFor="bloodGroup">
          กรุ๊ปเลือด
            <select name="bloodGroup" id="bloodGroup" value={this.state.oldUser.bloodGroup} onChange={(e) => this.handleChange(e)} required>
            {
              this.state.booldGroupData.map((data, i) => <option value={data} key={i}>{data}</option>)
            }
          </select>
        </label>
        <label className="col-6" htmlFor="religion">
          ศาสนา
            <select name="religion" id="religion" value={this.state.oldUser.religion} onChange={(e) => this.handleChange(e)} required>
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
          value={this.state.oldUser.school}
          onChange={(e) => this.handleChange(e)}
          required
        />
        <label className="col-6" htmlFor="level">
          ระดับชั้น
            <select name="level" id="level" value={this.state.oldUser.level} onChange={(e) => this.handleChange(e)} required>
            <option value="">เลือกระดับชั้น</option>
            <option value="ม.4">ม.4</option>
            <option value="ม.5">ม.5</option>
            <option value="ม.6">ม.6</option>
          </select>
        </label>
        <label className="col-6" htmlFor="gpax">
          GPAX
            <input type="number" id="gpax" min="1.00" max="4.00" name="gpax" placeholder="4.00" step="0.01" value={this.state.oldUser.gpax} onChange={(e) => this.handleChange(e)} required />
        </label>
        <label className="col-6" htmlFor="email">
          e-mail
            <input type="email" id="email" name="email" placeholder="wipccamp@wip.camp" value={this.state.oldUser.email} onChange={(e) => this.handleChange(e)} required />
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
              value={this.state.oldUser[data.name]}
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
            onChange={(e) => this.handleChange(e)}
            onSelect={(e) => this.onSelect(e)}
            value={this.state.oldUser.address.district}
            placeholder="เขต / อำเภอ"
            required
          />
          <AddressField
            labelInput="จังหวัด"
            address="province"
            id="province"
            name="addrProvice"
            onChange={(e) => this.handleChange(e)}
            onSelect={(e) => this.onSelect(e)}
            value={this.state.oldUser.address.province}
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
          value={this.state.oldUser.parent.relation}
          onChange={(e) => this.handleChange(e)}
          required
        />
        <TelNumberField labelInput="เบอร์โทรศัพท์" name="parentTel" value={this.state.oldUser.parent.telNo} onChange={(e) => this.handleChange(e)} required />
        <TelNumberField labelInput="เบอร์ติดต่อฉุกเฉิน" name="telEmergency" value={this.state.oldUser.telEmergency} onChange={(e) => this.handleChange(e)} required />
        <br />
        <div className="d-flex justify-content-around ml-4 mr-5">
          <ButtonRoute buttonLeft="ยกเลิก" linkBack="/success" displayButtonRight="none" />
          <button disabled={this.state.buttonValue}>บันทึก</button>
        </div>
      </React.Fragment>
    )
  }
}
