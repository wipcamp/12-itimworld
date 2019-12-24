#Command  robot tests.robot
*** Settings ***
Library    Selenium2Library

*** Variables ***
${browser}            chrome
${url}                http://localhost:3000/
${firstName}          สมชาย
${lastName}           ยอดชาย
${firstNameEn}        SomChai
${lastNameEn}         YodChai
${nickName}           สมชาย
${citizenId}          6655046441962
${schoolMajor}        วิทย์ คณิต
${telNo}              0999999999
${gender}             ชาย
${school}             ส่วนบุญโญปภัมภ์ ลำพูน
${email}              SomChai@gmail.com
${gpax}               3.78
${allergicFood}       แพ้ KFC กินทีไรหมดทุกที
${congenitalDisease}  ไม่มีโรคประจำตัว 
${congenitalDrug}     แพ้ยาแก้ไอ
${district}           เมืองลำพูน
${province}           ลำพูน
${parentRelation}     พ่อ  
${parentTel}          0911111111
${telEmergency}       0888888888
${religion}           พุทธ
${bloodGroup}         O
${level}              ม.4

*** Keywords ***
เปิดเว็บ 
    Open Browser     ${url}     ${browser}

กด Login 
    Click Element   //*[@id="root"]/div[2]/div/div[2]/button/a

กรอกรายละเอียด
    Input Text                    //*[@id="firstName"]                                  ${firstName}
    Input Text                    //*[@id="lastName"]                                   ${lastName}
    Input Text                    //*[@id="firstNameEn"]                                ${firstNameEn}
    Input Text                    //*[@id="lastNameEn"]                                 ${lastNameEn}
    Input Text                    //*[@id="nickName"]                                   ${nickName}
    Input Text                    //*[@id="citizenId"]                                  ${citizenId}
    Input Text                    //*[@id="schoolMajor"]                                ${schoolMajor}
    Input Text                    //*[@id="telNo"]                                      ${telNo} 
    Select From List By Value     //*[@id="gender"]                                     ${gender}     
    Select From List By Value     //*[@id="religion"]                                   ${religion}     
    Select From List By Value     //*[@id="bloodGroup"]                                 ${bloodGroup}     
    Select From List By Value     //*[@id="level"]                                      ${level}                              
    Input Text                    //*[@id="school"]                                     ${school}   
    Input Text                    //*[@id="email"]                                      ${email}   
    Input Text                    //*[@id="gpax"]                                       ${gpax}   
    Input Text                    //*[@id="allergicFood"]                               ${allergicFood}   
    Input Text                    //*[@id="congenitalDisease"]                          ${congenitalDisease}   
    Input Text                    //*[@id="congenitalDrug"]                             ${congenitalDrug}  
    Input Text                    //*[@id="root"]/div[2]/label[1]/div/div/input         ${district}   
    Input Text                    //*[@id="root"]/div[2]/label[2]/div/div/input         ${province}   
    Input Text                    //*[@id="parentRelation"]                             ${parentRelation}   
    Input Text                    //*[@id="parentTel"]                                  ${parentTel}   
    Input Text                    //*[@id="telEmergency"]                               ${telEmergency}   

กด ถัดไป
    Click Element   //*[@id="root"]/div[3]/a[2]/button

*** Test Cases ***
Search case
    เปิดเว็บ
    กด Login 
    กรอกรายละเอียด
    กด ถัดไป