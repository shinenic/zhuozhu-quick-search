import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { search, addHistory, setTopCard } from '../actions';
import { Redirect } from 'react-router-dom';

const CellDiv = styled.div`
  box-sizing:border-box;
  border:5px solid black;
  /* color:white; */
  margin:0;
  float:left;
  width:33.33vw;
  height:33.33vw;
  position:relative;
`;
const TextDiv = styled.div`
  user-select: none;
  position:absolute;
  top:0;
  left:0;
  color:white;
  width:calc(33.33vw - 10px);
  height:calc(33.33vw - 10px);
  text-align:center;
  font-size:20px;
  line-height:40vw;
  z-index:6;
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
  background:#000;
  opacity:1;
  width:calc(33.33vw - 10px);
  height:calc(33.33vw - 10px);
  opacity:0.33;
  z-index:5;
  animation: 
    ${showImg} 
     1s 1 both ${props => props.random}s;
`;
const TextMask = styled.div`
  position:absolute;
  top:calc(20vw - 20px);
  left:0;
  width:calc(33.33vw - 10px);
  height:40px;
  opacity:0.4;
  background-color:black;
  z-index:5;
`;
const Img = styled.img`
  width:auto;
  height:auto;
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
    ${TextDiv}{
        width:calc(66.66vw - 10px);
        height:calc(66.66vw - 10px);
        line-height:106.66vw;
    }
    ${TextMask}{
        top:calc(53.33vw - 20px);
        width:calc(66.66vw - 10px);
    }
    ${ImgMask}{
        width:calc(66.66vw - 10px);
        height:calc(66.66vw - 10px);
    }
  }
  ${CellDiv}:nth-child(9){
    margin-top:-33.33vw;
  }
`;
const getImgSrc = name => {
    return require(`../image/artist/${name}.jpg`);
}
const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

class List extends PureComponent {
    render() {
        const artistArr = ['蔡依林', '莫文蔚', '王力宏', '張學友', '張信哲', '林憶蓮'
        , '五月天', '張惠妹', '辛曉琪', '周杰倫', '林志炫', '林俊傑', '江蕙', '梁靜茹'
        , '許美靜', '許茹芸', '陳昇', '王菲']
        return (
            <ListDiv>
                {artistArr.map((value, index) => {
                    return (
                        <CellDiv key={index}>
                            <ImgMask random={getRandomArbitrary(0, 1.5)} />
                            <TextMask />
                            <TextDiv onDoubleClick={() => {
                                this.props.search(value);
                                this.props.addHistory(value);
                                this.props.setTopCard('listDisplay', false);
                            }}>{value}</TextDiv>
                            <Img src={getImgSrc(value)} alt={value} />
                            {/* {value+index} */}
                        </CellDiv>
                    )
                })
                }
                {(this.props.text!==''||this.props.listDisplay===false) && <Redirect to={'/search'} />}
            </ListDiv>
        )
    }
}

const mapStatetoProps = state => {
    return {
        searchResult: state.searchResult,
        listDisplay: state.listDisplay,
        text:state.text
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
