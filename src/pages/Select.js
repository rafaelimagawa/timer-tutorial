import { Link } from "react-router-dom"
import styled from "styled-components"
import Cards from "../components/Cards"

const Main = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px;
`
const StyleLink = styled(Link)`
    text-decoration: none;
`
const Select = () => {
    return (
        <Main>
            <StyleLink to="/timer">
                <Cards>
                    <h2>Timer</h2>
                    <p>contagem regressiva de tempo</p>
                </Cards> 
            </StyleLink>  
            <StyleLink to="/chrono">
                <Cards>
                    <h2>Cronômetro</h2>
                    <p>Tempo corrido</p>
                </Cards>
            </StyleLink>
            <StyleLink to="/emom">
                <Cards>
                    <h2>Emom</h2>
                    <p>EMOM (every minute on the minute) é um treino intervalado onde os atletas executam um determinado número de repetições de um exercício a cada minuto.</p>
                </Cards> 
            </StyleLink>
            <StyleLink to="/interval">
                <Cards>
                    <h2>Intervalado</h2>
                    <p> intervalado é um tipo de treinamento que consiste na alternância entre períodos de esforço de intensidade moderada a alta e de repouso</p>
                </Cards> 
            </StyleLink>
            
        </Main>
    )
}

export default Select