import styled from "styled-components"
import { useEffect, useRef, useState } from "react"

const Display = styled.div`
    width: 100%;
    text-align: center;
    font-size: 3rem;
    height: 80%;
`

const Countdown = () => {
    const [value, setValue] = useState(0)
    const [active, setActive] = useState(false)
    const [initialValue, setInitialValue] = useState(0)

    let intervalRef = useRef()

    useEffect(() => {
        if(value>0 && active) {
            intervalRef.current = setTimeout(() => setValue(value - 1), 1000)
            return () => clearInterval(intervalRef.current)
        }
    },[value, active])

    const changeValue = (event) => {
        setValue(event.target.value)
        setInitialValue(event.target.value)
    }

    const resetValue = () => {
        setValue(initialValue)
        setActive(false)
    }

    return (
        <div>
            <input onChange={changeValue} />
            {!active ? 
                <div>
                    <button onClick={()=>setActive(true)}>Start</button>
                </div>
                :
                <div>
                    <button onClick={()=>setActive(false)}>Stop</button>
                    <button onClick={()=>resetValue(true)}>Reset</button>
                </div>
            }
            <Display>
                {value}
            </Display>
        </div>
    )
}

export default Countdown