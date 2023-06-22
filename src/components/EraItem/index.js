import {Link} from 'react-router-dom'

import './index.css'

const EraItem = props => {
  const {era} = props
  const {id, name, logoUrl} = era

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="era-item">
        <img src={logoUrl} alt={name} className="era-image" />
        <p className="era-name">{name}</p>
      </li>
    </Link>
  )
}

export default EraItem
