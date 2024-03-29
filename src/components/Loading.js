import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

const changeLetter = keyframes`
  0% {
    content: "Loading";
  }
  33% {
    content: "Loading.";
  }
  66% {
    content: "Loading..";
  }
  100% {
    content: "Loading...";
  }
`;
const fadeIn = keyframes`
  0% {
    opacity:0;
  }
  
  100% {
    opacity:0.7;
  }
`;
const Mask = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  background:black;
  opacity:0;
  z-index:13;
  animation: ${fadeIn} 1s 1 both;
`;
const LoadingText = styled.div`
  display: flex;
  position:fixed;
  top:40vh;
  left:30vw;
  min-height: 100vh;
  z-index:14;
  &:after {
    animation: ${changeLetter} 1.5s linear infinite ;
    display: block;
    color:white;
    content: "Loading";
    font-size: 40px;
  }
  @media (min-width: 500px) {
    top:40vh;
    left:50vw;
  }
`;

class Loading extends PureComponent {
    render() {
        return (
            <div>
                <Mask />
                <LoadingText />
            </div>
        )
    }
}
export default connect()(Loading);
