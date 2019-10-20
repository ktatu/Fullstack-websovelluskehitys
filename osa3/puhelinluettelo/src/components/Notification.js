import React from 'react'

/*
.error {
  color: red;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
*/
const notificationStyle = { 
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        margin: 20
}

const errorStyle = { 
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 20
}

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    if (message.includes('Error:')) {
        return (
            <div style={errorStyle}>{message}</div>
        )
    }
    else {
        return (
            <div style={notificationStyle}>{message}</div>
        )
    }
}

export default Notification