import React, { Component } from 'react'
import { Element } from 'react-scroll'

import UserService from '../../services/UserService'

import ButtonRoute from '../Core/ButtonRoute'


export default class index extends Component {
  state = {
    buttonRightDisabled: true,
    checkbox: true
  }

  putStateUserService = async () => {
    return await UserService.postStatusMe({ "status": "acceptData" })
  }

  onClick = (e) => {
    this.setState({
        buttonRightDisabled: !e.target.checked
    })
  }

  getInitialState = () => {
    this.setState( {
      buttonRightDisabled: true
    })
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - 10 <= e.target.clientHeight
    if (bottom) { 
      this.setState( {
        checkbox: false
      })
    } else{
      this.setState( {
        checkbox: true
      })
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="card p-3" style={{opacity:'0.9',minHeight:'70vh'}}>
          <div className="card-body pb-0">
            <h4 className="card-title">คำยินยอมการใช้ข้อมูลส่วนบุคคล</h4>
            <div className="card text-white bg-secondary p-4 mt-4">
              <div className="element" id="containerElement">
                <Element name="box" onScroll={this.handleScroll} style={{position: 'relative', height: '40vh',overflow: 'scroll',fontSize:'0.9em'}}>
                  <div className="font-weight-bold">นโยบายข้อมูลส่วนบุคคล</div> 
                  <div className="font-weight-bold mt-3">1. ข้อมูลสำคัญเกี่ยวกับโครงการ</div>
                  <div style={{textIndent:'20px'}}>ค่ายเส้นทางสู่ฝันนักไอที ครั้งที่ 12 (ซึ่งต่อไปนี้จะเรียกว่า "โครงการ") เป็นผู้จัดการดำเนินการเว็บไซต์ wip.camp และเว็บไซต์อื่นที่เกี่ยวข้อง (ซึ่งต่อไปนี้จะเรียกว่า "เว็บไซต์") นโยบายความเป็นส่วนตัวนี้ เพื่อกำหนดความมุ่งมั่นของโครงการต่อความเป็นส่วนตัวของผู้ใช้ของท่าน (ซึ่งต่อไปนี้จะเรียกว่า "ผู้ใช้" หรือ "คุณ") และวิธีที่โครงการเก็บและใช้ข้อมูลส่วนตัวของคุณ</div> 
                  <div style={{textIndent:'20px'}}>กรุณาอ่านนโยบายความเป็นส่วนตัวนี้โดยละเอียด การเข้าใช้งานเว็บไซต์ของโครงการโดยใช้บริการของโครงการ และยอมรับนโยบายที่เกี่ยวข้องนี้อย่างชัดเจน คุณรับทราบว่า คุณได้อ่านและยอมรับข้อกำหนดนโยบายข้อมูลส่วนบุคคลนี้แล้ว หากผู้ใช้ไม่ยอมรับนโยบายข้อมูลส่วนบุคคล ผู้ใช้จะไม่สามารถทำการสมัครผ่านเว็บไซต์ของโครงการได้</div>
                  <div className="font-weight-bold mt-3">2. ข้อมูลที่โครงการเก็บรวบรวมเกี่ยวกับผู้ใช้</div>
                  <div style={{textIndent:'20px'}}>ข้อมูลส่วนบุคคลหรือข้อความส่วนบุคคล หมายถึง ข้อมูลเกี่ยวกับบุคคลที่สามารถระบุบุคคลนั้น อาจทำการรวบรวม ใช้ เก็บ และถ่ายโอนข้อมูลส่วนบุคคลประเภทต่าง ๆ ที่เกี่ยวกับผู้ใช้ตามที่ค่ายได้จัดกลุ่มไว้ด้วยกันดังต่อไปนี้</div>
                  <div style={{textIndent:'30px'}}>• ข้อมูลส่วนตัว ได้แก่ ชื่อ นามสกุล ชื่อเล่น เพศ วันเกิด เลขบัตรประชาชน อีเมล หมายเลขโทรศัพท์ของคุณ หมายเลขโทรศัพท์ผู้ปกครองในกรณีฉุกเฉิน ซึ่งผู้ใช้ได้ยินยอมให้เปิดเผย และรายละเอียดในการติดต่อ </div> 
                  <div style={{textIndent:'30px'}}>• ข้อมูลการศึกษา ได้แก่ ระดับชั้น แผนการเรียน ชื่อโรงเรียน เกรดเฉลี่ยสะสม </div>
                  <div style={{textIndent:'30px'}}>• ข้อมูลอื่น ๆ ได้แก่ ความสามารถพิเศษและผลงาน ช่องทางที่รู้จักโครงการ ใบรับรองผลการศึกษา (ปพ. 7) ขนาดไซส์เสื้อ</div>
                  <div style={{textIndent:'30px'}}>• ข้อมูลการใช้งานเว็บไซต์ ได้แก่ เครื่องมือที่ใช้เข้าถึงเว็บไซต์ ลักษณะการใช้งานบนเว็บไซต์ โดยไม่ระบุตัวตน</div>
                  <div className="font-weight-bold mt-3">3. การจัดเก็บข้อมูลส่วนบุคคลของผู้ใช้</div>
                  <div style={{textIndent:'20px'}}>โครงการอาจรวบรวมข้อมูลเกี่ยวกับผู้ใช้ได้หลายวิธี ได้แก่</div>
                  <div style={{textIndent:'30px'}}><b>• ปฏิสัมพันธ์โดยตรง</b> โครงการจะเก็บรวบรวมข้อมูลส่วนบุคคลของผู้ใช้ ตัวอย่างเช่น คุณอาจให้ข้อมูลส่วนตัว ข้อมูลการศึกษา โดยการกรอกแบบฟอร์มบนเว็บไซต์รับสมัครของโครงการ เพื่อทำการสมัครเข้าร่วมโครงการ</div>
                  <div style={{textIndent:'30px'}}><b>• เทคโนโลยีอัตโนมัติหรือปฏิสัมพันธ์</b> ในขณะที่คุณโต้ตอบกับเว็บไซต์ของโครงการ ระบบเทคโนโลยีอัตโนมัติที่โครงการใช้งานบนเว็บไซต์อาจรวบรวมข้อมูลทางเทคนิค เช่น ข้อมูลเกี่ยวกับเบราเซอร์ของคุณโดยอัตโนมัติ ว่าคุณเข้าเยี่ยมชมพื้นที่ใดในเว็บไซต์ของโครงการและลิงก์ที่คุณคลิกดูการกระทำและรูปแบบการเรียกดู ช่วยให้โครงการสามารถให้ประสบการณ์ที่ดีแก่คุณเมื่อคุณเข้าชมเว็บไซต์ของโครงการ และยังช่วยให้โครงการสามารถปรับปรุงพัฒนาเว็บไซต์ให้ดีขึ้น</div>
                  <div style={{textIndent:'30px'}}><b>• บุคคลที่สามหรือแหล่งข้อมูลสาธารณะ</b> โครงการจะเก็บข้อมูลของผู้ใช้ผ่านการเข้าสู่ระบบโดยใช้สื่อสังคม ทำให้โครงการอาจจะเก็บรวบรวมข้อมูลการติดต่อ อัตลักษณ์ และข้อมูลทางเทคนิค รวมไปถึง ชื่อผู้ใช้งาน/ชื่อผู้ใช้ รูปประจำตัวผู้ใช้งาน ที่อยู่อีเมล และวันเดือนปีเกิดของคุณ ข้อมูลเกี่ยวกับสื่อสังคมออนไลน์ที่คุณยินยอมเปิดเผยกับโครงการจะไปรวมกับข้อมูลอื่น ๆ  ที่ผู้ใช้ให้กับโครงการไว้ หรือที่โครงการรวบรวมเกี่ยวกับคุณ</div>
                  <div className="font-weight-bold mt-3">4. วัตถุประสงค์ของการใช้ข้อมูลส่วนบุคคล</div>
                  <div style={{textIndent:'20px'}}>โครงการมีวัตถุประสงค์ในการใช้ข้อมูล ดังต่อไปนี้</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลส่วนบุคคลเพื่อยืนยันคุณสมบัติและคัดเลือกผู้เข้าร่วมโครงการ</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลส่วนบุคคลเพื่อจัดกลุ่มผู้จะเข้าร่วมโครงการ</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลส่วนบุคคลเพื่อจัดกิจกรรมในโครงการ</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลส่วนบุคคลเพื่อจัดสรรอาหารให้เหมาะสมกับผู้ร่วมกิจกรรมในโครงการ</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลส่วนบุคคลเพื่อจัดส่งใบประกาศนียบัตรสำหรับผู้ที่เข้าร่วมโครงการ</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลส่วนบุคคลเพื่อให้สามารถติดต่อผู้ปกครองได้ในกรณีฉุกเฉิน</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลแบบไม่ระบุตัวตน และข้อมูลเทคโนโลยีอัตโนมัติเพื่อใช้ในการวิเคราะห์ข้อมูลทางสถิติ</div>
                  <div style={{textIndent:'30px'}}>• โครงการใช้ข้อมูลส่วนบุคคลเพื่อดูแลความปลอดภัยในระหว่างโครงการ</div>
                  <div className="font-weight-bold mt-3">5. ระยะเวลาในการเก็บข้อมูลส่วนบุคคล</div>
                  <div style={{textIndent:'20px'}}>โครงการจะเก็บข้อมูลส่วนบุคคลของคุณเท่าที่จำเป็นในการจัดโครงการครั้งปัจจุบัน และสำหรับโครงการครั้งต่อไป แต่ไม่เกิน 4 ปี</div>
                  <div className="font-weight-bold mt-3">6. สิทธิของคุณเกี่ยวกับข้อมูลส่วนบุคคล</div>
                  <div style={{textIndent:'20px'}}>คุณสามารถใช้สิทธิที่คุณมีอยู่ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล ยังรวมถึงการเข้าถึง การแก้ไข การลบ ระงับการประมวลผลข้อมูล ขอให้โครงการส่งสำเนาข้อมูลส่วนบุคคลของคุณ ขอให้องค์กรคัดค้านการประมวลผลข้อมูล หรือถอนความยินยอมโครงการได้ทำการแต่งตั้งเจ้าหน้าทีุ่ค้มครองข้อมูลส่วนบุคคล เพื่อกำกับดูแลคุ้มครองข้อมูลส่วนบุคคลของค่าย และคุณสามารถติดต่อผู้ดูแลข้อมูลของโครงการ ได้ที่อีเมล wippo@wipcamp.com</div>
                </Element>
              </div>
            </div>
            <div className="form-check mt-2"style={{fontSize:'0.9em'}}>
              <input type="checkbox" disabled={this.state.checkbox} className="form-check-input" id="checkbox-1" onClick={this.onClick} value={!this.state.location}/>
              <label className="form-check-label pl-1" for="checkbox-1"> ข้าพเจ้าได้รับทราบนโยบายข้อมูลส่วนบุคคลแล้ว</label>
            </div>
            <div className="row">
              <ButtonRoute 
                className= 'd-flex col-12 mt-3 mb-2'
                buttonLeft="ไม่ยอมรับ"
                linkBack ="/menu"
                buttonRight="ยอมรับ"
                linkNext="/menu"
                buttonLeftStyle="white"
                buttonRightDisabled={this.state.buttonRightDisabled}
                onClick={() => this.putStateUserService()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
