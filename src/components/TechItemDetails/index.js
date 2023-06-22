import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILURE',
}

class TechItemDetails extends Component {
  state = {techDetailObject: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getDetailObject()
  }

  getDetails = details => {
    const newDetails = {
      id: details.id,
      name: details.name,
      imageUrl: details.image_url,
      description: details.description,
    }
    this.setState({
      techDetailObject: newDetails,
      apiStatus: apiStatusConstants.success,
    })
  }

  getDetailObject = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      this.getDetails(data.course_details)
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }

  retryDetails = () => {
    this.getDetailObject()
  }

  getTechDetails = () => {
    const {techDetailObject} = this.state
    const {name, imageUrl, description} = techDetailObject

    return (
      <div className="tech-card">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="details-card">
          <h1 className="course-name">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

  getFailure = () => (
    <div className="failed-card">
      <FailureView retry={this.retryDetails} />
    </div>
  )

  loadLoader = () => (
    <div data-testid="loader" className="expand-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getTechDetails()
      case apiStatusConstants.failed:
        return this.getFailure()
      case apiStatusConstants.progress:
        return this.loadLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.getItemDetails()}
      </>
    )
  }
}

export default TechItemDetails
