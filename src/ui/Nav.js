import { NavLink } from "react-router-dom"
import styled from "styled-components"

const NavBar = styled.div`
    width: 100vw;
    background-color: var(--black);
    display: flex;
    justify-content: space-around;
    height: 40px;
    align-items: initial;
    margin: auto;
    border-bottom: 5px solid var(--main-color);
`

const StyledNav = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    font-weight: bold;
    &.selected {
        color: var(--main-color);
        text-decoration: underline;
        transform: scale(1.2);
    }
`

const Nav = () => {
    return (
        <NavBar>
            <StyledNav activeClassName="selected" to='/chrono'>Chrono</StyledNav>
            <StyledNav activeClassName="selected" to='/timer'>Timer</StyledNav>
            <StyledNav activeClassName="selected" to='/emom'>Emom</StyledNav>
            <StyledNav activeClassName="selected" to='/interval'>Interval</StyledNav>
        </NavBar>
    )
}

export default Nav