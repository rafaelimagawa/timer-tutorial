import { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import ResetBtn from "../ui/ResetBtn"
import StartBtn from "../ui/StartBtn"
import StopBtn from "../ui/StopBtn"

const Display = styled.div`
    width: 100%;
    text-align: center;
    font-size: 4rem;
    height: 80%;
`
const Controls = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: row;
`
const Input = styled.input`
    background-color: transparent;
    width: 5rem;
    justify-content: right;
    border: none;
    color: black;
    font-size: 4rem;
    text-align: center
`
const Form = styled.form`
    font-size: 2rem;
    text-align: center
`

const Pomodoro = () => {
    const [[rounds, hrs, mins, secs, msecs], setTime] = useState([0, 0, 0, 0, 0])
    const [hrInsert, setHrInsert] = useState(0) 
    const [minInsert, setMinInsert] = useState(0) 
    const [secInsert, setSecInsert] = useState(0) 
    const [roundsInsert, setRoundsInsert] = useState(0)
    const [active, setActive] = useState(false)
    const [rest, setRest] = useState(true)

    let intervalRef = useRef()

    const writeValue = () => {
        if (rounds === 0 && hrs === 0 && mins === 0 && secs === 0 && msecs === 0) {
            alert("done")
            setActive(false)      
        } else if (hrs === 0 && mins === 0 && secs === 0 && msecs === 0) {
            setTime([rounds - 1, +hrInsert, +minInsert, +secInsert, 0]) 
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
            intervalRef.current = setTimeout(() => {
                writeValue()
                if(rounds%2 === 0) {
                    setRest(false)
                } else {
                    setRest(true)
                }
            }, 100)
            return () => clearInterval(intervalRef.current)
        }
    })

    const handleSubmit = event => {
        event.preventDefault()
        setTime([+roundsInsert*2 - 1, +hrInsert, +minInsert, +secInsert, 0])
    }

    const resetValue = () => {
        setTime([+roundsInsert*2 - 1, +hrInsert, +minInsert, +secInsert, 0])
        setActive(false)
    }
    // const RestActive = () => {
    //     if(rounds%2 === 0) {
    //         setRest(true)
    //     } else {
    //         setRest(false)
    //     }
    // }

    return (
        <div>
            <Form onBlur={handleSubmit}>
                <div>
                    <label>Rounds</label>
                    <Input type="number" name="rounds" onChange={e => setRoundsInsert(e.target.value)} min="1" placeholder="0"/>
                </div>           
                <Input type="number" name="min" onChange={e => setMinInsert(e.target.value)} max="60" min="0" placeholder="00"/><span>:</span>
            </Form>    
            <Display>
                <p>{rest ? <p>{Math.floor(rounds/2 + 1)} </p> : <p>{Math.floor(rounds/2 + 1)} REST</p>}</p>
                {`${hrs.toString().padStart(2, '0')}:
                ${mins.toString().padStart(2, '0')}:
                ${secs.toString().padStart(2, '0')}.
                ${msecs.toString()}`}
            </Display>
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

export default Pomodoro