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
  if (mode === 'MOBILE') {
    row = 20
    for (let cycle = 0; cycle <= 27; cycle += 9) {
      areas += `'s${cycle + 0} s${cycle + 1} s${cycle + 2}''s${cycle + 3} s${cycle + 3} s${cycle + 4}''s${cycle + 3} s${cycle + 3} s${cycle + 5}''s${cycle + 6} s${cycle + 7} s${cycle + 7}''s${cycle + 8} s${cycle + 7} s${cycle + 7}'`
    }
  } else if (mode === 'DESKTOP') {
    row = 8
    for (let cycle = 0; cycle <= 18; cycle += 18) {
      areas += `'s${cycle + 0} s${cycle + 0} s${cycle + 1} s${cycle + 2} s${cycle + 3} s${cycle + 4}'
      's${cycle + 0} s${cycle + 0} s${cycle + 5} s${cycle + 6} s${cycle + 6} s${cycle + 7}'
      's${cycle + 8} s${cycle + 9} s${cycle + 10} s${cycle + 6} s${cycle + 6} s${cycle + 11}'
      's${cycle + 12} s${cycle + 13} s${cycle + 14} s${cycle + 15} s${cycle + 16} s${cycle + 17}'`
    }
  }
  return {areas,row};
}

const artistArr = ['蔡依林', '莫文蔚', '王力宏', '張學友', '張信哲', '林憶蓮'
  , '五月天', '張惠妹', '辛曉琪', '周杰倫', '林志炫', '林俊傑', '江蕙', '梁靜茹'
  , '許美靜', '許茹芸', '陳昇', '王菲', '蔡依林', '莫文蔚', '王力宏', '張學友', '張信哲', '林憶蓮'
  , '五月天', '張惠妹', '辛曉琪', '周杰倫', '林志炫', '林俊傑', '江蕙', '梁靜茹'
  , '許美靜', '許茹芸', '陳昇', '王菲']

const ListDiv = styled.div`
  margin-top:200px;
  /* padding:6px; */
  box-sizing:border-box;
  width:100vw;
  display:grid;

  grid-template-columns:repeat(3, calc(33.33vw - 8px));
  grid-template-rows:repeat(${gridLayout('MOBILE').row}, calc(33.33vw - 8px));
  /* grid-gap:6px; */
  grid-template-areas:${gridLayout('MOBILE').areas};

  @media (min-width: 500px) {
    grid-template-columns:repeat(3, calc(16.66vw));
    grid-template-rows:repeat(${gridLayout('DESKTOP').row}, calc(16.66vw));
    grid-template-areas:${gridLayout('DESKTOP').areas};
  }
`;
const CellDiv = styled.div`
  grid-area:${props => 's' + props.index};
  background-color:#333;
  box-sizing:border-box;
  width:100%;
  height:100%;
`;
const ImgDiv = styled.div`
  width:100%;
  height:100%;  
  background-color: orange;
  filter: grayscale(1);
`;

const Img = styled.img`
  content:url(${props => props.imgSrc});
  max-width:100%;
  max-height:100%;
`

const DivTest = styled.div`
  width:100%;
  height:100%;  
  box-sizing:border-box;
  background-color:blue;
`;

class ListGrid extends PureComponent {
  render() {
    return (
      <ListDiv>
        {artistArr.map((value, index) => {
          return (<CellDiv
            key={index} index={index}>
            {/* <ImgMask random={getRandomArbitrary(0, 1.5)} />
                <TextDiv>{value}</TextDiv> */}
            {/* <ImgDiv img={getImgSrc(value)} /> */}
            <Img imgSrc={getImgSrc(value)} />
            {/* <DivTest/> */}
            {/* {index} */}
          </CellDiv >

          )
        })
        }
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
