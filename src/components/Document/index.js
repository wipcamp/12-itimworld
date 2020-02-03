import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import styled from 'styled-components'
import {Subtitle,Small} from '../Core/Text'
import {ButtonStyle} from '../Core/ButtonStyle'
import fonts from '../../config/fonts'

const UploadButton = styled.button`
width: 175px;
height: 33px;
background: #304151;
border-radius: 4px;
`

const TableStyle = styled(Table)`
    & .test{
        vertical-align:0%!important;
    }
`

const ContainerBox = styled.div`
height:70vh;
`

const ButttonText = styled.div`
color: white;
`
const SmallConText = styled(Small)`
height: 100%;
`

const TableRowAlignMiddle = styled.td`
vertical-align:middle!important;
`

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
`

export default class index extends Component {

    render() {
        return (
            <ContainerBox className="container bg-white">
                 <TableStyle className="center">
                     <thead>
                        <tr>
                            <th></th>
                            <th><Subtitle>เอกสารที่ต้องอัพโหลด</Subtitle></th>
                            <th className="text-right"><Subtitle>ภายในวันที่</Subtitle></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <Subtitle>ปพ.5</Subtitle>
                                <SmallConText>Lorem ipsum <br /> asapkok</SmallConText>
                            </td>
                            <td></td>
                            <TableRowAlignMiddle className="align-content-center">
                                <UploadButton className="float-right text-center">
                                    <ButttonText>
                                        อัพโหลด
                                    </ButttonText>
                                </UploadButton>
                            </TableRowAlignMiddle>
                        </tr>
                        <tr>
                            <td colSpan="4"></td>
                        </tr>
                    </tbody>
                </TableStyle>
            </ContainerBox>
        )
    }
}
