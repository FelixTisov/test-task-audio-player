import React from 'react'
import ReactDOM from 'react-dom'
import StateContainer from './components/StateContainer/StateContainer'
import './index.css'
// import './indexMobile.css'

const ownServerCont = document.querySelector('.pricing_requirements_own-server')
const ownServerButton = document.querySelector(
  '.pricing_requirements_own-server-button'
)
const amazonInstanceCont = document.querySelector(
  '.pricing_requirements_amazon-instance'
)
const amazonInstanceButton = document.querySelector(
  '.pricing_requirements_amazon-instance-button'
)
const errorClose = document.querySelector('.close-icon')
const errorContainer = document.querySelector('.error-container')

errorClose.addEventListener('click', (e) => {
  errorContainer.style.display = 'none'
})

ownServerButton.addEventListener('click', (e) => {
  amazonInstanceCont.classList.add('pricing_requirements_hidden-table')
  ownServerCont.classList.remove('pricing_requirements_hidden-table')

  amazonInstanceButton.classList.remove('pricing_requirements_current-button')
  ownServerButton.classList.add('pricing_requirements_current-button')
})

amazonInstanceButton.addEventListener('click', (e) => {
  amazonInstanceCont.classList.remove('pricing_requirements_hidden-table')
  ownServerCont.classList.add('pricing_requirements_hidden-table')

  amazonInstanceButton.classList.add('pricing_requirements_current-button')
  ownServerButton.classList.remove('pricing_requirements_current-button')
})

// const URL = 'https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3'
// const URL = 'https://c5.radioboss.fm:18084/stream'
//const URL = 'https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals'

ReactDOM.render(
  <StateContainer />,
  document.querySelector('.promo_block-right')
)
