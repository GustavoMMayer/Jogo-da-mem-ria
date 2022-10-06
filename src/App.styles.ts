import styled from "styled-components";
import {ThemeProvider}from 'styled-components'

export const Container = styled.div`
    width: 100%;
    max-width: 750px;
    margin:auto;
    display: flex;
    padding: 50px 0;
    
    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    width: auto;

    @media (max-width: 750px) {
        margin-bottom: 50px;
        align-items: center;
    }
`;

export const LogoLink = styled.a`
    display: flex;
    text-decoration: none;
    align-items: center;
    font-size: 30px;
    color: #41AAF9;
    border: 2px solid #41AAF9;
    border-radius: 5px;
    margin-left: -2px;
`;
export const LogoTitle = styled.div`
    font-weight: bold;
    padding:0 5px ;
`;


export const InfoArea = styled.div`
    width: 100%;
    margin: 10px 0;

    @media (max-width: 750px) {
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
`;

export const GridArea = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 750px) {
        justify-content: center;
        margin: 0 20px;
    }
`;

export const Grid = styled.div`
    width: 430px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media ( max-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
export const Footer = styled.footer`
position: fixed;
bottom: 5px;
height: 20px;
color: #6a7d8b;



`;
