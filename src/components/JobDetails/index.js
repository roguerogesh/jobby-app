import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params

      this.setState({
        apiStatus: apiStatusConstants.inProgress,
      })

      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const fetchedData = await response.json()
        const {job_details} = fetchedData // Destructure job_details from response

        if (job_details) {
          const formattedData = {
            companyLogoUrl: job_details.company_logo_url,
            employmentType: job_details.employment_type,
            id: job_details.id,
            jobDescription: job_details.job_description,
            location: job_details.location,
            packagePerAnnum: job_details.package_per_annum,
            rating: job_details.rating,
            // Add other properties as needed
          }

          this.setState({
            jobData: formattedData,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          // If job_details is not available in the response
          throw new Error('Job details not found in response')
        }
      } else {
        // If response is not ok
        throw new Error('Failed to fetch job details')
      }
    } catch (error) {
      console.error('Error fetching job data:', error)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {jobData, apiStatus} = this.state

    return (
      <div>
        {apiStatus === apiStatusConstants.inProgress && (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {apiStatus === apiStatusConstants.success && (
          <div className="job-details-container">
            <img src={jobData.companyLogoUrl} alt="Company Logo" />
            <h2>{jobData.employmentType}</h2>
            <p>{jobData.jobDescription}</p>
            <p>{jobData.location}</p>
            <p>{jobData.packagePerAnnum}</p>
            <p>{jobData.rating}</p>
            
          </div>
        )}
        {apiStatus === apiStatusConstants.failure && (
          <div className="error-message">Failed to fetch job details</div>
        )}
      </div>
    )
  }
}

export default JobDetails
