import {Link, withRouter} from 'react-router-dom'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`}>
        <img
          src={companyLogoUrl}
          alt={`${title} Logo`}
          className="company-logo"
        />
        <div className="job-details">
          <h1>{title}</h1>
          <p>Rating: {rating}</p>
          <p>Location: {location}</p>
          <p>Employment Type: {employmentType}</p>
          <p>Package Per Annum: {packagePerAnnum}</p>
          <h2>Description</h2>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default withRouter(JobItem)
