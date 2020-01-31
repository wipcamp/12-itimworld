import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserService from '../../services/UserService'

import ConfirmModal from './ConfirmModal';

const userId = 120001;

export default class EditModal extends Component {
  
  state = {
    newUser: {},
    newUserObj: {},
    data:{}
  }
  componentDidUpdate(prevProps){
    if(this.props.newUser !== prevProps.newUser){
      const dataEntries = Object.entries(this.props.newUser)
      for (const [dataArray, dataFromEntity] of dataEntries) {
        const newName = dataArray === "firstName" ? "ชื่อ" 
                          : dataArray === "firstNameEn" ? "ชื่อ (ภาษาอังกฤษ)" 
                          : dataArray === "lastName" ? "นามสกุล"
                          : dataArray === "lastNameEn" ? "นามสกุล (ภาษอังกฤษ)"
                          : dataArray === "nickName" ? "ชื่อเล่น"
                          : dataArray === "email" ? "E-mail"
                          : dataArray === "brithDate" ? "วัน / เดือน / ปี เกิด"
                          : dataArray === "citizenId" ? "รหัสบัตรประชาชน / Passport Number"
                          : dataArray === "gender" ? "เพศสภาพ"
                          : dataArray === "bloodGroup" ? "กรุ๊ปเลือด"
                          : dataArray === "telNo" ? "เบอร์โทรศัพท์"
                          : dataArray === "religion" ? "ศาสนา"
                          : dataArray === "school" ? "โรงเรียน"
                          : dataArray === "schoolMajor" ? "สายการเรียน"
                          : dataArray === "level" ? "ระดับชั้น"
                          : dataArray === "telEmergency" ? "เบอร์ติดต่อฉุกเฉิน"
                          : dataArray === "parentRelation" ? "เกี่ยวข้องกับน้องยังไง"
                          : dataArray === "parentTel" ? "เบอร์โทรศัพท์ของผู้ปกครอง"
                          : dataArray === "congenitalDrug" ? "ยาที่แพ้"
                          : dataArray === "congenitalDisease" ? "โรคประจำตัว"
                          : dataArray === "allergicFood" ? "อาหารที่แพ้"
                          : dataArray === "congenitalDrug" ? "อาหารที่แพ้"
                          : dataArray === "congenitalDrug" ? "อาหารที่แพ้"
                          : dataArray === "province" ? "เขต / อำเภอ"
                          : dataArray === "district" ? "จังหวัด"
                          : dataArray === "skill" ? "ผลงานและทักษะทางด้านคอมพิวเตอร์"
                          : dataArray 
        const data = newName + "   " + dataFromEntity
          this.setState((prevState) => ({
            newUser: {
              ...prevState.newUser,
              [newName] : data
            }
          }))
        }
      this.setState(state => ({

        data: this.props.data
      }))
    }
  }
    
  putUser = async (data) => {
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
    // console.log(data1)
  }

  render() {

    return (
      <div className={this.props.className}>
        <ConfirmModal disabled={this.props.disabled} newUser={this.state.newUser} onClick={() => this.putUser(this.state.data)}/>
      </div>
    )
  }
}

EditModal.propType = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  newUser: PropTypes.object, 
  data: PropTypes.object
}

