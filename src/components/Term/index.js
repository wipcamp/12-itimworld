import React, { Component } from 'react'

import UserService from '../../services/UserService'

import ButtonRoute from '../Core/ButtonRoute'

export default class index extends Component {
  state = {
    buttonRightDisabled: true,
    checkbox: true
  }

  putStateUserService = async () => {
    return await UserService.postStatusMe({ "status": "accept" })
  }

  onClick = (e) => {
    this.setState({
        buttonRightDisabled: !e.target.checked,
      });
  }

  getInitialState = () => {
    this.setState( {
      buttonRightDisabled: true
    });
  }

  handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - 10 <= e.target.clientHeight;
    if (bottom) { 
      this.setState( {
        checkbox: false
      });
    } else{
      this.setState( {
        checkbox: true
      });
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="card p-3" style={{opacity:'0.9',minHeight:'70vh'}}>
          <div className="card-body pb-0">
            <h4 className="card-title">ข้อกำหนดและเงื่อนไขในการสมัครเข้าร่วมโครงการ ค่ายเส้นทางสู่ฝันนักไอที ครั้งที่ 12</h4>
            <div className="font-weight-bold">คุณสมบัติของผู้สมัคร</div> 
            <div style={{textIndent:'20px'}}>1. ผู้เข้าสมัครต้องเป็นนักเรียนที่กำลังจะขึ้นระดับชั้นมัธยมศึกษาปีที่ 4, 5, 6 หรือกำลังจะเข้าศึกษาต่อในระดับอุดมศึกษา</div>
            <div style={{textIndent:'20px'}}>2. ผู้เข้าสมัครจะต้องได้รับความยินยอมจากผู้ปกครองให้สามารถเข้าร่วมโครงการ และค้างคืนได้ตลอดระยะเวลา 5 วัน 4 คืน ระหว่างวันที่  27 พฤษภาคม – 31 พฤษภาคม 2563 โดยมีเอกสารเป็นลายลักษณ์อักษรที่ถูกต้อง</div>
            <div style={{textIndent:'20px'}}>3. ผู้เข้าสมัครจะต้องไม่เป็นโรคที่อาจส่งผลกระทบต่อการดำเนินกิจกรรมของโครงการโดยรวม หรือเกินความสามารถของฝ่ายพยาบาลของโครงการในการดูแล ถ้าหากพบในภายหลัง ทางโครงการขอพิจารณาตัดสิทธิ์ในการเข้าร่วมโครงการของผู้เข้าสมัคร</div>
            
            <div className="font-weight-bold mt-3">เงื่อนไขการสมัคร</div>
            <div style={{textIndent:'20px'}}>1. ผู้เข้าสมัครต้องกรอกข้อมูลทั้งหมดให้ครบถ้วนตามความเป็นจริง หากคณะกรรมการ ตรวจสอบแล้วพบว่าผู้เข้าสมัครกรอกข้อมูลไม่ครบถ้วนหรือให้ข้อมูลที่เป็นเท็จ ทางคณะกรรมการจะทำการตัดสิทธิ์ในการเข้าร่วมโครงการทันที</div>
            <div style={{textIndent:'20px'}}>2. ผู้เข้าสมัครจะต้องอัปโหลดใบรับรองผลการศึกษา (ปพ. 7) เพื่อรับรองสถานภาพการเป็นนักเรียนของผู้เข้าสมัคร</div>
            <div style={{textIndent:'20px'}}>3. ผู้เข้าสมัครสามารถทำการส่งใบสมัครได้ตั้งแต่วันที่ 21 กุมภาพันธ์ - 17 มีนาคม 2563 มิฉะนั้นจะถือว่าทำการสละสิทธิ์การเข้าร่วมโครงการ ค่ายเส้นทางสู่ฝันนักไอที ครั้งที่ 12</div>
            <div style={{textIndent:'20px'}}>4. การตัดสินการคัดเลือกการเข้าร่วมโครงการของคณะกรรมการถือเป็นที่สิ้นสุด</div>
            <div style={{textIndent:'20px'}}>5. ในกรณีที่ผู้สมัครได้รับการคัดเลือก จะต้องทำการยืนยันสิทธิ์ภายในวันที่ 29 มีนาคม – 4 เมษายน 2563 โดยดำเนินการยืนยันหลักฐาน ดังนี้</div>
            <div style={{textIndent:'30px'}}>5.1 อัปโหลดใบคํายินยอมของผู้ปกครองในการอนุญาตให้ผู้สมัครเข้าร่วมโครงการ (สำหรับผู้ที่ได้รับการคัดเลือกเท่านั้น)</div>
            <div style={{textIndent:'30px'}}>5.2 อัปโหลดหลักฐานการชำระเงินเพื่อเข้าร่วมโครงการ เป็นจำนวน 480 บาท (สำหรับผู้ที่ได้รับการคัดเลือกเท่านั้น)</div>

            <div className="form-check mt-4"style={{fontSize:'0.9em'}}>
              <input type="checkbox" className="form-check-input" id="checkbox-1" onClick={this.onClick} value={!this.state.location}/>
              <label className="form-check-label pl-1" for="checkbox-1"> ข้าพเจ้าได้รับทราบข้อกำหนดและเงื่อนไขในการสมัครเข้าร่วมโครงการ</label>
            </div>
            <div className="row text-right">
              <ButtonRoute 
                className= 'col-12 mt-3 mb-2'
                displayButtonLeft= "none"
                buttonRight="ยอมรับ"
                linkNext="/agreement"
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
