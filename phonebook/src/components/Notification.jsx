const Notification = ({ message }) => {
    if (!message) {
        return null;
    }
    return (
        <div className="message" style={{ backgroundColor: 'lightgreen', padding: '10px' }}>
            {message}
        </div>
    )
}

export default Notification;
