import React from 'react'
import StateContainer from './components/StateContainer/StateContainer'
import { createRoot } from 'react-dom/client'
import './index.css'
import './indexMobile.css'

const ownServerContainer = document.querySelectorAll(
  '.pricing_requirements_own-server'
)
const ownServerButton = document.querySelector(
  '.pricing_requirements_own-server-button'
)
const amazonInstanceContainer = document.querySelectorAll(
  '.pricing_requirements_amazon-instance'
)
const amazonInstanceButton = document.querySelector(
  '.pricing_requirements_amazon-instance-button'
)
const errorClose = document.querySelector('.close-icon')
const errorContainer = document.querySelector('.error-container')

// Закрыть сообщение об ошибке
errorClose.addEventListener('click', (e) => {
  errorContainer.style.display = 'none'
})

// Выбрать таблицу own server
ownServerButton.addEventListener('click', (e) => {
  amazonInstanceContainer.forEach((item) => {
    item.classList.add('pricing_requirements_hidden-table')
  })
  ownServerContainer.forEach((item) => {
    item.classList.remove('pricing_requirements_hidden-table')
  })

  amazonInstanceButton.classList.remove('pricing_requirements_current-button')
  ownServerButton.classList.add('pricing_requirements_current-button')
})

// Выбрать таблицу amazon instance
amazonInstanceButton.addEventListener('click', (e) => {
  amazonInstanceContainer.forEach((item) => {
    item.classList.remove('pricing_requirements_hidden-table')
  })
  ownServerContainer.forEach((item) => {
    item.classList.add('pricing_requirements_hidden-table')
  })

  amazonInstanceButton.classList.add('pricing_requirements_current-button')
  ownServerButton.classList.remove('pricing_requirements_current-button')
})

const rootContainer = document.querySelector('.promo_block-right')
const root = createRoot(rootContainer)

root.render(<StateContainer />)
