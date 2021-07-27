import styled from "styled-components"

const Btn = styled.button`
    background-color: transparent;
    font-size: 1.5rem;
    border: solid 2px #ffe135;
    width: 90%;
    height: 3rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffe135;
    font-weight: bold;
    fill: yellow;
    transition: 0.5s;
    margin: auto;
    &:hover {
        background-color: #ffe135;
        color: white;
    }
`


const LapBtn = (props) => {
    return (
        <Btn onClick={props.click}>
            Lap
        </Btn>
    )
}

export default LapBtn