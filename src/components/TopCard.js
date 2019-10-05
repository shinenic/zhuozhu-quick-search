import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopCard, handleInput, search, addHistory } from '../actions';
import { Title, SearchImg, TextInput, TopCardDiv, CrossImg, MenuImg, StyledLink } from '../styles/TopCardStyled';

class TopCard extends Component {
  switchIcon() {
    if (this.props.textboxState === "CLOSE") {
      this.props.setTopCard('textboxState', 'OPEN');
      this.props.setTopCard('searchIconState', 'SEARCH');
    }
    else if (this.props.searchIconState === "CLOSE") {
      this.props.setTopCard('searchIconState', 'SEARCH');
    }
    this.props.handleInput('');
    setTimeout(() => this.inputRef.focus(), 10);
  }
  render() {
    return (
      <TopCardDiv
        topCardState={this.props.topCardState}
        topCardFix={this.props.topCardFix}>
        <StyledLink to={'/'} onClick={() => {this.props.setTopCard('listDisplay', true);this.props.handleInput('');}}>
          <Title>卓著搜尋</Title>
        </StyledLink>
        <MenuImg onClick={() => this.props.setTopCard('menuState', 'OPEN')} />
        <TextInput type="text"
          onBlur={e => this.props.addHistory(e.target.value)}
          value={this.props.text}
          switch={this.props.textboxState}
          onChange={e => {
            this.props.handleInput(e.target.value);
            this.props.search(e.target.value);
            e.target.value === '' ? this.props.setTopCard('searchIconState', 'SEARCH') : this.props.setTopCard('searchIconState', 'CROSS');
          }}
          onFocus={() => { (this.props.topCardState === "MIN") && this.props.setTopCard('topCardState', 'MAX') }}
          ref={(ip) => this.inputRef = ip} />
        <StyledLink to={'/search'}>
          <SearchImg
            onClick={() => { this.switchIcon(); this.props.setTopCard('listDisplay', false) }}
            textboxState={this.props.textboxState}
            searchIconState={this.props.searchIconState}
            text={this.props.text}
            style={{ 'visibility': this.props.searchIconState === 'CROSS' && 'hidden' }} />
        </StyledLink>
        <CrossImg
          onClick={() => {
            this.props.setTopCard('searchIconState', 'SEARCH');
            this.props.handleInput('');
            this.inputRef.focus();
            this.props.addHistory(this.props.text)
          }}
          style={{ 'display': this.props.searchIconState !== 'CROSS' && 'none' }} />
      </TopCardDiv>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTopCard: (element, state) => dispatch(setTopCard(element, state)),
    handleInput: text => dispatch(handleInput(text)),
    search: text => dispatch(search(text)),
    addHistory: text => dispatch(addHistory(text)),
  }
}
const mapStatetoProps = state => {
  return {
    topCardFix: state.topCardFix,
    topCardState: state.topCardState,
    textboxState: state.textboxState,
    text: state.text,
    searchIconState: state.searchIconState,
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(TopCard)


