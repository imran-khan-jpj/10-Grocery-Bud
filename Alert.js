const Alert = ({type, msg}) => {
	return <p className={`alert ${type === 'error' ? 'alert-danger' : 'alert-success'} text-center`}>{msg}</p>
}

export default Alert;