import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { search, addHistory, setTopCard, handleInput } from '../actions';
import { Redirect } from 'react-router-dom';

const getImgSrc = name => {
  return require(`../image/artist/${name}.jpg`);
}
const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}

const gridLayout = (mode) => {
  let areas = ""
  let row = 0
  let column = 0
  if (mode === 'MOBILE') {
    column = 3
    row = 20
    for (let cycle = 0; cycle <= 27; cycle += 9) {
      areas += `'s${cycle + 0} s${cycle + 1} s${cycle + 2}''s${cycle + 3} s${cycle + 3} s${cycle + 4}''s${cycle + 3} s${cycle + 3} s${cycle + 5}''s${cycle + 6} s${cycle + 7} s${cycle + 7}''s${cycle + 8} s${cycle + 7} s${cycle + 7}'`
    }
  }
  if (mode === 'DESKTOP') {
    column = 6
    row = 10
    for (let cycle = 0; cycle <= 18; cycle += 18) {
      areas += `'s${cycle + 0} s${cycle + 1} s${cycle + 2} s${cycle + 3} s${cycle + 4} s${cycle + 4}'
      's${cycle + 5} s${cycle + 6} s${cycle + 6} s${cycle + 7} s${cycle + 4} s${cycle + 4}'
      's${cycle + 8} s${cycle + 6} s${cycle + 6} s${cycle + 9} s${cycle + 9} s${cycle + 10}'
      's${cycle + 11} s${cycle + 11} s${cycle + 12} s${cycle + 9} s${cycle + 9} s${cycle + 13}'
      's${cycle + 11} s${cycle + 11} s${cycle + 14} s${cycle + 15} s${cycle + 16} s${cycle + 17}'`
    }
  }
  return {areas, row, column};
}

const artistArr = ['蔡依林', '莫文蔚', '王力宏', '張信哲', '張學友', '林憶蓮'
  , '五月天', '林俊傑', '辛曉琪', '周杰倫', '林志炫', '張惠妹', '江蕙', '梁靜茹'
  , '許美靜', '許茹芸', '陳昇', '王菲', '蔡依林', '莫文蔚', '王力宏', '張信哲', '張學友', '林憶蓮'
  , '五月天', '林俊傑', '辛曉琪', '周杰倫', '林志炫', '張惠妹', '江蕙', '梁靜茹'
  , '許美靜', '許茹芸', '陳昇', '王菲']

const ListDiv = styled.div`
  margin-top:80px;
  padding:6px;
  box-sizing:border-box;
  width:100vw;
  display:grid;

  grid-template-columns:repeat(${gridLayout('MOBILE').column}, calc(33.33vw - 8px));
  grid-template-rows:repeat(${gridLayout('MOBILE').row}, calc(33.33vw - 8px));
  grid-gap:6px;
  grid-template-areas:${gridLayout('MOBILE').areas};

  @media (min-width: 500px) {
    margin-left:250px;
    margin-right:10px;
    width:calc(100vw - 250px);
    grid-template-columns:repeat(${gridLayout('MOBILE').column}, calc(16.66vw - 48.667px));
    grid-template-rows:repeat(${gridLayout('DESKTOP').row}, calc(16.66vw - 48.667px));
    grid-template-areas:${gridLayout('DESKTOP').areas};
  }
`;
const Img = styled.img`
  content:url(${props => props.imgSrc});
  max-width:100%;
  max-height:100%;
  transition:0.5s;
  filter: grayscale(1);
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
  box-sizing:border-box;
  width:100%;
  height:100%;
  z-index:5;
  cursor: pointer;
  background:#013B63;
  opacity:0.33;
  transition:0.5s;
  animation: ${showImg} 1s 1 both ${props => props.random}s;
`;
const CellDiv = styled.div`
  grid-area:${props => 's' + props.index};
  background-color:#333;
  box-sizing:border-box;
  width:100%;
  height:100%;
  position: relative;
  &:hover ${Img}{
    filter:grayscale(0);
  };
  &:hover ${ImgMask}{
    opacity:0;
    background:white;
  };
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
  cursor: pointer;
`;

class ListGrid extends PureComponent {
  render() {
    return (
      <ListDiv>
        {artistArr.map((value, index) => {
          return (<CellDiv
            key={index} 
            index={index} 
            onClick={() => {
              this.props.search(value);
              this.props.addHistory(value);
              this.props.setTopCard('listDisplay', false);
              this.props.handleInput(value);
              this.props.setTopCard('textboxState', 'OPEN');
            }}>
            <ImgMask random={getRandomArbitrary(0, 1.5)} />
            <TextDiv>{value}</TextDiv>
            <Img imgSrc={getImgSrc(value)} />
          </CellDiv >

          )
        })
        }
        {(this.props.text !== '' || this.props.listDisplay === false) && <Redirect to={'/search'} />}
      </ListDiv >
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
    handleInput: text => dispatch(handleInput(text))
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ListGrid);
