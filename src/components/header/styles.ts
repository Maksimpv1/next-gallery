import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 80px;
    margin:'0 auto 40px auto';
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    @media ( max-width: 500px ) {
        flex-wrap:wrap;        
        height: 160px;
    }
    
`;
export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
`;

export const HeaderList = styled.li`
    margin: 0 20px;
`;

