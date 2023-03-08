import React from 'react'
import StateContainer from './components/StateContainer/StateContainer'
import { createRoot } from 'react-dom/client'
import './index.css'
import './indexMobile.css'

const ownServerCont = document.querySelectorAll(
  '.pricing_requirements_own-server'
)
const ownServerButton = document.querySelector(
  '.pricing_requirements_own-server-button'
)
const amazonInstanceCont = document.querySelectorAll(
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
  amazonInstanceCont.forEach((item) => {
    item.classList.add('pricing_requirements_hidden-table')
  })
  ownServerCont.forEach((item) => {
    item.classList.remove('pricing_requirements_hidden-table')
  })

  amazonInstanceButton.classList.remove('pricing_requirements_current-button')
  ownServerButton.classList.add('pricing_requirements_current-button')
})

// Выбрать таблицу amazon instance
amazonInstanceButton.addEventListener('click', (e) => {
  amazonInstanceCont.forEach((item) => {
    item.classList.remove('pricing_requirements_hidden-table')
  })
  ownServerCont.forEach((item) => {
    item.classList.add('pricing_requirements_hidden-table')
  })

  amazonInstanceButton.classList.add('pricing_requirements_current-button')
  ownServerButton.classList.remove('pricing_requirements_current-button')
})

const rootContainer = document.querySelector('.promo_block-right')
const root = createRoot(rootContainer)

root.render(<StateContainer />)

// const URL = 'https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3'
// const URL = 'https://c5.radioboss.fm:18084/stream'
// const URL = 'https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals'
