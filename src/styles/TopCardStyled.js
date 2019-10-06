import styled from 'styled-components';
import searchIcon from '../image/search_white.png';
import crossIcon from '../image/cross_white.png';
import menuIcon from '../image/menu_white.png';
import { Link } from 'react-router-dom'

const ImgMinSize = '23px';
const ImgMaxSize = '30px';

export const StyledLink = styled(Link)`
    text-decoration: none;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export const Title = styled.span`
  float:left;
  color:white;
  font-weight:bold;
  margin-left:47px;
  
  @media (min-width: 500px) {
    margin-left:20px;
  }
`;

export const Hamburger = styled.button`
  float:right;
  width:25px;
  height:25px;
  margin:0;
`;
export const MenuImg = styled.img`
  -webkit-tap-highlight-color: transparent;
  content:url(${menuIcon});
  height:23px;
  width:23px;
  position: absolute;
  left:15px;
  top:50%;
  transform: translateY(-50%);
  cursor: pointer; 
  z-index:12;
  
  @media (min-width: 500px) {
    display:none;
  }
`;

export const SearchImg = styled.img`
  -webkit-tap-highlight-color: transparent;
  content:url(${props => props.textboxState === 'OPEN' ?crossIcon: searchIcon});
  height:${props => props.textboxState === 'OPEN' ?ImgMinSize:ImgMaxSize};
  position: absolute;
  right:25px;
  top:50%;
  transition:0.5s;
  transform: ${props => props.textboxState === 'OPEN' ?'translateY(-70%)': 'translateY(-50%)'};
  cursor: pointer; 
  z-index:12;
`;
export const CrossImg = styled.img`
  -webkit-tap-highlight-color: transparent;
  content:url(${crossIcon});
  height:${ImgMinSize};
  position: absolute;
  right:25px;
  top:40%;
  transform: translateY(-40%);
  cursor: pointer; 
  z-index:12;
`;

export const TextInput = styled.input`
  outline:none;
  background:#013B63;
  border: none;
  border-bottom: 3px solid white;
  color:white;
  font-size:17px;

  padding:0;
  padding-left:10px;
  height:25px;
  position: absolute;
  right:25px;
  top:57%;

  transition: 0.5s;
  max-width:${props => props.switch === "OPEN" ? '115px': '40px'};
  transform: ${props => props.switch === "OPEN" ? 'translateY(-57%)': 'translateY(-20%)'};
  opacity: ${props => props.switch === "OPEN" ? '1': '0'};
  visibility: ${props => props.switch === "OPEN" ?'visible': 'hidden'};
`;

export const TopCardDiv = styled.div`
  background:#013B63;
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  margin:0;
  transition:font-size line-height height 0.7s;
  font-size:${props => !props.expand  ? '23px' : '27px'} ;
  line-height:${props => !props.expand  ? '55px' : '80px'} ;
  height:${props => !props.expand  ? '55px' : '80px'} ;
  z-index:10;
  
  @media (min-width: 500px) {
    left:250px;
    width:calc(100vw - 250px);
  }
`;