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
${birthDate}          10-10-1996
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
${answerOne}          Qui anim consequat enim sint fugiat esse magna minim.
${answerTwo}          Exercitation in minim qui do adipisicing laboris excepteur est.
${answerThree}        Dolore reprehenderit laboris elit do adipisicing consectetur elit aliquip. 
${answerFour}         Occaecat enim esse mollit consectetur in officia culpa quis ea fugiat voluptate.

*** Keywords ***
เปิดเว็บ 
    Open Browser     ${url}     ${browser}

กด Login 
    Click Element   //*[@id="root"]/div[2]/div/div[2]/button/a

กรอก Profile
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
    Input Text                    //*[@id="birthDate"]                                  ${birthDate}
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

กด ถัดไป หน้า Major
    Click Element   //*[@id="root"]/div[3]/button

กดเลือก Major
    Click Element   //*[@id="root"]/div[2]/label[1]/img                

กด ถัดไป หน้า Question
    Click Element     //*[@id="root"]/div[3]/a[2]

ตอบคำถาม
    Input Text                    //*[@id="root"]/div[2]/div[1]/textarea                 ${answerOne}   
    Input Text                    //*[@id="root"]/div[2]/div[2]/textarea                 ${answerTwo}   
    Input Text                    //*[@id="root"]/div[2]/div[3]/textarea                 ${answerThree}   
    # Input Text                    //*[@id="root"]/div[2]/div[4]/textarea                 ${answerFour}   

กด ถัดไป หน้า Preview
    Click Element    //*[@id="root"]/div[3]/a[2]

*** Test Cases ***
Search case 
    เปิดเว็บ
    กด Login 
    กรอก Profile
    กด ถัดไป หน้า Major
    กดเลือก Major
    กด ถัดไป หน้า Question
    ตอบคำถาม
    กด ถัดไป หน้า Preview