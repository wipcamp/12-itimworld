import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import UserService from './../../services/UserService'
import styled from 'styled-components'
import CustomModal from './../Core/CustomModal'
import { ButtonStyle } from '../Core/ButtonStyle'

const Header = styled.h2`
  font-size: 36px;
  line-height: 47px;
  text-align: center;
`

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

let userId = 120001;

let submitButtonRef = null;
export default class Index extends Component {
  
  handleAnswer=(event)=> {
    const val = event.target.value;
    const id = event.target.name;
    if(id == 1){
      answer.firstAnswer = val;
    }else if(id == 2){
      answer.secondAnswer = val;
    }else if(id == 3){
      answer.thirdAnswer = val;
    }else{
      answer.forthAnswer = val;
    }
    console.log(answer);
    
  };
  

  questions = [];
  
    state = {
      questions: [{
          id: 1,
          name: 'This is general question 1',
          oldValue: ''
        },
        {
          id: 2,
          name: 'This is general question 2',
          oldValue: ''

        },
        {
          id: 3,
          name: 'This is general question 3',
          oldValue: ''

        },
        {
          id: 4,
          name: 'This is general question 4',
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
      await UserService.postGeneralAnswer(userId,answer)
        .then(() => {UserService.postStatus(userId,{"status":"general"})})
        .catch(() => this.toggleModal())
    }

    setSubmitButtonRef = e => {
      submitButtonRef = e;
    }
  
    clickSubmit = (e) => {
      submitButtonRef.click();
    }

    render() {
      return (
        <ContainerDiv className ="container-fluid justify-content-center">
            <div className="card p-5" style={{boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,borderRadius: `4px`,opacity:`0.9`}}>
                <Header className="col-12 mb-5 mt-5">This is General Question page</Header>
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
              <CustomModal header="เกิดข้อผิดพลาดขึ้น" paragraph="โปรดติดต่อเจ้าหน้าที่" secondaryButtonText="ปิด" modal={this.state.modal} toggle={this.toggleModal} />
            </div>
          </ContainerDiv>
        )
    }
}
