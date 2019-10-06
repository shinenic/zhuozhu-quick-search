import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTopCard, handleInput, search, addHistory, setTopCardDefault } from '../actions';
import { Title, SearchImg, TextInput, TopCardDiv, CrossImg, MenuImg, StyledLink } from '../styles/TopCardStyled';

class TopCard extends Component {
  switchIcon() {
    if (this.props.textboxState === "CLOSE") {
      this.props.setTopCard('textboxState', 'OPEN');
      // this.props.setTopCard('searchIconState', 'SEARCH');
    }
    // else if (this.props.searchIconState === "CLOSE") {
    //   this.props.setTopCard('searchIconState', 'SEARCH');
    // }
    this.props.handleInput('');
    setTimeout(() => this.inputRef.focus(), 500);
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

        <StyledLink to={'/search'}>
          <SearchImg
            onClick={() => { this.switchIcon(); this.props.setTopCard('listDisplay', false) }}
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


