import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'
import Player from '../Player/player'
import './StateContainer.css'

const StateContainer = () => {
  const [currentURL, setCurrentURL] = useState('')
  const [showPlayer, setShowPlayer] = useState(false)

  let errorMessage

  // Получить ссылку из компонента формы
  const getURL = async (URL) => {
    if (URL === '') {
      return
    }

    const statusCode = await checkURL(URL)

    if (statusCode === 200) {
      setCurrentURL(URL)
      setShowPlayer(true)
      hideErrorMessage()
      return
    } else if (statusCode === 404) {
      errorMessage = 'Audio not found'
    } else {
      errorMessage = 'An error occured'
    }
    showErrorMessage(errorMessage)
    setShowPlayer(false)
    setCurrentURL('')
  }

  const errorContainer = document.querySelector('.error-container')
  const messageContainer = document.querySelector('.error-message')

  function showErrorMessage(errorMessage) {
    errorContainer.style.display = 'flex'
    messageContainer.textContent = errorMessage
  }

  function hideErrorMessage() {
    errorContainer.style.display = 'none'
  }

  // Проверить доступность аудио
  async function checkURL(URL) {
    const response = await fetch(URL)
    return response.status
  }

  // Отобразить форму ввода ссылки
  const showInput = (value) => {
    setShowPlayer(!value)
  }

  return (
    <div className="state-container">
      {showPlayer ? (
        <Player URL={currentURL} showInput={showInput} />
      ) : (
        <InputForm getURL={getURL} />
      )}
    </div>
  )
}

export default StateContainer
