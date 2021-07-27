import styled from "styled-components"

const CardBox = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border: solid 1px var(--main-color);
    width: 200px;
    height: 200px;
    margin: 10px;
    padding: 5px;
    color: white;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

`
const Cards = (props) => {
    return (
        <CardBox>
            {props.children}
        </CardBox>
    )
}

export default Cards