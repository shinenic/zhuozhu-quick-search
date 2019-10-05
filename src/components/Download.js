import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import dateFormat from '../data/date_format';

const showText = keyframes`
  0%{
  opacity:0;
  margin-top:-15px;
    }
  100%{
  opacity:1;
  margin-top:0;
  }
`;

const DownloadDiv = styled.div`
  position:absolute;
  left:0;
  top:0;
  padding-top:110px;
  width:100vw;
`;

const DivLeft = styled.div`
  opacity:0;
  float:left;
  width:40vw;
  text-align:right;
  font-size:16px;
  line-height:40px;
  color:white;
  animation:${showText} 1s 1 both 0.7s;
`;
const DivRight = styled(DivLeft)`
  color:#9DD7FF;
  width:50vw;
  text-align:center;
  animation:${showText} 1s 1 both 0.7s;
`;
const DivTop = styled(DivRight)`
  width:100vw;
  text-align:center;
  font-size:20px;
  line-height:80px;
  animation:${showText} 1s 1 both 0.3s;
`;
const DivError = styled(DivTop)`
  box-sizing:border-box;
  padding:0 10vw 0 10vw;
  color:white;
  text-align:left;
  font-size:16px;
  line-height:30px;
  animation:${showText} 1s 1 both 0.7s;
  a{
    color:white;
  }
`;
class Download extends PureComponent {
  render() {
    return (
      <DownloadDiv>
        {this.props.newestData !== null && !this.props.isFetchingNewest
          ? <div>
            <DivTop>資料新增成功</DivTop>
            <DivLeft>資料更新時間：<br />最新集數：<br />總樂譜數目：<br /></DivLeft>
            <DivRight>{dateFormat(this.props.newestData["date"], "yyyy/MM/dd hh:mm")}<br />{this.props.newestData["newest"]}<br />{this.props.newestData["arrayData"].length}<br /></DivRight>
          </div>
          : <DivTop></DivTop>
        }
        {this.props.error !== null && !this.props.isFetchingNewest && this.props.error !== 200
          ? <div>
            <DivTop>資料新增失敗</DivTop>
            <DivError>錯誤資訊: "{this.props.error}"，請重新檢查網路連線狀況並重新點擊下載，若仍有問題請<a href="mailto: galadiya41@gmail.com">聯絡我</a></DivError>
          </div>
          : <DivTop></DivTop>
        }
      </DownloadDiv>
    )
  }
}

const mapStatetoProps = state => {
  return {
    newestData: state.newestData,
    error: state.error,
    isFetchingNewest: state.isFetchingNewest
  }
}
export default connect(mapStatetoProps)(Download);
