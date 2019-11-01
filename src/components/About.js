import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';

const AboutDiv = styled.div`
  position:absolute;
  left:0;
  top:0;
  padding-top:40px;
  width:100vw;
  overflow:hidden;
  white-space: pre-line;
  box-sizing: border-box;
  @media (min-width: 500px) {
    left:250px;
    width:calc(100vw - 250px);
  }
`;
const Title = styled.div`
  box-sizing:border-box;
  padding-left:2.5vw;
  width:100%;
  color:white;
  font-size:23px;
  font-weight:bold;
  margin:70px 0 30px 0; 
  
  @media (min-width: 500px) {
    padding-left:50px;
  }
`;
const Title2 = styled(Title)`
  box-sizing:border-box;
  margin:70px 0 0 0;  
`;
const InfoDiv = styled.div`
  box-sizing: border-box;
  width:100vw;
  padding:3vw 0 0 5vw;
`;
const SubTitle = styled.span`
    color:white;
    font-size:21px;
    font-weight:bold;
    line-height:60px;
`;
const Content = styled.span`
    margin-left:10px;
    color:#9DD7FF;
    font-size:15px;
    line-height:37px;
    a{
        color:#9DD7FF;
    }
`;
const Bottom = styled.div`
    width:100vw;
    height:15vw;
    margin:30vw 0 0 0;
    color:white;
    line-height:15vw;
    font-size:13px;
    text-align:center;
    background:#444;

    @media (min-width: 500px) {
      width:100%;
      height:50px;
      line-height:50px;
      margin:100px 0 0 0;
  }
`;



class About extends PureComponent {
  render() {
    return (
      <AboutDiv>
        <Title2>關於作者：</Title2>
        <InfoDiv>
          <SubTitle>Kadenz Wei<br /></SubTitle>
          <Content>Piano arranger/performer<br /></Content>
          <Content>Classic, Jazz, Pop music<br /></Content>
          <Content>Live in Taiwan Taipei city<br /></Content>
        </InfoDiv>
        <Title2>網頁介紹：</Title2>
        <InfoDiv>
          <SubTitle>搜尋畫面<br /></SubTitle>
          <Content>輸入可直接搜尋 歌名/歌手/冊數/頁碼<br /></Content>
          <Content>預設資料為1至104冊之範圍<br /></Content>
          <Content>連續點3次歌名可連結至Youtube搜尋<br /></Content>
          <Content>連續點3次演唱者可搜尋演唱者之所有曲目<br /><br /></Content>
          <SubTitle>歌手名單畫面<br /></SubTitle>
          <Content>連點2次演唱者可搜尋演唱者之所有曲目<br /><br /></Content>
          <SubTitle>歷史紀錄<br /></SubTitle>
          <Content>可查詢搜尋的所有紀錄和時間<br /></Content>
          <Content>(重新整理後重新計算)<br /><br /></Content>
          <SubTitle>最新資料<br /></SubTitle>
          <Content>資料來源:<br /></Content>
          <Content>&nbsp;&nbsp;<a style={{ fontSize: '13px' }} href="mailto: http://www.musicbook.com.tw/searchsong/">http://www.musicbook.com.tw/searchsong/</a><br /></Content>
          <Content>如資料有誤或任何建議請不吝指教<a href="mailto: galadiya41@gmail.com">聯絡我</a><br /><br /></Content>
        </InfoDiv>

        <Title2>更新日誌：</Title2>
        <InfoDiv>
          <SubTitle>2019/05/15<br /></SubTitle>
          <Content>- 新增連結至youtube搜尋之功能<br /></Content>
          <SubTitle>2019/05/26<br /></SubTitle>
          <Content>- 新增封面圖片<br /></Content>
          <SubTitle>2019/06/01<br /></SubTitle>
          <Content>- 新增英文老歌資料<br /></Content>
          <Content>- 增強搜尋效能<br /></Content>
          <SubTitle>2019/06/24<br /></SubTitle>
          <Content>- 修正英文歌曲搜尋的bug<br /></Content>
          <Content>- 增強網頁載入速度<br /></Content>
        </InfoDiv>
        <Bottom>&copy; Copyright {new Date().getFullYear()} Zhuo-Zhu-Search. All Rights Reserved</Bottom>
      </AboutDiv>
    )
  }
}

export default connect()(About);
