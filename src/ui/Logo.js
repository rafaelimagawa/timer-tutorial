import styled from "styled-components"

const LogoMain = styled.div`
    height: 70px;
`
const LogoImg = styled.img`
    height: 70px;
`
const Logo = () => {
    return (
        <LogoMain>
            <LogoImg src="/logo.png" />
        </LogoMain>
    )
}

export default Logo