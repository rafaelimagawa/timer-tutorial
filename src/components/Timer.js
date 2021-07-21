import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import ResetBtn from "../ui/ResetBtn"
import StartBtn from "../ui/StartBtn"
import StopBtn from "../ui/StopBtn"

const Display = styled.div`
    width: 100%;
    text-align: center;
    font-size: 5rem;
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
    width: 6rem;
    justify-content: right;
    border: none;
    color: black;
    font-size: 3rem;
    text-align: center
`
const Form = styled.form`
    font-size: 4rem;
    text-align: center
`
const Timer = () => {
    const [[hrs, mins, secs], setTime] = useState([0, 0, 0])
    const [active, setActive] = useState(false)
    const [hrInsert, setHrInsert] = useState(0) 
    const [minInsert, setMinInsert] = useState(0) 
    const [secInsert, setSecInsert] = useState(0) 

    let intervalRef = useRef()

    const writeValue = () => {
        if (hrs === 0 && mins === 0 && secs === 0) 
            alert('done')
        else if (mins === 0 && secs === 0 ) {
            setTime([hrs - 1, 59, 59])
        } else if (secs === 0 ) {
            setTime([hrs, mins - 1, 59])
        } else {
            setTime([hrs, mins, secs - 1])
        }
    }

    useEffect(() => {
        if(active) {
            intervalRef.current = setTimeout(() => writeValue(), 1000)
            return () => clearInterval(intervalRef.current)
        }
    })

    const handleSubmit = event => {
        event.preventDefault()
        setTime([+hrInsert, +minInsert, +secInsert])
    }

    const resetValue = () => {
        setTime([+hrInsert, +minInsert, +secInsert])
        setActive(false)
    }

    return (
        <div>
            <Form>
                <Input list="hour" name="hour" onChange={e=>setHrInsert(e.target.value)} min="0" placeholder="00" /><span>:</span>
                <Input list="min-sec" name="min" onChange={e=>setMinInsert(e.target.value)} max="60" min="0" placeholder="00"/><span>:</span>
                <Input list="min-sec" name="sec" onChange={e=>setSecInsert(e.target.value)} max="60" min="0" placeholder="00"/>
                <button onClick={handleSubmit}>Ok</button>
                <datalist id="hour">
                    <option value="00" />
                    <option value="01" />
                    <option value="02" />
                    <option value="03" />
                    <option value="04" />
                    <option value="05" />
                    <option value="06" />
                    <option value="07" />
                    <option value="08" />
                    <option value="09" />
                    <option value="10" />
                    <option value="11" />
                    <option value="12" />
                    <option value="13" />
                    <option value="14" />
                    <option value="15" />
                    <option value="16" />
                    <option value="17" />
                    <option value="18" />
                    <option value="19" />
                    <option value="20" />
                    <option value="21" />
                    <option value="22" />
                    <option value="23" />
                    <option value="24" />
                </datalist>
                <datalist id="min-sec">
                    <option value="00" />
                    <option value="01" />
                    <option value="02" />
                    <option value="03" />
                    <option value="04" />
                    <option value="05" />
                    <option value="06" />
                    <option value="07" />
                    <option value="08" />
                    <option value="09" />
                    <option value="10" />
                    <option value="11" />
                    <option value="12" />
                    <option value="13" />
                    <option value="14" />
                    <option value="15" />
                    <option value="16" />
                    <option value="17" />
                    <option value="18" />
                    <option value="19" />
                    <option value="20" />
                    <option value="21" />
                    <option value="22" />
                    <option value="23" />
                    <option value="24" />
                    <option value="25" />
                    <option value="26" />
                    <option value="27" />
                    <option value="28" />
                    <option value="29" />
                    <option value="30" />
                    <option value="31" />
                    <option value="32" />
                    <option value="33" />
                    <option value="34" />
                    <option value="35" />
                    <option value="36" />
                    <option value="37" />
                    <option value="38" />
                    <option value="39" />
                    <option value="40" />
                    <option value="41" />
                    <option value="42" />
                    <option value="43" />
                    <option value="44" />
                    <option value="45" />
                    <option value="46" />
                    <option value="47" />
                    <option value="48" />
                    <option value="49" />
                    <option value="50" />
                    <option value="51" />
                    <option value="52" />
                    <option value="53" />
                    <option value="54" />
                    <option value="55" />
                    <option value="56" />
                    <option value="57" />
                    <option value="58" />
                    <option value="59" />
                    <option value="60" />
                </datalist>
            </Form>
            <Display>
                <p>{`${(hrs).toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
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

export default Timer