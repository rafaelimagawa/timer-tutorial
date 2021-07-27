import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import LapBtn from "../ui/LapBtn"
import ResetBtn from "../ui/ResetBtn"
import StartBtn from "../ui/StartBtn"
import StopBtn from "../ui/StopBtn"

const Display = styled.div`
    width: 100%;
    text-align: center;
    font-size: 15vw;
    height: 10vh;
    color: white;
    margin: auto;
    font-family: monospace;
`
const Controls = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex-direction: row;
`
const Laps = styled.div`
    margin: 15px;
    width: 90%;
    padding-left: 2rem;
    height: 60vh;
    color: white;
    font-family: monospace;
    font-size: 1.5rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 15px;
    }
    &::-webkit-scrollbar-track {
        background: var(--black)
    }
    &::-webkit-scrollbar-thumb {
        background: var(--main-color);
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`
const Chrono = () => {
    const [[hrs, mins, secs, msecs], setTime] = useState([0, 0, 0, 0])
    const [active, setActive] = useState(false)
    const [lap, setLap] =useState([])

    let intervalRef = useRef()

    const writeValue = () => {
        if (mins === 59 && secs === 59  && msecs === 9) {
            setTime([hrs + 1, 0, 0])
        } else if (secs === 59 && msecs === 9) {
            setTime([hrs, mins + 1, 0, 0])
        } else if (msecs === 9){
            setTime([hrs, mins, secs + 1, 0])
        } else {
            setTime([hrs, mins, secs, msecs + 1])
        }
    }

    useEffect(() => {
        if(active) {
            intervalRef.current = setTimeout(() => writeValue(), 100)
            return () => clearInterval(intervalRef.current)
        }
    })

    const resetValue = () => {
        setTime([0, 0, 0, 0])
        setLap([])
        setActive(false)
    }

    const addLap = () => {
        const timeString = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${msecs.toString()}`
        setLap([...lap, timeString])
    }

    const laps = lap.map((data) => <li key={data}>{data}</li>)
    // const LapDif = () => {
    //     let LapDetail
    //     if(lap.length<2) {
    //         LapDetail.push(lap[0])
    //     }
    //     for (let item in lap.length) {
    //         LapDetail.push(lap[item] + " Δ"+ (lap[item-1])
    //     }
    // }

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
            {TempoDisplay}
            <Laps>
                <ol>
                    {laps}
                </ol> 
            </Laps>
            {!active ? 
                <Controls>
                    <StartBtn click={()=>setActive(true)}>Start</StartBtn>
                    <ResetBtn click={()=>resetValue(true)}>Reset</ResetBtn>
                </Controls>
                :
                <Controls>
                    <StopBtn click={()=>setActive(false)}>Stop</StopBtn>
                    <ResetBtn click={()=>resetValue(true)}>Reset</ResetBtn>
                    <LapBtn click={()=>addLap()}>Lap</LapBtn>
                </Controls>
            }
        </div>
    )
}

export default Chrono