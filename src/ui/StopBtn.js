import styled from "styled-components"

const Btn = styled.button`
    background-color: rgba(255, 255, 255, 0.5);
    font-size: 1.5rem;
    border: solid 2px red;
    width: 90%;
    height: 3rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: red;
    transition: 0.5s;
    margin: auto;
    &:hover {
        background-color: red;
        fill: white;
    }
`
// const StyleSvg = styled.svg`
//     font-size: 150%;
// `

const StopBtn = (props) => {
    return (
        <Btn onClick={props.click}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M2 2h20v20h-20z"/>
            </svg>
        </Btn>
    )
}

export default StopBtn