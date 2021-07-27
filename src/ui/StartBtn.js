import styled from "styled-components"

const Btn = styled.button`
    background-color: transparent;
    font-size: 1.5rem;
    border: solid 2px green;
    width: 90%;
    height: 3rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: green;
    transition: 0.5s;
    margin: auto;
    &:hover {
        background-color: green;
        fill: white;
    }
`
// const StyleSvg = styled.svg`
//     font-size: 150%;
// `

const StartBtn = (props) => {
    return (
        <Btn onClick={props.click}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                <path d="M3 22v-20l18 10-18 10z"/>
            </svg>
        </Btn>
    )
}

export default StartBtn