import { Link } from "react-router-dom"

const Select = () => {
    return (
        <div>
            <div>
                <Link to="/timer">Timer</Link>
            </div>
            <div>
                <Link to="/chrono">Cronometro</Link>
            </div>
            
        </div>
    )
}

export default Select