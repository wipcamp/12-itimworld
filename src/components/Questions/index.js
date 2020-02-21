import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import MajorService from './../../services/MajorService'
import AnswerService from './../../services/AnswerService'
import UserService from './../../services/UserService'
import styled from 'styled-components'
import {HeaderText} from './../Core/Text'
import {ButtonStyle} from './../Core/ButtonStyle'
import CustomModal from './../Core/CustomModal'
import {Redirect} from 'react-router-dom'
import Waiting from './../Core/Waiting'

let answer = [];
let majorId = 1;

const ContainerDiv = styled.div`
  max-width:1200px;
`

const NotDisplayButton = styled.button`
  display:none;
`

let submitButtonRef = null;
export default class Index extends Component {
  
  handleAnswer=(event)=> {
    const val = event.target.value;
    let doneEdit = false;
    
    for(var i = 0;i<answer.length;i++){
      if(answer[i].question_id === event.target.name){
        answer[i].answer_content = val;
        doneEdit = true;
      }
      
    }
    if(!doneEdit){
      answer.push({
        "question_id":event.target.name,
        "answer_content":val
      })
    }
  };
  

  questions = [];
  
    state = {
      finishLoad: false,
      errorLoad: false,
      questions: [{
          id: 1,
          name: 'Mock1'
        },
        {
          id: 2,
          name: 'Mock2'
        },
        {
          id: 3,
          name: 'Mock3'
        },
      ],
      confirmModal:false,
      alertModal:false,
      redirect:false
    }

    async componentDidMount() {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      majorId = params.get('major');
      
      await this.getQuestionService(majorId);
      console.log(submitButtonRef);
      
    }

    setSubmitButtonRef = (e) => {
      submitButtonRef = e;
    }

    clickSubmit = () => {
      submitButtonRef.click();
    }

    toggleConfirmModal = () => {
      this.setState({confirmModal: !this.state.confirmModal})
    }

    toggleAlertModal = () => {
      this.setState({alertModal: !this.state.alertModal})
    }

    openConfirmModal = e => {
      e.preventDefault();
      this.toggleConfirmModal();
    }

      getQuestionService = async (majorId) => {
        let promise;
        try {
          promise = await MajorService.getMajorFromMajorId(majorId);
          let response = promise.data;
          console.log(response.data[0].questionList);
          
          if (response.success) {
            this.setState({
              questions: response.data[0].questionList,
              finishLoad: true
            });
          } else {
            this.setState({errorLoad:true})
          }
        } catch (e) {
          this.setState({errorLoad:true})
        }
      }
    
    postAnswerService = async() =>{
      await AnswerService.postAnswerMe(majorId,{"answers":answer})
        .then(() => {UserService.postStatusMe({"status":"major"})})
        .then(() => this.setState({redirect:true}))
        .catch(() => this.toggleAlertModal());
    }

    resubmitAndCloseModal = () => {
      this.toggleAlertModal();
      this.clickSubmit();
    }
    
    render() {

      const { redirect } = this.state;

      if (redirect) {
        return <Redirect to='/menu'/>;
      }

      if(!this.state.finishLoad || this.state.errorLoad){
        return <Waiting error={this.state.errorLoad} />
      }else{
        return (
          <ContainerDiv className ="container-fluid justify-content-center">
            <div className="card p-5" style={{boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,borderRadius: `4px`,opacity:`0.9`}}>
              <form onSubmit={e=>this.openConfirmModal(e)}>
                <HeaderText classname="col-12 mb-5 mt-5">คำถามสาขา</HeaderText>
                {this.state.questions.map((data,i) => {
                  return <Question
                    questionCount={i+1}
                    questionName={data.name}
                    questionId={data.id}
                    handleAnswer={this.handleAnswer}
                    required
                  />
                  })}
                <NotDisplayButton ref={this.setSubmitButtonRef} />
              </form>
              <div class="row mt-5">
                <ButtonRoute 
                  buttonLeft="กลับ"  
                  linkBack ="/major"
                  className="col-6 d-inline-flex"
                  displayButtonRight="none"
                />
                <div className="col-6 d-inline-flex justify-content-end">
                  <ButtonStyle className="text-center" onClick={() => this.clickSubmit()}>ยืนยัน</ButtonStyle>
                </div>
              </div>
            </div>
            <CustomModal 
              modal={this.state.confirmModal}
              toggle={this.toggleConfirmModal}
              header="ยืนยันที่จะเลือกสาขา" 
              paragraph="หากกกดยืนยันการเลือกสาขาเรียบร้อยแล้วจะไม่สามารถกกลับมาแก้ไขเป็นสาขาอื่นได้กรุณาตรวจสอบให้ชัดเจนก่อนกดยืนยัน"
              dangerSubtitle="*เมื่อเลือกสาขาแล้ว ไม่สามารถย้อนกลับมา" 
              primaryButtonDisplay="flex"
              primaryOnClick={() => this.postAnswerService()}
            />
            <CustomModal 
              header="การบันทึกข้อมูลผิดพลาด" 
              paragraph="การบันทึกข้อมูลเกิดข้อผิดพลาด ไม่สามารถส่งข้อมูลได้ กรุณากดยืนยันข้อมูลใหม่อีกครั้ง" 
              secondaryButtonText="ยกเลิก" 
              primaryButtonDisplay="flex"
              primaryButtonText="ยืนยัน"
              primaryOnClick={() => {this.resubmitAndCloseModal()}}
              modal={this.state.alertModal} 
              toggle={this.toggleAlertModal} 
            />
          </ContainerDiv>
        )
      }
    }
}
