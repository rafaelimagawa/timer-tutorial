import { NavLink } from "react-router-dom"
import styled from "styled-components"

const NavBar = styled.div`
    width: 100vw;
    background-color: var(--main-color);
    display: flex;
    justify-content: space-around;
    height: 70px;
    align-items: center;
    margin: auto;
`

const StyledNav = styled(NavLink)`
    color: var(--sec-color);
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    font-weight: bold;
    &.selected {
        text-decoration: underline;
        transform: scale(1.2);
    }
`

const Nav = () => {
    return (
        <NavBar>
            <StyledNav activeClassName="selected" to='/timer'>Timer</StyledNav>
            <StyledNav activeClassName="selected" to='/chrono'>Chrono</StyledNav>
            <StyledNav activeClassName="selected" to='/emom'>Emom</StyledNav>
            <StyledNav activeClassName="selected" to='/interval'>Interval</StyledNav>
        </NavBar>
    )
}

export default Nav