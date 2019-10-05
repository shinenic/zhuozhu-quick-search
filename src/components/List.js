import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { search, addHistory, setTopCard } from '../actions';
import { Redirect } from 'react-router-dom';
import PIC from '../image/artist/周杰倫.jpg';

const getImgSrc = name => {
  return require(`../image/artist/${name}.jpg`);
}
const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

// for desktop
const GridDiv = styled.div`
  display: inline-block;
  width: 25%;
  color: white;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  &:before {
    content: "";
	  float: left;
	  padding-top: 100%; 
  }
`;
const ImgContainer = styled.div`
  width:75%;
  height:75%;
  position: absolute;
  top:50%;
  left:50%;
  transform: translateY(-50%) translateX(-50%);
  
  background-image: url(${props=>props.img});
  background-size: cover;  
  filter: grayscale(1);
`;

// for mobile
const CellDiv = styled.div`
  box-sizing:border-box;
  border:5px solid black;
  margin:0;
  padding:0;
  float:left;
  width:33.33vw;
  height:33.33vw;
  position:relative;
`;
const showImg = keyframes`
  0%{
  background:#000;
  opacity:1;
    }
  100%{
  background:#013B63;
  opacity:0.33;
  }
`;

const ImgMask = styled.div`
  position:absolute;
  top:0;
  left:0;
  /* background:#000; */
  /* opacity:1; */
  box-sizing:border-box;
  width:100%;
  height:100%;
  z-index:5;
  
  background:#013B63;
  opacity:0.33;

  @media (max-width: 500px) {
    animation: ${showImg} 1s 1 both ${props => props.random}s;
  }
`;
const TextDiv = styled.div`
  user-select: none;
  position:absolute;
  color:white;
  bottom:20px;
  left:0;
  width:100%;
  height:40px;

  background-color:rgb(0,0,0,0.4);

  text-align:center;
  font-size:20px;
  line-height:40px;
  z-index:6;
`;
const Img = styled.img`
  height:auto;
  width:auto;
  max-height: 100%;  
  max-width: 100%; 
  filter:grayscale(1);
`;
const ListDiv = styled.div`
  box-sizing:border-box;
  background:black;
  position:absolute;
  left:0;
  top:0;
  padding:85px 0 0 0;
  margin:0;
  width:100vw;
  ${CellDiv}:nth-child(4),${CellDiv}:nth-child(8),${CellDiv}:nth-child(13){
    width:66.6vw;
    height:66.6vw;
    ${ImgMask}{
        width:calc(66.66vw - 10px);
        height:calc(66.66vw - 10px);
    }
  }
  ${CellDiv}:nth-child(9){
    margin-top:-33.33vw;
  }
  @media (min-width: 500px) {
    left:250px;
    width:calc(100vw - 250px);
  }
`;

class List extends PureComponent {
  render() {
    const artistArr = ['蔡依林', '莫文蔚', '王力宏', '張學友', '張信哲', '林憶蓮'
      , '五月天', '張惠妹', '辛曉琪', '周杰倫', '林志炫', '林俊傑', '江蕙', '梁靜茹'
      , '許美靜', '許茹芸', '陳昇', '王菲']
    return (
      <ListDiv>
        {artistArr.map((value, index) => {
          return (
            this.props.windowWidth < 500
              ? <CellDiv
                key={index} onClick={() => {
                  this.props.search(value);
                  this.props.addHistory(value);
                  this.props.setTopCard('listDisplay', false);
                }}>
                <ImgMask random={getRandomArbitrary(0, 1.5)} />
                <TextDiv onClick={() => {
                  this.props.search(value);
                  this.props.addHistory(value);
                  this.props.setTopCard('listDisplay', false);
                }}>{value}</TextDiv>
                <div>
                  <Img src={getImgSrc(value)} alt={value} />
                </div>
              </CellDiv>
              : <GridDiv
                key={index} onClick={() => {
                  this.props.search(value);
                  this.props.addHistory(value);
                  this.props.setTopCard('listDisplay', false);
                }}>
                <ImgContainer img={getImgSrc(value)}>
                  {/* <ImgMask random={getRandomArbitrary(0, 1.5)} /> */}
                  <TextDiv>{value}</TextDiv>
                </ImgContainer>
              </GridDiv>
          )
        })
        }
        {(this.props.text !== '' || this.props.listDisplay === false) && <Redirect to={'/search'} />}
      </ListDiv>
    )
  }
}

const mapStatetoProps = state => {
  return {
    searchResult: state.searchResult,
    listDisplay: state.listDisplay,
    text: state.text,
    windowWidth: state.windowWidth,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    search: text => dispatch(search(text)),
    addHistory: text => dispatch(addHistory(text)),
    setTopCard: (element, state) => dispatch(setTopCard(element, state)),
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(List);
