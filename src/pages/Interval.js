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
    justify-content: right;
    border: none;
    color: var(--sec-color);
    font-size: 2rem;
    text-align: center;
    font-family: monospace;
`
const Form = styled.form`
    font-size: 2rem;
    text-align: center;
    color: white;
    font-family: monospace;
`

const Interval = () => {
    const [[rounds, hrs, mins, secs, msecs], setTime] = useState([0, 0, 0, 0, 0])
    const [[hrsRest, minsRest, secsRest, msecsRest], setTimeRest] = useState([0, 0, 0, 0, 0])
    const [hrInsertRest, setHrInsertRest] = useState() 
    const [minInsertRest, setMinInsertRest] = useState() 
    const [secInsertRest, setSecInsertRest] = useState() 
    const [hrInsert, setHrInsert] = useState() 
    const [minInsert, setMinInsert] = useState() 
    const [secInsert, setSecInsert] = useState() 
    const [roundsInsert, setRoundsInsert] = useState(0)
    const [active, setActive] = useState(false)

    const [play] = useSound(bell)
    const [playRound] = useSound(bellRound)

    let intervalRef = useRef()

    const writeValue = () => {
        if (rounds===0 && hrsRest===0 && minsRest===0 && secsRest===0 && msecsRest===0) {
            play()
            setActive(false)
        } else if ((hrs === 0 && mins === 0 && secs === 0 && msecs === 0) | (hrsRest===0 && minsRest===0 && secsRest===0 && msecsRest===0)) {
            // let inputs = [rounds - 1, +hrInsert, +minInsert, +secInsert, 0]
            // inputs.forEach((element, index)=> {
            //     if(isNaN(element)){
            //         inputs[index]=0
            //     }
            // })
            setTime([rounds - 1, +hrInsert, +minInsert, +secInsert, 0])
            // let inputsRest = [+hrInsertRest, +minInsertRest, +secInsertRest, 0]
            // inputs.forEach((element, index)=> {
            //     if(isNaN(element)){
            //         inputs[index]=0
            //     }
            // })
            setTimeRest([+hrInsertRest, +minInsertRest, +secInsertRest, 0])
            playRound()
        } else if (rounds%2!==0 && mins === 0 && secs === 0 && msecs === 0) {
            setTime([rounds, hrs - 1, 59, 59, 9])
        } else if (rounds%2!==0 && secs === 0 && msecs === 0) {
            setTime([rounds, hrs, mins - 1, 59, 9])
        } else if (rounds%2!==0 && msecs === 0) {
            setTime([rounds, hrs, mins, secs - 1 , 9])
        } else if (rounds%2!==0) {
            setTime([rounds, hrs, mins, secs, msecs - 1])
        } else if (minsRest === 0 && secsRest === 0 && msecsRest === 0) {
            setTimeRest([hrsRest - 1, 59, 59, 9])
        } else if (secsRest === 0 && msecsRest === 0) {
            setTimeRest([hrsRest, minsRest - 1, 59, 9])
        } else if (msecsRest === 0) {
            setTimeRest([hrsRest, minsRest, secsRest - 1 , 9])
        } else {
            setTimeRest([hrsRest, minsRest, secsRest, msecsRest - 1])
        }
    }

    useEffect(() => {
        if(active) {
            intervalRef.current = setTimeout(() => {
                writeValue()
            }, 100)
            return () => clearInterval(intervalRef.current)
        }
    })
    const handleSubmit = event => {
        event.preventDefault()
        const inputs = [+roundsInsert*2 - 1, +hrInsert, +minInsert, +secInsert, 0]
        inputs.forEach((element, index)=> {
            if(isNaN(element)){
                inputs[index]=0
            }
        })
        setTime(inputs)
        setRoundsInsert((inputs[0]+1)/2)
        setHrInsert(inputs[1])
        setMinInsert(inputs[2])
        setSecInsert(inputs[3])
        const inputsRest = [+hrInsertRest, +minInsertRest, +secInsertRest, 0]
        inputsRest.forEach((element, index)=> {
            if(isNaN(element)){
                inputsRest[index]=0
            }
        })
        setTimeRest(inputsRest)
        setHrInsertRest(inputsRest[0])
        setMinInsertRest(inputsRest[1])
        setSecInsertRest(inputsRest[2])
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
            const m = inputValue(value)
            setMinInsert(m)
        }
    }
    const handleSecInsert = (value) => {
        if(+value>59){
            setSecInsert(59)
        } else if(isNaN(value)) {
            setMinInsert("00")
        } else {
            const s = inputValue(+value)
            setSecInsert(s)
        }
    }
    const handleMinRestInsert = (value) => {
        if(+value>59){
            setMinInsertRest(59)
        } else if(isNaN(value)) {
            setMinInsert("00")
        } else {
            const m = inputValue(value)
            setMinInsertRest(m)
        }
    }
    const handleSecRestInsert = (value) => {
        if(+value>59){
            setSecInsertRest(59)
        } else if(isNaN(value)) {
            setMinInsert("00")
        } else {
            const s = inputValue(+value)
            setSecInsertRest(s)
        }
    }
    const resetValue = () => {
        const inputs = [+roundsInsert*2 - 1, +hrInsert, +minInsert, +secInsert, 0]
        inputs.forEach((element, index)=> {
            if(isNaN(element)){
                inputs[index]=0
            }
        })
        setTime(inputs)
        let inputsRest = [+hrInsertRest, +minInsertRest, +secInsertRest, 0]
            inputsRest.forEach((element, index)=> {
                if(isNaN(element)){
                    inputsRest[index]=0
                }
            })
            setTimeRest(inputsRest)
        setActive(false)
    }
    let TempoDisplay
    if(rounds%2!==0){
        if(mins===0) {
            TempoDisplay = (
                <Display>
                    <p>{Math.floor(rounds/2 + 1)} ACTIVE</p>
                    {`${secs.toString().padStart(2, '0')}.${msecs.toString()}`}
                </Display>
            )
        } else if (hrs===0) {
            TempoDisplay = (
                <Display>
                    <p>{Math.floor(rounds/2 + 1)} ACTIVE</p>
                    {`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString()}`}
                </Display>
            )
        } else {
            TempoDisplay = (
                <Display>
                    <p>{Math.floor(rounds/2 + 1)} ACTIVE</p>
                    {`${hrsRest.toString().padStart(2, '0')}:${minsRest.toString().padStart(2, '0')}:${secsRest.toString().padStart(2, '0')}.${msecsRest.toString()}`}
                </Display>
            )
        }
    } else {
        if(minsRest===0 && hrsRest===0) {
            TempoDisplay = (
                <Display>
                    <p>{Math.floor(rounds/2 + 1)} REST</p>
                    {`${secsRest.toString().padStart(2, '0')}.${msecsRest.toString()}`}
                </Display>
            )
        } else if (hrsRest===0) {
            TempoDisplay = (
                <Display>
                    <p>{Math.floor(rounds/2 + 1)} REST</p>
                    {`${minsRest.toString().padStart(2, '0')}:${secsRest.toString().padStart(2, '0')}.${msecsRest.toString()}`}
                </Display>
            )
        } else {
            TempoDisplay = (
                <Display>
                    <p>{Math.floor(rounds/2 + 1)} REST</p>
                    {`${hrsRest.toString().padStart(2, '0')}:${minsRest.toString().padStart(2, '0')}:${secsRest.toString().padStart(2, '0')}.${msecsRest.toString()}`}
                </Display>
            )
        }
    }
    
    return (
        <div>
            <Form onBlur={handleSubmit}>
                <div>
                    <label>Rounds</label>
                    <Input type="number" name="rounds" onChange={e => setRoundsInsert(e.target.value)} max="999" min="1" placeholder="0"/>
                </div> 
                <div>
                    <label>Active</label>
                    <Input type="number" name="hour" onChange={e=>setHrInsert(e.target.value)} max="59" min="0" placeholder="00"/><span>:</span>
                    <Input type="number" name="min" onChange={e=>handleMinInsert(e.target.value)} value={+minInsert} max="60" min="0" placeholder="00"/><span>:</span>
                    <Input type="number" name="sec" onChange={e=>handleSecInsert(e.target.value)} value={+secInsert} max="60" min="0" placeholder="00"/>
                </div>          
                <div>
                    <label>Rest</label>
                    <Input type="number" name="hourRest" onChange={e=>setHrInsertRest(e.target.value)} max="59" min="0" placeholder="00"/><span>:</span>
                    <Input type="number" name="minRest" onChange={e=>handleMinRestInsert(e.target.value)} value={+minInsertRest} max="60" min="0" placeholder="00"/><span>:</span>
                    <Input type="number" name="secRest" onChange={e=>handleSecRestInsert(e.target.value)} value={+secInsertRest} max="60" min="0" placeholder="00"/>
                </div> 
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

export default Interval