import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
    /*
    let notification = useSelector(({ notification }) => {
        return notification = notification.message
    })*/
    let notification = props.notification.message

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            {notification}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification