import React from 'react'
import PropTypes from 'prop-types';

export default function AppForm(props) {
  const { className, ...otherProps } = props
  return (
    <form
      className={['App-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}
AppForm.defaultProps = {
  item: "",
  list: "",
  className: ""
}
AppForm.propTypes = {
  item: PropTypes.string.isRequired,
  list: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
}