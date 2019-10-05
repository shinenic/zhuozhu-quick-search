import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import dateFormat from '../data/date_format';
import { setTopCard } from '../actions';

const showText = keyframes`
  0%{
  opacity:0;
  margin-top:-20px;
    }
  100%{
  opacity:1;
  margin-top:0;
  }
`

const HistoryDiv = styled.div`
  position:relative;
  left:0;
  top:0;
  color:white;
  padding-top:180px;
  box-sizing: border-box;
  min-height:100vh;
  width:100vw;
  overflow:hidden;
  white-space: pre-line;
`;
const DateDiv = styled.div`
  width:70vw;
  display: inline-block;
  text-align:center;
`;
const ContentDiv = styled(DateDiv)`
  width:30vw;
  text-align:left;
`;
const CellDiv = styled.div`
  margin-bottom:25px;
  animation:${showText} 0.4s 1 both ${props => props.delay}s;
`;
const CenterDiv = styled(DateDiv)`
  width:100vw;
  animation:${showText} 0.7s 1 both;
`;
const Option = styled.div`
  user-select: none;
  height:35px;
  box-sizing: border-box;
  padding-left:5px;
  padding-right:5px;
  font-size:20px;
  line-height:35px;
  display:inline-block;
  background:${props => props.active ? '#518BB3' : '#013B63'};
  color:${props => props.active ? 'white' : '#999'};
`;
const OptionBox = styled.div`
  /* border:2px solid #013B63; */
  position:absolute;
  left:50%;
  top:100px;
  height:35px;
  transform: translateX(-50%);
`;

class History extends PureComponent {
  render() {
    return (
      <HistoryDiv>

        {this.props.history.length === 0
          ? <CenterDiv>
            目前沒有任何搜尋紀錄
          </CenterDiv>
          :
          <div>
            <OptionBox>
              <Option active={this.props.historyMode === 'SIMPLE'} onClick={() => this.props.historyMode === 'SIMPLE' && this.props.setTopCard('historyMode', 'DETAIL')}>
                詳細清單
              </Option>
              <Option active={this.props.historyMode === 'DETAIL'} onClick={() => this.props.historyMode === 'DETAIL' && this.props.setTopCard('historyMode', 'SIMPLE')}>
                簡易模式
              </Option>
            </OptionBox>
            {this.props.historyMode === 'DETAIL'
              ? this.props.history.map((value, index) => {
                return (
                  <CellDiv key={`history-${index}`} delay={index * 0.07}>
                    <DateDiv>{dateFormat(value.date, "yyyy-MM-dd hh:mm:ss")}</DateDiv>
                    <ContentDiv>{value.content}</ContentDiv>
                  </CellDiv>)
              })
              : <CenterDiv>
                {this.props.history.map((value,index)=>{
                  return (`${value.content}${index!==this.props.history.length-1?`,   `:``}`);
                })}
              </CenterDiv>}
          </div>
        }
      </HistoryDiv>
    )
  }
}

const mapStatetoProps = state => {
  return {
    history: state.history,
    historyMode: state.historyMode
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setTopCard: (element, state) => dispatch(setTopCard(element, state)),
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(History);
