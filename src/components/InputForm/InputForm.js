import React, { useState } from 'react'
import './InputForm.css'

const arrow = require('../../icons/arrow.svg')

const InputForm = ({ getURL }) => {
  const [inputValue, setInputValue] = useState('')

  const updateInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getURL(inputValue)
  }

  return (
    <div className="input-form-container">
      <div className="input-form-container_form-title">
        <h2>Insert the link</h2>
      </div>
      <form onSubmit={handleSubmit} class="input-form-container_link-form">
        <input
          name="URL"
          type="text"
          class="input-form-container_link-form_input"
          placeholder="https://"
          onChange={updateInput}
        />
        <button type="submit" class="input-form-container_link-form_button">
          <img
            class="input-form-container_link-form_icon"
            src={arrow}
            alt="submit"
          />
        </button>
      </form>
    </div>
  )
}

export default InputForm
