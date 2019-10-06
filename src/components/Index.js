import React, { PureComponent } from 'react'

import TopCard from './TopCard';
import Menu from './Menu';
import ResultCard from './ResultCard';
import Download from './Download';
import List from './List';
import History from './History';
import About from './About';
import Loading from './Loading';
import styled, { keyframes } from 'styled-components';

import { connect } from 'react-redux';
import { setTopCard, updateWindowSize } from '../actions';
import { Route } from 'react-router-dom'

const MainDiv = styled.div``;

const masking = keyframes`
  from{
    opacity:0;
    }
  to{
    opacity:0.5;
  }
`;
const Mask = styled.div`
  height:100vh;
  width:100vw;
  position:fixed;
  top:0;
  left:0;
  background:black;
  opacity:0.5;
  animation: ${props => props.menuState === 'OPEN' && masking} 2s 1 both;
  z-index:11;
`;


class Index extends PureComponent {
  componentDidMount() {
    window.addEventListener("resize", this.props.updateWindowSize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.props.updateWindowSize);
  }
  render() {
    return (
      <MainDiv>
        <div>
          <Route exact path="/"
            render={() => {
              return (
                <List />
              );
            }} />
          <Route exact path="/search"
            render={() => {
              return (
                <ResultCard />
              );
            }} />
          <Route exact path="/list"
            render={() => {
              return (
                <List />
              );
            }} />
          <Route exact path="/history"
            render={() => {
              return (
                <History />
              );
            }} />
          <Route exact path="/about"
            render={() => {
              return (
                <About />
              );
            }} />
          <Route exact path="/download"
            render={() => {
              return (
                <Download />
              );
            }} />
        </div>
        <TopCard />
        <Menu />
        {this.props.isFetchingNewest && <Loading />}
        {this.props.menuState === 'OPEN' &&
          <Mask menu={this.props.menuState} onClick={() => this.props.setTopCard('menuState', 'CLOSE')} />}
      </MainDiv>
    )
  }
}

const mapStatetoProps = state => {
  return {
    windowHeight: state.windowHeight,
    windowWidth: state.windowWidth,
    menuState: state.menuState,
    isFetchingNewest: state.isFetchingNewest,
    listDisplay: state.listDisplay
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setTopCard: (element, state) => {
      dispatch(setTopCard(element, state))
    },
    updateWindowSize: () => {
      dispatch(updateWindowSize())
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Index);
