import { useSelector } from "react-redux"

const Notification = () => {
    let notification = useSelector(({ notification }) => notification)

    if (Object.keys(notification).length === 0) {
        return <></>
    }

    const style = {
        color: notification.type === "alert" ? "red" : "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div id="notification" style={style}>
            {notification.message}
        </div>
    )
}

export default Notification
