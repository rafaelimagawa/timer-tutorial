import { useEffect, useRef, useState } from "react"

const Teste = () => {
    const [[hrs, mins, secs], setTime] = useState([0, 0, 0])
    const [active, setActive] = useState(false)
    const [hrInsert, setHrInsert] = useState(0) 
    const [minInsert, setMinInsert] = useState(0) 
    const [secInsert, setSecInsert] = useState(0) 

    let intervalRef = useRef()

    const writeValue = () => {
        if (hrs === 0 && mins === 0 && secs === 0) 
            console.log('done')
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
            <form>
                <input type="number" name="hour" onChange={e => setHrInsert(e.target.value)} min="0" placeholder="0"/>
                <input type="number" name="min" onChange={e => setMinInsert(e.target.value)} max="60" min="0" placeholder="0"/>
                <input type="number" name="sec" onChange={e => setSecInsert(e.target.value)} max="60" min="0" placeholder="0"/>
                <button onClick={handleSubmit}>Ok</button>
            </form>
            
            {!active ? 
                <div>
                    <button onClick={()=>setActive(true)}>Start</button>
                    <button onClick={()=>resetValue(true)}>Reset</button>
                </div>
                :
                <div>
                    <button onClick={()=>setActive(false)}>Stop</button>
                    <button onClick={()=>resetValue(true)}>Reset</button>
                </div>
            }
            <div>
                <p>{`${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
            </div>
        </div>
    )
}

export default Teste