import React from 'react'
import ReactDOM from 'react-dom'
import Player from './components/Player/player'
import './index.css'
// import './indexMobile.css'

const playerContainer = document.querySelector('.player-wrapper')
const formContainer = document.querySelector('.promo_block-right')
const form = document.querySelector('.promo_link-form')
const input = document.querySelector('.promo_link-form_input')
const ownServerCont = document.querySelector('.pricing_requirements_own-server')
const ownServerButton = document.querySelector('.pricing_requirements_own-server-button')
const amazonInstanceCont = document.querySelector('.pricing_requirements_amazon-instance')
const amazonInstanceButton = document.querySelector('.pricing_requirements_amazon-instance-button')

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

// Открыть плеер
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const URL = input.value
    // const URL = 'https://s.lalal.ai/music/home/Lets_Call_it_by_LawrenceTrailer_cut.mp3'
    // const URL = 'https://c5.radioboss.fm:18084/stream'
    //const URL = 'https://lalalai.s3.us-west-2.amazonaws.com/media/split/a7564eb8-cbf2-40e2-9cb8-6061d8d055a7/no_vocals'

    formContainer.style.display = 'none'
    playerContainer.style.display = 'flex'

    ReactDOM.render(<Player URL={URL} />, document.querySelector('.player-wrapper'))
})
