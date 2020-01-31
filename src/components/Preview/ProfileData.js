import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const Topic = Styled.h3`
    display: inline;

    font-family: Sarabun;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;

    align-items: flex-end;
    text-align: right;
`

const Data = Styled.p`
    font-family: Sarabun;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 21px;

    /* identical to box height */
    display: inline;
    align-items: flex-end;
`

const ProfileData = props => {
    return (
        <React.Fragment>
            <Topic className="pr-1 col-2 text-right">{props.topic} :</Topic>
            <div></div>
            <Data className="col text-left">{props.data}</Data>
        </React.Fragment>
    )
}

ProfileData.propTypes = {
    topic: PropTypes.string.isRequired,
    data: PropTypes.any
}

export default ProfileData
