import React, { useEffect, useRef, useState } from 'react'
import getPeaksArray from '../../PeaksGenerator'
import './player.css'

const Player = ({URL}) => {
    
    const play = require('../../icons/play.svg')
    const pause = require('../../icons/pause.svg')

    const [playing, setPlaying] = useState(false)
    const [timer, setTimer] = useState('00:00')
    const [loaded, setLoaded] = useState(false)
    const [icon, setIcon] = useState(play)

    const volumeRange = useRef()
    const audio = useRef()
    const canvas = useRef()

    useEffect(() => {   
        
        if(!loaded) {

            processLink(URL)
            setLoaded(true)

            audio.current.onloadedmetadata = () => {
                volumeRange.current.style.setProperty('--volume-offset', 50 / volumeRange.current.max * 100 + '%')
                audio.current.volume = volumeRange.current.value / 100
            } 
        }
    })

    // Обработка ссылки
    async function processLink (URL) {
        const audioBuffer = await getPeaksArray(URL)
        localStorage.setItem('audioBuffer', JSON.stringify(audioBuffer))
        drawWaveForm()
    }

    // Генерация аудиодорожки
    function drawWaveForm () {

        const audioBuffer = JSON.parse(localStorage.getItem('audioBuffer'))
        const ctx = canvas.current.getContext("2d")
        const dpr = window.devicePixelRatio || 1

        canvas.current.width = canvas.current.offsetWidth * dpr
        canvas.current.height = canvas.current.offsetHeight * dpr
        
        ctx.scale(dpr, dpr)
        ctx.translate(0, canvas.current.offsetHeight / 2)
        
        const width = canvas.current.offsetWidth / audioBuffer.length

        for (let i = 0; i < audioBuffer.length; i++) {
            drawSample(ctx, i, width, '#fff')
        }
    }

    function redrawWaveForm(n, width, dataArray) {

        const ctx = canvas.current.getContext("2d")
        ctx.clearRect(0, -32, 608, 64) // Сначала очистить всю дорожку

        for (let i = 0; i < n; i++) {
            drawSample(ctx, i, width, '#C6A827')
        }

        for (let i = dataArray.length; i >= n; i--) {
            drawSample(ctx, i, width, '#fff')
        }
    }

    // Форматирование текущего времени под mm:ss
    function formatTime(seconds) {
        
        let h = Math.floor(seconds / 3600)
        let m = Math.floor((seconds - (h * 3600)) / 60)
        let s = Math.floor(seconds - (h * 3600) - (m * 60))

        h = (h < 10) ? '0' + h : h
        m = (m < 10) ? '0' + m : m
        s = (s < 10) ? '0' + s : s

        return [m, s]
    }

    // Событие изменения таймера
    function timerUpdateEvent() {

        const seconds = audio.current.currentTime
        const [m, s] = formatTime(seconds)

        setTimer(`${m}:${s}`)

        const dataArray = JSON.parse(localStorage.getItem('audioBuffer'))
        const sps = 2.3323 // Скорость отрисовки сэмплов в секунду, зависит от общего количества сэмплов
        const k = dataArray.length / sps / audio.current.duration // Коэффициент для синхронизации визуализации и аудиопотока
        const n = Math.round(seconds * k * dataArray.length / 100) // Текущее количество желтых сэмплов

        const width = canvas.current.offsetWidth / dataArray.length

        if (n < dataArray.length) {
            redrawWaveForm(n, width, dataArray)
        } else {
            return
        }
    }

    // Событие по завершении проигрывания
    function finishEvent() {
        setPlaying(false)
        setIcon(play)
    }

    // Отрисовка отдельного сэмпла
    function drawSample(ctx, i, width, color) {

        const dataArray = JSON.parse(localStorage.getItem('audioBuffer'))

        const x = width * i
        let height = dataArray[i]
        
        if (height > canvas.current.offsetHeight) {
            height = height / (canvas.current.offsetHeight * 7)
        }
        if (height < 2) {
            height = 2
        }

        height = Math.floor(height)

        ctx.fillStyle = color
        ctx.fillRect(x, -height, 1, (height*2))
    }

    // Изменение текущей длины дорожки и времени
    function changeCurrentPosition(mouseX) {

        const percentWidth = Math.round(mouseX * 100 / canvas.current.offsetWidth) // Текущая длина желтой части дорожки в %
        const n = Math.round(percentWidth * 233 / 100) // Текущее количество желтых сэмплов
        const dataArray = JSON.parse(localStorage.getItem('audioBuffer'))
        const width = canvas.current.offsetWidth / dataArray.length

        redrawWaveForm(n, width, dataArray)

        audio.current.currentTime = percentWidth * audio.current.duration / 100
    }

    // Обработчик кнопки Play/Pause
    const handlePlayPause = () => {
        // try cath не работает
        try {
            setPlaying(!playing)

            if (playing) {
                audio.current.pause()
                setIcon(play)
            } else {
                audio.current.play()
                setIcon(pause)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // Вернуться к форме
    const handleBack = () => {

        const formContainer = document.querySelector('.promo_block-right')
        const playerContainer = document.querySelector('.player-wrapper')

        formContainer.style.display = 'flex'
        playerContainer.style.display = 'none'
    }

    // Изменить громкость
    const changeVolume = (e) => {
        const value = e.target.value
        audio.current.volume = value / 100

        volumeRange.current.style.setProperty('--volume-offset', volumeRange.current.value / volumeRange.current.max * 100 + '%')
    }

    let isDown = false

    // Мышь нажата
    const handleMouseDown = (e) => {

        e.preventDefault()
        e.stopPropagation()

        isDown = true
    }

    // Мышь отпущена
    const handleMouseUpOut = (e) => {

        e.preventDefault()
        e.stopPropagation()

        if(isDown) {
            const mouseX = getMousePos(e)
            changeCurrentPosition(mouseX)
            isDown = false
        }
    }

    // Получить текущее полжение мыши по Х в канвасе
    function getMousePos (e) {
        const rect = canvas.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.current.offsetWidth
        return x
    }

  return(
    <div className="player-container">
        <audio onTimeUpdate={timerUpdateEvent} onEnded={finishEvent} crossOrigin='anonymous' ref={audio} src={URL} preload="metadata"/>
        <div className="player-container_back-button">
            <span onClick={handleBack} className="player-container_back-button-content">← Back</span>
        </div>
        <div className="player-container_widget-player">
            <button onClick={handlePlayPause} className="player-container_play-button">
                <img className='audio-player__img' src={icon} alt='Play/Pause'></img>
            </button>
            <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUpOut} onMouseOut={handleMouseUpOut} ref={canvas} className="player-container_sample"></canvas>
            <div className="player-container_wrapper">
                <span className="player-container_timer">{timer}</span>
                <div className='player-container_volume-control'>
                    <input ref={volumeRange} onInput={changeVolume} type="range" min="0" max="100" defaultValue="50" className='player-container_volume-track'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Player
