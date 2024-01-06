import { styled } from "styled-components";

export const FooterContain = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 80px;
    margin:'0 auto 40px auto';
    box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
    position: fixed;
    bottom: 0;
`;
export const FooterLink = styled.a`
    cursor: pointer;
`;