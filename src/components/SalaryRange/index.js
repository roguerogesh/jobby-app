import './index.css'

const SalaryRange = props => {
  const {salary} = props
  const {label} = salary

  return (
    <li>
      <input type="radio" id={label.toLowerCase().replace(' ', '-')} />
      <label
        htmlFor={label.toLowerCase().replace(' ', '-')}
        className="label-text"
      >
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
