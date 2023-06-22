import './index.css'

const FailureView = props => {
  const {retry} = props
  return (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={retry} className="retry-button">
        Retry
      </button>
    </>
  )
}

export default FailureView
