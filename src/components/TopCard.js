import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopCard, handleInput, search, addHistory, setTopCardDefault } from '../actions';
import { Title, SearchImg, TextInput, TopCardDiv, MenuImg, StyledLink } from '../styles/TopCardStyled';

class TopCard extends Component {
  switchIcon() {
    if (this.props.textboxState === "CLOSE") {
      this.props.setTopCard('textboxState', 'OPEN');
      this.props.setTopCard('listDisplay', false);
      setTimeout(() => this.inputRef.focus(), 100);
    } else {
      this.inputRef.focus();
    }
    this.props.handleInput('');
  }

  render() {
    return (
      <TopCardDiv
        expand={this.props.topCardState === 'MAX' || this.props.topCardState === 'UP'}>

        <StyledLink to={'/'}
          onClick={() => {
            this.props.setTopCard('listDisplay', true)
            this.props.setTopCardDefault()
            this.props.handleInput('')
          }}>
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

        <StyledLink to={this.props.text === '' && this.props.textboxState ==='OPEN' ? '/' : '/search'}>
          <SearchImg
            onClick={() => {
              if (this.props.text !== '' || this.props.textboxState ==='CLOSE') {
                this.switchIcon();
              } else {
                this.props.setTopCard('listDisplay', true)
                this.props.setTopCardDefault()
              }
            }}
            textboxState={this.props.textboxState} />
        </StyledLink>

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
    setTopCardDefault: () => dispatch(setTopCardDefault())
  }
}
const mapStatetoProps = state => {
  return {
    topCardState: state.topCardState,
    textboxState: state.textboxState,
    text: state.text,
    searchIconState: state.searchIconState,
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(TopCard)


