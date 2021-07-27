import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import ResetBtn from "../ui/ResetBtn"
import StartBtn from "../ui/StartBtn"
import StopBtn from "../ui/StopBtn"
import useSound from 'use-sound'
import bell from '../sounds/boxing-bell.mp3'

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

const Timer = () => {
    const [[hrs, mins, secs, msecs], setTime] = useState([0, 0, 0, 0])
    const [active, setActive] = useState(false)
    const [hrInsert, setHrInsert] = useState() 
    const [minInsert, setMinInsert] = useState() 
    const [secInsert, setSecInsert] = useState() 

    const [play] = useSound(bell)

    let intervalRef = useRef()

    const writeValue = () => {
        if (hrs === 0 && mins === 0 && secs === 0 && msecs === 0) {
            play()
        } else if (mins === 0 && secs === 0 && msecs === 0) {
            setTime([hrs - 1, 59, 59, 9])
        } else if (secs === 0 && msecs === 0) {
            setTime([hrs, mins - 1, 59, 9])
        } else if (msecs === 0){
            setTime([hrs, mins, secs - 1, 9])
        } else {
            setTime([hrs, mins, secs, msecs - 1 ])
        }
    }

    useEffect(() => {
        if(active) {
            intervalRef.current = setTimeout(() => writeValue(), 100)
            console.log('teste')
            return () => clearInterval(intervalRef.current)
            
        }
    })

    const handleSubmit = event => {
        event.preventDefault()
        const inputs = [+hrInsert, +minInsert, +secInsert, 0]
        inputs.forEach((element, index)=> {
            if(isNaN(element)){
                inputs[index]=0
            }
        })
        setTime(inputs)
        setHrInsert(inputs[0])
        setMinInsert(inputs[1])
        setSecInsert(inputs[2])
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
        } else if(isNaN(value)) {
            setMinInsert("00")
        } else {
            const m = inputValue(+value)
            setMinInsert(m)
        }
    }
    const handleSecInsert = (value) => {
        if(+value>60){
            setSecInsert(59)
        } else if(isNaN(value)) {
            setMinInsert("00")
        } else {
            const s = inputValue(+value)
            setSecInsert(s)
        }
    }
    const resetValue = () => {
        const inputs = [+hrInsert, +minInsert, +secInsert, 0]
        inputs.forEach((element, index)=> {
            if(isNaN(element)){
                inputs[index]=0
            }
        })
        setTime(inputs)
        setActive(false)
    }
    let TempoDisplay
    if(mins===0) {
        TempoDisplay = (<Display>{`${secs.toString().padStart(2, '0')}.${msecs.toString()}`}</Display>)
    } else if (hrs===0) {
        TempoDisplay = (<Display>{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString()}`}</Display>)
    } else {
        TempoDisplay = (<Display>{`${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString()}`}</Display>)
    }

    return (
        <div>
            <Form onBlur={handleSubmit}>
                <label>Time</label>
                <Input type="number" name="hour" onChange={e=>setHrInsert(e.target.value)} min="0" placeholder="00" max="59"/><span>:</span>
                <Input type="number" name="min" onChange={e=>handleMinInsert(e.target.value)} value={+minInsert} max="59" min="00" placeholder="00" /><span>:</span>
                <Input type="number" name="sec" onChange={e=>handleSecInsert(e.target.value)} value={+secInsert} max="59" min="00" placeholder="00"/>
            </Form>
            { TempoDisplay }
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

export default Timer
