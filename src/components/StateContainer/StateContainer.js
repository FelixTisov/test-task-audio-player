import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'
import Player from '../Player/player'
import './StateContainer.css'

const StateContainer = () => {
  const [currentURL, setCurrentURL] = useState('')
  const [showPlayer, setShowPlayer] = useState(false)

  // Получить ссылку из компонента формы
  const getURL = (URL) => {
    setCurrentURL(URL)
    setShowPlayer(true)
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
