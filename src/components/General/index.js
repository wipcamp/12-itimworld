import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import UserService from './../../services/UserService'
import styled from 'styled-components'
import CustomModal from './../Core/CustomModal'
import { ButtonStyle } from '../Core/ButtonStyle'
import { Redirect } from 'react-router-dom'
import { HeaderText } from './../Core/Text'

const ContainerDiv = styled.div`
  max-width:1200px;
`

const NotDisplayButton = styled.button`
  display:none;
`

let answer = {
  firstAnswer: "",
  secondAnswer: "",
  thirdAnswer: "",
  forthAnswer: ""
};

let submitButtonRef = null;
export default class Index extends Component {
  
  handleAnswer=(event)=> {
    const val = event.target.value;
    const id = event.target.name;
    if(id === '1'){
      answer.firstAnswer = val;
    }else if(id === '2'){
      answer.secondAnswer = val;
    }else if(id === '3'){
      answer.thirdAnswer = val;
    }else{
      answer.forthAnswer = val;
    }
  };
  

  questions = [];
  
    state = {
      questions: [{
          id: 1,
          name: 'ถ้าน้องต้องเปิดบริษัทขึ้นมาหนึ่งบริษัท น้องจะทำบริษัทเกี่ยวกับอะไร จะนำไอทีมาใช้อย่างไร และจะแบ่งการทำงานของไอทีออกเป็นกี่ส่วน อะไรบ้าง',
          oldValue: ''
        },
        {
          id: 2,
          name: 'แต่งเรื่องจากคำที่พี่กำหนดให้อย่างน้อย 5 บรรทัด คำนั้นคือ “บะบะบิ, ดูดวง, พี่วิปโป้, ปังมากพี่นัท, จะแล้วมั้ย, ไม้เอก…ไม้โท…ไม้อะไร, โรตีดิบ, อิรัชชัยมาเสะ, เฉียบ, ตาลือตกบ้าน, ดูออก, ผัดกะเพรา”',
          oldValue: ''

        },
        {
          id: 3,
          name: 'จากคลิปเสียง อยากรู้ว่าพี่ ๆ พูดอะไรกัน',
          oldValue: ''

        },
        {
          id: 4,
          name: 'กาลครั้งหนึ่งนานมาแล้ว ณ จักรวาลอันยิ่งใหญ่ ได้มีการแข่งขันเกิดขึ้นระหว่างเหล่ากลุ่มดาวจักรราศี นั่นก็คือ แอรีส แคนเซอร์ ลีโอ ไพซีส สกอร์ปิโอ และเจมินาย ระหว่างการแข่งขันนั้นได้มีเหตุการณ์ไม่คาดฝันเกิดขึ้น แอรีส วิ่งผ่าน แคนเซอร์ แล้ว ลีโอ ก็วิ่งผ่าน แอรีส แต่ว่า แคนเซอร์ วิ่งช้ากว่า เจมินาย แล้ว ไพซีส ก็วิ่งนำ แคนเซอร์ แต่ว่า ลีโอ สะดุดล้มเลยวิ่งตามหลังแอรีส แล้วสกอร์ปิโอ ก็วิ่งสกัด แอรีส แล้ว ไพซีสก็หยุดพักเหนื่อยทำให้ตามหลัง เจมินาย แล้วราศีไหนมีเกณฑ์จะติดค่าย WIP CAMP #12 เพราะอะไร',
          oldValue: ''

        }
      ],
      modal:false
    }

    toggleModal = () => {
      this.setState({modal:!this.state.modal})
    }
    
    postGeneralAnswerService = async (event) =>{
      event.preventDefault();
      await UserService.postGeneralAnswerMe(answer)
        .then(() => {UserService.postStatusMe({"status":"general"})})
        .then(() => this.setState({redirect:true}))
        .catch(() => this.toggleModal())
    }

    setSubmitButtonRef = e => {
      submitButtonRef = e;
    }
  
    clickSubmit = (e) => {
      submitButtonRef.click();
    }

    componentDidCatch() {
      this.toggleModal();
    }

    resubmitAndCloseModal = () => {
      this.toggleModal()
      this.clickSubmit()
    }

    render() {
      
      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/menu'/>;
      }

      return (
        <ContainerDiv className ="container-fluid justify-content-center">
            <div className="card p-5" style={{boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,borderRadius: `4px`,backgroundColor: `rgba(255, 255, 255, 0.9)`}}>
                <HeaderText className="col-12 mb-5 mt-5">คำถามทั่วไป</HeaderText>
                <div>
                  <form onSubmit={e => this.postGeneralAnswerService(e)}>
                        {this.state.questions.map((data,i) => {
                          return <Question 
                          questionCount={i+1}  
                          questionName={data.name} 
                          questionId={data.id} 
                          handleAnswer={this.handleAnswer}
                          required
                          />
                        })}
                      <NotDisplayButton ref={this.setSubmitButtonRef}> asd</NotDisplayButton>
                  </form>
                </div>
                <div class="d-flex justify-content-between">
                  <ButtonRoute 
                    buttonLeft="กลับ"  
                    linkBack="/menu"
                    className=""
                    displayButtonRight="none"
                  />
                  <ButtonStyle className="" onClick={() => this.clickSubmit()}>
                    ยืนยัน
                  </ButtonStyle>
                </div>
            </div>
            <CustomModal 
              header="การบันทึกข้อมูลผิดพลาด" 
              paragraph="การบันทึกข้อมูลเกิดข้อผิดพลาด ไม่สามารถส่งข้อมูลได้ กรุณากดยืนยันข้อมูลใหม่อีกครั้ง" 
              secondaryButtonText="ยกเลิก" 
              primaryButtonDisplay="flex"
              primaryButtonText="ยืนยัน"
              primaryOnClick={() => {this.resubmitAndCloseModal()}}
              modal={this.state.modal} 
              toggle={this.toggleModal} 
            />
          </ContainerDiv>
        )
    }
}
