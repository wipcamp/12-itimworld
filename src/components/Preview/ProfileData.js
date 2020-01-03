import React from 'react'
import PropTypes from 'prop-types'
import StyledComponent from 'styled-components'

const Topic = StyledComponent.h3`
    display: inline;
    font-weight: bold;
`

const Data = StyledComponent.p`
    display: inline;
`
const ProfileData = props => {
    return (
        <React.Fragment>
            <Topic>{props.topic}</Topic>
            <Data>{props.data}</Data>
        </React.Fragment>
    )
}

ProfileData.propTypes = {
    topic: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired 
}

export default ProfileData
