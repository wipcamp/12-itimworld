import React, { Component } from 'react'
import UserService from './../../services/UserService'
import ProfileData from './ProfileData';
import QuestionAnswer from './QuestionAnswer';

const topicList = [
  {
    firstName:"ชื่อ (ไทย)",
    lastName:"นามสกุล (ไทย)"
  },
  {
    firstNameEn:"ชื่อ (อังกฤษ)",
    lastNameEn:"นามสกุล (อังกฤษ)"
  },
  {
    nickName:"ชื่อเล่น",
    gender:"เพศ",
  },
  {
    birthDate:"วันเกิด",
    religion:"ศาสนา",
  },
  {
    citizenId:"เลขบัตรประชาชน"
  },
  {
    congenitalDisease:"โรคประจำตัว",
    allergicFood:"อาหารที่แพ้",
    congenitalDrug:"ยาที่แพ้"
  },
  {
    telNo:"เบอร์โทร",
    email:"อีเมลล์"
  },
  {
    parent:{
      telNo:"เบอร์โทรผูปกครอง",
      relation:"เกี่ยวข้องเป็น"
    }
  },
  {
    school:"ชื่อโรงเรียน",
    level:"ระดับชั้น"
  },
  {
    schoolMajor:"สายการเรียน",
    gpax:"เกรด"
  }
  ];
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
      "citizenId": "1151511515151",
      "gender": "ชาย",
      "bloodGroup": "O",
      "telNo": "999999999",
      "religion": "พุทธ",
      "school": "ส่วนบุญโญปภัมภ์ ลำพูน",
      "schoolMajor": "วิทย์ คณิต",
      "level": "ม.4",
      "telEmergency": "9999999999",
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
        "telNo": "9999999999",
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

  GetUser = async () => {
    let promise;
    try {
      promise = await UserService.getUser(1);
      let response = promise.data;
      if (response.success) {
        this.setState({
          user: response.data[0]
        });
      } else {
        console.log("Error getting user data")
      }
    } catch (e) {
      console.log("Error getting user data")
    }
  }

  async componentDidMount(){
    await this.GetUser();
    await console.log(this.state.user.gender);
    
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h2>ข้อมูลส่วนตัว</h2>
          <div>
            <div>
              {
                topicList.map((groupObject)=>{
                  return <div>
                    {
                    Object.keys(groupObject).map((keyName,i) => {
                      if(keyName === "parent"){
                        return (
                          Object.keys(groupObject[keyName]).map((innerObjectKeyName,j)=>{
                          return <ProfileData topic={groupObject[keyName][innerObjectKeyName]} data={this.state.user[keyName][innerObjectKeyName]} key={j} />
                        }))
                      }else{
                        return <ProfileData topic={groupObject[keyName]} data={this.state.user[keyName]} key={i} />
                      }
                    })
                    }
                  </div>
                })
              }
            </div>
          </div>
          <h2>ตอบคำถาม</h2>
          <div>
            {
              this.state.user.answerList.map((answer)=>{
                return <QuestionAnswer topic={answer.question.name} data={answer.answerContent} />
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}
