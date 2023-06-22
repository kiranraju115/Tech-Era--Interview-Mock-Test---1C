import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import EraItem from '../EraItem'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failed: 'FAILURE',
}

class TechItems extends Component {
  state = {technologyList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTechnology()
  }

  updateTechnologyList = course => {
    const newEra = course.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      logoUrl: eachItem.logo_url,
    }))
    this.setState({
      technologyList: newEra,
      apiStatus: apiStatusConstants.success,
    })
  }

  getTechnology = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      this.updateTechnologyList(data.courses)
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }

  getEra = () => {
    const {technologyList} = this.state

    return (
      <div className="tech-body-card">
        <h1 className="tech-heading">Courses</h1>
        <ul className="tech-item-card">
          {technologyList.map(eachItem => (
            <EraItem key={eachItem.id} era={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  retryApi = () => {
    this.getTechnology()
  }

  getFailure = () => (
    <div className="tech-fail-card">
      <FailureView retry={this.retryApi} />
    </div>
  )

  loadLoader = () => (
    <div data-testid="loader" className="grow-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getValues = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getEra()
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
        {this.getValues()}
      </>
    )
  }
}

export default TechItems
