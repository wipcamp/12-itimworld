import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'
import MajorService from './../../services/MajorService'
import AnswerService from './../../services/AnswerService'
import UserService from './../../services/UserService'
import styled from 'styled-components'
import { HeaderText } from './../Core/Text'
import { ButtonStyle } from './../Core/ButtonStyle'
import CustomModal from './../Core/CustomModal'
import { Redirect } from 'react-router-dom'
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
    confirmModal: false,
    alertModal: false,
    redirect: false,
    majorId: null,
    linkBack: '/major',
    success: false,
    newAnswer: null
  }

  async componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    if (params.get('major') !== null) {
      majorId = params.get('major');
      await this.getQuestionService(majorId);
    } else {
      await this.getUser().then(() => this.getQuestionService(this.state.majorId)).then(() => answer = this.state.newAnswer)
      this.setState({
        linkBack: '/menu',
        success: true
      })
    }
    // console.log
    // console.log(submitButtonRef);
  }

  handleAnswer = (event, index) => {
    const val = event.target.value;
    let doneEdit = false;
    if (this.state.success) {
      let newAnswer = [...this.state.newAnswer];
      let ans = { ...newAnswer };
      ans[index] = val;
      newAnswer[index] = ans[index];
      this.setState({ newAnswer });
      for (var j = 0; j < answer.length; j++) {
        if (answer[j].question_id === event.target.name) {
          answer[j].answer_content = newAnswer[j];
          doneEdit = true;
        }
      }

    }else{
      for (var i = 0; i < answer.length; i++) {
        if (answer[i].question_id === event.target.name) {
          answer[i].answer_content = val;
          doneEdit = true;
        }
      }
    }

   

    if (!doneEdit) {
      answer.push({
        "question_id": event.target.name,
        "answer_content": val
      })
    }
  };

  getUser = async () => {
    await UserService.getMe()
      .then((promise) => {
        const response = promise.data;
        if (response.success) {
          const answerList = response.data[0].answerList;
          this.setState({
            majorId: response.data[0].major.id,
            newAnswer: [
              {
                "question_id": answerList[0].question.id.toString(),
                "answer_content":answerList[0].answerContent
              },
              {
                "question_id": answerList[1].question.id.toString(),
                "answer_content":answerList[1].answerContent
              }
            ]
          })
        } else {
          this.setState({ errorLoad: true })
        }
      })
      .catch(() => {
        this.setState({ errorLoad: true })
      })
  }

  setSubmitButtonRef = (e) => {
    submitButtonRef = e;
  }

  clickSubmit = () => {
    if(this.state.success){
      window.location.href="/menu"
      submitButtonRef.click();
      this.setState({ confirmModal: false })
      this.postAnswerService()
    }else{
      submitButtonRef.click();
    }
  }

  toggleConfirmModal = () => {
    this.setState({ confirmModal: !this.state.confirmModal })
  }

  toggleAlertModal = () => {
    this.setState({ alertModal: !this.state.alertModal })
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
      // console.log(response.data[0].questionList);

      if (response.success) {
        this.setState({
          questions: response.data[0].questionList,
          finishLoad: true
        });
      } else {
        this.setState({ errorLoad: true })
      }
    } catch (e) {
      this.setState({ errorLoad: true })
    }
  }

  postAnswerService = async () => {
    if(this.state.success){
      majorId = this.state.majorId
    }

    await AnswerService.postAnswerMe(majorId, { "answers": answer })
      .then(() => { UserService.postStatusMe({ "status": "major" }) })
      .then(() => this.setState({ redirect: true }))
      .catch(() => this.toggleAlertModal());
  }

  resubmitAndCloseModal = () => {
    this.toggleAlertModal();
    this.clickSubmit();
  }

  render() {

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to='/menu' />;
    }

    if (!this.state.finishLoad || this.state.errorLoad) {
      return <Waiting error={this.state.errorLoad} />
    } else {
      return (
        <ContainerDiv className="container-fluid justify-content-center" style={{ paddingBottom: '30px' }}>
          <div className="card p-5" style={{ boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`, borderRadius: `4px`, backgroundColor: `rgba(255, 255, 255, 0.9)` }}>
            <form onSubmit={e => this.openConfirmModal(e)}>
              <HeaderText classname="col-12 mb-5 mt-5">คำถามสาขา</HeaderText>
              {this.state.questions.map((data, i) => (
                this.state.success ? (
                  <Question
                    questionCount={i + 1}
                    questionName={data.name}
                    questionId={data.id}
                    handleAnswer={(e) => this.handleAnswer(e, i)}
                    value={this.state.newAnswer[i].answer_content}
                    required
                  />
                ) : (
                    <Question
                      questionCount={i + 1}
                      questionName={data.name}
                      questionId={data.id}
                      handleAnswer={this.handleAnswer}
                      required
                    />
                  )
              ))}
              <NotDisplayButton ref={this.setSubmitButtonRef} />
            </form>
            <div class="row mt-5 mb-auto">
              <ButtonRoute
                buttonLeft="กลับ"
                linkBack={this.state.linkBack}
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
            paragraph="หากกดยืนยันการเลือกสาขาเรียบร้อยแล้วจะไม่สามารถกลับมาแก้ไขเป็นสาขาอื่น และไม่สามารถแก้ไขคำตอบได้กรุณาตรวจสอบให้ชัดเจนก่อนกดยืนยัน"
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
            primaryOnClick={() => { this.resubmitAndCloseModal() }}
            modal={this.state.alertModal}
            toggle={this.toggleAlertModal}
          />
        </ContainerDiv>
      )
    }
  }
}
