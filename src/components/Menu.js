import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { zhSwitchChange, engSwitchChange, setTopCardDefault, fetchDataFromServer, changePic, setTopCard } from '../actions';
import Switch from "react-switch";
import { Link } from 'react-router-dom';
import Pusheen1 from '../image/Pusheen1.png';
import Pusheen2 from '../image/Pusheen2.png';
import Pusheen3 from '../image/Pusheen3.png';

const MenuDiv = styled.div`
  height:${props => props.height + 'px'};
  width:45vw;
  position:fixed;
  top:0;
  transition:0.7s;
  left:${props => props.menuState === 'OPEN' ? '0' : '-45vw'};
  background:#154970;
  opacity:1;
  z-index:12;
  @media (min-width: 500px) {
    width:250px;
    left:0;
  }
`;
const Option = styled.div`
  height:60px;
  width:45vw;
  font-size:18px;
  line-height:60px;
  text-align:left;
  color:#EEE;
  font-weight:bold;

  @media (min-width: 500px) {
    width:250px;
  }
`;
const OptionText = styled.span`
  padding-left:18px;
  @media (min-width: 500px) {
    padding-left:30px;
  }
`;
const Title = styled(Option)`
  height:150px;
  position:relative;
`;
const TitleImg = styled.img`
  -webkit-tap-highlight-color: transparent;
  content:url(${props => (props.pic === 1 && Pusheen1) || (props.pic === 2 && Pusheen2) || (props.pic === 3 && Pusheen3)});
  height:85px;
  width:85px;
  position: absolute;
  top:50%;
  left:50%;
  transform: translateY(-50%) translateX(-50%);
  cursor: pointer; 
`;

const OldiesText = styled.span`
  font-size:16px;
  color:#EEE;
  font-weight:bold;
  position:absolute;
  bottom:4vh;
  left:15px;
  
  @media (min-width: 500px) {
    left:30px;
  }
`;
const OldiesSwitchDiv = styled.div`
  position:absolute;
  bottom:calc(4vh - 4px);
  right:8px;
  
  @media (min-width: 500px) {
    right:30px;
  }
`;
const EngOldiesText = styled(OldiesText)`
  bottom:12vh;
`;
const EngOldiesSwitchDiv = styled(OldiesSwitchDiv)`
  bottom:calc(12vh - 4px);
`;

const StyledLink = styled(Link)`
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

class Menu extends PureComponent {
  render() {
    return (
      <MenuDiv height={this.props.windowHeight} menuState={this.props.menuState} >
        <Title><TitleImg onClick={() => this.props.changePic()} pic={this.props.titlePic % 3 + 1} /></Title>
        <StyledLink to={'/list'} onClick={() => { this.props.setTopCard('listDisplay', true); this.props.setTopCardDefault(); }}>
          <Option><OptionText>常見歌手名單</OptionText></Option>
        </StyledLink>
        <StyledLink to={'/download'} onClick={() => { this.props.setTopCardDefault(); this.props.fetchDataFromServer(); }}>
          <Option><OptionText>下載最新資料</OptionText></Option>
        </StyledLink>
        <StyledLink to={'/history'} onClick={() => this.props.setTopCardDefault()}>
          <Option><OptionText>檢視歷史紀錄</OptionText></Option>
        </StyledLink>
        <StyledLink to={'/about'} onClick={() => this.props.setTopCardDefault()}>
          <Option><OptionText>關於</OptionText></Option>
        </StyledLink>
        <EngOldiesText>英文資料</EngOldiesText>
        <EngOldiesSwitchDiv><Switch
          onChange={this.props.engSwitchChange}
          checked={this.props.engSwitchChecked}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={26}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={16}
          width={48}
          id="icon-switch1" /></EngOldiesSwitchDiv>
        <OldiesText>老歌資料</OldiesText>
        <OldiesSwitchDiv><Switch
          onChange={this.props.zhSwitchChange}
          checked={this.props.zhSwitchChecked}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={26}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={16}
          width={48}
          id="icon-switch2" /></OldiesSwitchDiv>

      </MenuDiv>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    zhSwitchChange: checked => dispatch(zhSwitchChange(checked)),
    engSwitchChange: checked => dispatch(engSwitchChange(checked)),
    setTopCardDefault: () => dispatch(setTopCardDefault()),
    fetchDataFromServer: () => dispatch(fetchDataFromServer()),
    changePic: () => dispatch(changePic()),
    setTopCard: (element, state) => dispatch(setTopCard(element, state)),
  }
}
const mapStatetoProps = state => {
  return {
    menuState: state.menuState,
    windowHeight: state.windowHeight,
    zhSwitchChecked: state.zhSwitchChecked,
    engSwitchChecked: state.engSwitchChecked,
    titlePic: state.titlePic,
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Menu);
