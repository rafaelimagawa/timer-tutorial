import { useEffect, useRef, useState } from "react"

const Chrono = () => {
    const [[hrs, mins, secs], setTime] = useState([0, 0, 0])
    const [active, setActive] = useState(false)
    const [lap, setLap] =useState([])

    let intervalRef = useRef()

    const writeValue = () => {
        if (mins === 59 && secs === 59 ) {
            setTime([hrs + 1, 0, 0])
        } else if (secs === 59 ) {
            setTime([hrs, mins + 1, 0])
        } else {
            setTime([hrs, mins, secs + 1])
        }
    }

    useEffect(() => {
        if(active) {
            intervalRef.current = setTimeout(() => writeValue(), 1000)
            return () => clearInterval(intervalRef.current)
        }
    })

    const resetValue = () => {
        setTime([0, 0, 0])
        setLap([])
        setActive(false)
    }

    const addLap = () => {
        const timeString = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        console.log(lap)
        setLap([...lap, timeString])
    }

    const laps = lap.map((data) => <li>{data}</li>)

    return (
        <div>
            {!active ? 
                <div>
                    <button onClick={()=>setActive(true)}>Start</button>
                    <button onClick={()=>resetValue(true)}>Reset</button>
                </div>
                :
                <div>
                    <button onClick={()=>setActive(false)}>Stop</button>
                    <button onClick={()=>resetValue(true)}>Reset</button>
                    <button onClick={()=>addLap()}>Lap</button>
                </div>
            }
            <div>
                <p>{`${hrs.toString().padStart(2, '0')}:${mins
                .toString()
                .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
            </div>
            <div>
                <ol>
                    {laps}
                </ol> 
            </div>
        </div>
    )
}

export default Chrono