import { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import ResetBtn from "../ui/ResetBtn"
import StartBtn from "../ui/StartBtn"
import StopBtn from "../ui/StopBtn"
import useSound from 'use-sound'
import bell from '../sounds/boxing-bell.mp3'
import bellRound from '../sounds/bell-round.mp3'

const Display = styled.div`
    width: 100%;
    text-align: center;
    font-size: 4rem;
    height: 80%;
    color: white;
    font-family: monospace;
`
const Controls = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: row;
`
const Input = styled.input`
    background-color: transparent;
    width: auto;
    justify-content: right;
    border: none;
    color: var(--sec-color);
    font-size: 2rem;
    text-align: center;
    font-family: monospace;
`
const Form = styled.form`
    margin: 20px;
    font-size: 2rem;
    text-align: center;
    color: white;
    font-family: monospace;
`

const Emom = () => {
    const [[rounds, hrs, mins, secs, msecs], setTime] = useState([0, 0, 0, 0, 0])
    const [hrInsert, setHrInsert] = useState() 
    const [minInsert, setMinInsert] = useState() 
    const [secInsert, setSecInsert] = useState() 
    const [roundsInsert, setRoundsInsert] = useState(0)
    const [active, setActive] = useState(false)

    const [play] = useSound(bell)
    const [playRound] = useSound(bellRound)

    let intervalRef = useRef()

    const writeValue = () => {
        if (rounds === 0 && hrs === 0 && mins === 0 && secs === 0 && msecs === 0) {
            play()
            setActive(false)      
        } else if (hrs === 0 && mins === 0 && secs === 0 && msecs === 0) {
            playRound()
            const inputs = [rounds - 1, +hrInsert, +minInsert, +secInsert, 0]
            inputs.forEach((element, index)=> {
                if(isNaN(element)){
                    inputs[index]=0
                }
            })
            setTime(inputs)
        } else if (mins === 0 && secs === 0 && msecs === 0) {
            setTime([rounds, hrs - 1, 59, 59, 9])
        } else if (secs === 0 && msecs === 0) {
            setTime([rounds, hrs, mins - 1, 59, 9])
        } else if (msecs === 0) {
            setTime([rounds, hrs, mins, secs - 1 , 9])
        } else {
            setTime([rounds, hrs, mins, secs, msecs - 1])
        }
    }

    useEffect(() => {
        if(active) {
            intervalRef.current = setTimeout(() => writeValue(), 100)
            return () => clearInterval(intervalRef.current)
        }
    })

    const handleSubmit = event => {
        event.preventDefault()
        const inputs = [+roundsInsert, +hrInsert, +minInsert, +secInsert, 0]
        inputs.forEach((element, index)=> {
            if(isNaN(element)){
                inputs[index]=0
            }
        })
        console.log(inputs)
        setTime(inputs)
        setRoundsInsert(inputs[0])
        setHrInsert(inputs[1])
        setMinInsert(inputs[2])
        setSecInsert(inputs[3])
    }
    function inputValue(num) {
        if(num < 10 && num > 0){
            return num.toString().padStart(2, '0')
        } else if(num.length > 2){
            return num.toString().slice(0,2)
        } else {
            return num
        }
    }
    const handleMinInsert = (value) => {
        if(+value>59){
            setMinInsert(59)
        } else {
            const m = inputValue(value)
            setMinInsert(m)
        }
    }
    const handleSecInsert = (value) => {
        if(+value>60){
            setSecInsert(59)
        } else {
            const s = inputValue(+value)
            setSecInsert(s)
        }
    }
    const resetValue = () => {
        const inputs = [+roundsInsert, +hrInsert, +minInsert, +secInsert, 0]
        inputs.forEach((element, index)=> {
            if(isNaN(element)){
                inputs[index]=0
            }
        })
        setTime(inputs)
        setActive(false)
    }
    let TempoDisplay
    if(mins===0 && hrs===0) {
        TempoDisplay = (
            <Display>
                <p>{rounds + 1}</p>
                {`${secs.toString().padStart(2, '0')}.${msecs.toString()}`}
            </Display>
        )
    } else if (hrs===0) {
        TempoDisplay = (
            <Display>
                <p>{rounds + 1}</p>
                {`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString()}`}
            </Display>
        )
    } else {
        TempoDisplay = (
            <Display>
                <p>{rounds + 1}</p>
                {`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString()}`}
            </Display>
        )
    }

    return (
        <div>
            <Form onBlur={handleSubmit}>
                <div>
                    <label>Rounds</label>
                    <Input type="number" name="rounds" onChange={e => setRoundsInsert(e.target.value - 1)} max="999" min="1" placeholder="0"/>
                </div>           
                <label>Time</label>
                <Input type="number" name="hour" onChange={e => setHrInsert(e.target.value)} max="59" min="0" placeholder="00"/><span>:</span>
                <Input type="number" name="min" onChange={e => handleMinInsert(e.target.value)} value={+minInsert} max="60" min="0" placeholder="00"/><span>:</span>
                <Input type="number" name="sec" onChange={e => handleSecInsert(e.target.value)} value={+secInsert} max="60" min="0" placeholder="00"/>
            </Form>
            {TempoDisplay}
            {!active ? 
                <Controls>
                    <StartBtn click={()=>setActive(true)}>Start</StartBtn>
                    <ResetBtn click={()=>resetValue(true)}>Reset</ResetBtn>
                </Controls>
                :
                <Controls>
                    <StopBtn click={()=>setActive(false)}>Stop</StopBtn>
                    <ResetBtn click={()=>resetValue(true)}>Reset</ResetBtn>
                </Controls>
            }
        </div>
    )
}

export default Emom