import styled from "styled-components"

const Btn = styled.button`
    background-color: transparent;
    font-size: 1.5rem;
    border: solid 2px var(--t2-color);
    width: 90%;
    height: 3rem;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: var(--t2-color);
    transition: 0.5s;
    margin: auto;
    &:hover {
        background-color: var(--t2-color);
        fill: white;
    }
`
const StyleSvg = styled.svg`
    font-size: 150%;
`

const ResetBtn = (props) => {
    return (
        <Btn onClick={props.click}>
            <StyleSvg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                <path d="M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"/>
            </StyleSvg>
        </Btn>
    )
}

export default ResetBtn