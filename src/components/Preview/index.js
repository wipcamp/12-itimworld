import React, { Component } from 'react'
import UserService from './../../services/UserService'

export default class Index extends Component {

  state = {
    user: {
      "id": 0,
      "wipId": 0,
      "lineId": 0,
      "facebookId": 0,
      "firstName": "สมชาย",
      "lastName": "ยอดชาย",
      "firstNameEn": "Somchai",
      "lastNameEn": "Yodchai",
      "nickName": "สมชาย",
      "email": "somchai@gmail.com",
      "birthDate": "1996-10-10",
      "citizenId": "0000000000000",
      "gender": "ชาย",
      "bloodGroup": "O",
      "telNo": 999999999,
      "religion": "พุทธ",
      "school": "ส่วนบุญโญปภัมภ์ ลำพูน",
      "schoolMajor": "วิทย์ คณิต",
      "level": "ม.4",
      "telEmergency": 9999999999,
      "gpax": 3.78,
      "allergicFood": null,
      "congenitalDisease": "ไม่มีโรคประจำตัว",
      "congenitalDrug": "แพ้ยาแก้ไอ",
      "address": {
        "id": 1,
        "province": "ลำพูน",
        "district": "เมืองลำพูน"
      },
      "parent": {
        "id": 2,
        "telNo": 0,
        "relation": "พ่อ"
      },
      "major": {
        "id": 1,
        "name": "Science",
        "description": "What to learn",
        "questionList": [{
            "id": 1,
            "name": "What is my name"
          },
          {
            "id": 2,
            "name": "What time is it"
          }
        ]
      },
      "answerList": [{
          "id": 19,
          "question": {
            "id": 1,
            "name": "What is my name"
          },
          "answerContent": "Nope"
        },
        {
          "id": 20,
          "question": {
            "id": 2,
            "name": "What time is it"
          },
          "answerContent": "Its 4.20"
        }
      ]
    }
  }

  GetUserData = async () => {
    let promise = await UserService.getUser(1);
    let response = promise.data;
    if(response.code === 200){
      this.setState({user:response.data[0]});
      console.log(this.state.user);
    }else{
      console.log("Error getting user data")
    }
  }

  async componentDidMount(){
    await this.GetUserData();
  }

  render() {
    return (
      <React.Fragment>
        This is preview page
      </React.Fragment>
    )
  }
}
