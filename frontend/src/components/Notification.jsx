const Notification = ({ message, styling }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={styling}>
            {message}
        </div>
    )
}

export default Notification