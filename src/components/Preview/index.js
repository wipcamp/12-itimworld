import React, { Component } from 'react'
import UserService from './../../services/UserService'
import ProfileData from './ProfileData';
import QuestionAnswer from './QuestionAnswer';
import Styled from 'styled-components';
import ButtonRoute from '../Core/ButtonRoute';
import ConfirmModal from './ConfirmModal'

const generalQuestion = [
  "Mock general question 1",
  "Mock general question 2"
];

const Header = Styled.h2`
  position: relative;
  top: -20px;

  font-family: Sarabun;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 47px;

  display: flex;
  align-items: flex-end;

  color: #000000;
`
const Rectangle = Styled.div`

  background: #FFFFFF;
  opacity: 0.75;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`

const WarningList = Styled.li`
  font-family: Sarabun;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;

  /* red */
  color: #F5222D;
`

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
      ],
      "generalAnswer": {
        "id": 39,
        "firstAnswer": "",
        "secondAnswer": "asdfasdfasdf"
      },
      "computerWorks":"abcdefghijklmnopqrstuvwxyz"
    }
  }

  GetUser = async () => {
    let promise;
    try {
      promise = await UserService.getMe();
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
  }
 
  render() {
    return (
        <Rectangle className="container justify-content-center mt-5 mb-5 pb-5">
          <div className="container-fluid mb-5 justify-content-center">
          <Header>ข้อมูลส่วนตัว</Header>
              {
                topicList.map((groupObject)=>{
                  return <div className="row container-fluid">
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
          <div className="container-fluid justify-content-center">
            <Header>คำถามทั่วไป</Header>
            {
              Object.keys(this.state.user.generalAnswer).map((keyName,i) => (
                <React.Fragment>
                {
                  keyName !== "id" ?
                    <QuestionAnswer 
                      topic={generalQuestion[i-1]} 
                      data={this.state.user.generalAnswer[keyName]} 
                      count={i-1} key={i} 
                    />
                  : 
                  ''
                }
                </React.Fragment>
              ))
            }
          </div>
          <div className="container-fluid justify-content-center">
            <Header>คำถามสาขา: {this.state.user.major.name}</Header>
            {
              this.state.user.answerList.map((answer,index)=>{
                return <QuestionAnswer topic={answer.question.name} data={answer.answerContent} count={index} key={index} />
              })
            }
          </div>
          <div className="container-fluid justify-content-center">
            <Header>ผลงานด้านคอมพิวเตอร์</Header>
            <p> {this.state.user.computerWorks} </p> 
          </div>
          <div className="container-fluid justify-content-center">
            <ul>
              <WarningList>โปรดตรวจสอบรายละเอียดให้เรียบร้อย หากข้อมูลที่กรอกมาเป็นเท็จทางค่ายจะตัดสิทธิ์ทันที</WarningList>
              <WarningList>หากกดยืนยันจะไม่สามารถกลับมาแก้ไขข้อมูลได้อีก</WarningList>
            </ul>
          </div>
          <div className="container-fluid justify-content-center">
            <ButtonRoute 
              className="col-6 d-inline-flex"
              linkBack ={"/questions?major="+this.state.user.major.id}
              displayButtonRight="none"
            />
            <ConfirmModal />
          </div>
        </Rectangle>
    )
  }
}
