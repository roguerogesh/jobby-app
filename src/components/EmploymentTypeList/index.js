import React from 'react'
import './index.css'

const EmploymentTypeList = props => {
  const {typeDetails} = props
  const {label} = typeDetails

  return (
    <li>
      <input type="checkbox" id={label.toLowerCase().replace(' ', '-')} />
      <label
        htmlFor={label.toLowerCase().replace(' ', '-')}
        className="label-text"
      >
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeList
