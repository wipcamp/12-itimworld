import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserService from '../../services/UserService'

import ConfirmModal from './ConfirmModal';

import CustomModal from './../Core/CustomModal'

import {Redirect} from 'react-router-dom'

const userId = 120001;

const keyNameToText = {
  "firstName": "ชื่อ",
  "lastName": "นามสกุล",
  "firstNameEn": "Firstname",
  "lastNameEn": "Lastname",
  "nickName": "ชื่อเล่น",
  "email": "E-Mail",
  "birthDate": "วันเกิด",
  "citizenId": "เลขบัตรประชาชน",
  "gender": "เพศสภาพ",
  "bloodGroup": "กรุ๊ปเลือด",
  "telNo": "เบอร์โทรศัพท์",
  "religion": "ศาสนา",
  "telEmergency": "เบอร์โทรฉุกเฉิน",
  "allergicFood": "อาหารที่แพ้",
  "congenitalDisease": "โรคประจำตัว",
  "congenitalDrug": "ยาที่แพ้",
  "computerWorks": "ผลงานทางด้านคอมพิวเตอร์",
  "province": "จังหวัด",
  "school": {
    "name": "โรงเรียน",
    "level": "ระดับชั้น",
    "major": "สาขการเรียน",
    "gpax": "เกรดเฉลี่ย"
  },
  "parent": {
    "telNo": "เบอร์โทรผู้ปกครอง",
    "relation": "ผู้ปกครองเกียวข้องเป็น"
  },
  "knowWhence": {
    "id": 3,
    "facebook": "Facebook",
    "camphub": "Camphub",
    "dekd": "Dek-D",
    "sit": "คณะ SIT"
  }
}

export default class EditModal extends Component {
  
  state = {
    displayText:[],
    data:{},
    redirect:false,
    errorModal: false
  }

  toggleModal = () => {
    this.setState({errorModal:!this.state.errorModal});
  }

  isExist = (data) =>{
    return data !== undefined && data !== null && Object.keys(data).length !== 0
  }

  componentDidUpdate(prevProps){
    if(this.props.newUser !== prevProps.newUser){
      if(this.isExist(this.props.newUser)){
        const newUserKeys = Object.keys(this.props.newUser);
        let finalDisplayText = [];
        newUserKeys.forEach((key)=>{
          let newValue;
          let thaiContext;
          if(key === "knowWhence"){
            const knowWhenceKeys = Object.keys(this.props.newUser[key]);
            let knowWhenceChangeText = [];
            knowWhenceKeys.forEach((knowWhenceKey)=>{
              if(this.props.newUser[key][knowWhenceKey] === true || this.isExist(this.props.newUser[key]["etc"])){
                
                if(knowWhenceKey === "etc"){
                  newValue = this.props.newUser[key][knowWhenceKey]
                }else{
                  newValue = keyNameToText[key][knowWhenceKey]
                }

                if(knowWhenceChangeText.length !== 0){
                  thaiContext = ", "
                  knowWhenceChangeText.push(this.performNewDisplayString(thaiContext,newValue,false))
                }else{
                  thaiContext = "ช่องทางที่รู้จัก"
                  knowWhenceChangeText.push(this.performNewDisplayString(thaiContext,newValue))
                }
              }
            })
            finalDisplayText.push(knowWhenceChangeText)
          }else if(key === "school"){
            const schoolKeys = Object.keys(this.props.newUser[key]);
            schoolKeys.forEach((schoolKey)=>{
              newValue = this.props.newUser[key][schoolKey]
              thaiContext = keyNameToText[key][schoolKey]
              finalDisplayText.push(this.performNewDisplayString(thaiContext,newValue))
            })
          }else if(key === "parent"){
            const parentKeys = Object.keys(this.props.newUser[key]);
            parentKeys.forEach((parentKey)=>{
              newValue = this.props.newUser[key][parentKey]
              thaiContext = keyNameToText[key][parentKey]
              finalDisplayText.push(this.performNewDisplayString(thaiContext,newValue))
            })
          }else{
            newValue = this.props.newUser[key]
            if(newValue === ""){
              newValue = "ไม่มี"
            }
            thaiContext = keyNameToText[key]
            finalDisplayText.push(this.performNewDisplayString(thaiContext,newValue))
          }
        });
        this.setState({displayText:finalDisplayText});
      }
    }
  }

  performNewDisplayString = (context,value, addChange = true) => {
    if(addChange){
      return context+" แก้ไขเป็น "+value;
    }else{
      return context+value;
    }
  }
    
  putUser = async (data) => {
    await UserService.putMe(data)
    .then(()=>this.setState({redirect:true}))
    .catch(()=>this.toggleModal())
  }

  render() {
    if(this.state.redirect){
      return <Redirect to="/menu" />
    }else{
      return (
        <div className={this.props.className}>
          <ConfirmModal 
            disabled={this.props.disabled} 
            displayText={this.state.displayText} 
            onClick={() => this.putUser(this.state.data)} 
            modal={this.props.modal} 
            toggleModal={this.props.toggle}
            onClickButton={this.props.onClick}  
          />
          <CustomModal header="เกิดข้อผิดพลาดขึ้น" paragraph="โปรดติดต่อเจ้าหน้าที่" secondaryButtonText="ปิด" modal={this.state.errorModal} toggle={this.toggleModal} />
        </div>
      )
    }
  }
}

EditModal.propType = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  newUser: PropTypes.object, 
  data: PropTypes.object,
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

