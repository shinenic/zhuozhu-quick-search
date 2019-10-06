import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import { updateScrollTop, search, addHistory, setTopCard, handleInput } from '../actions';
import { Grid } from 'react-virtualized';

const ResultCardDiv = styled.div`
  background:rgba(0,0,0,0);
  position:absolute;
  left:0;
  top:0;
  padding:0;
  overflow:hidden;
  white-space: pre-line;
  @media (min-width: 500px) {
    left:250px;
  }
`;
const gridStyle = {
    outline: 'none',
}
const showText = keyframes`
  0%{
  opacity:0;
  margin-top:-10px;
    }
  100%{
  opacity:1;
  margin-top:0;
  }
`;
const CellDiv = styled.div`
    animation: ${showText} 0.5s 1 both;
    /*搜尋時的小動畫*/
`;


class ResultCard extends PureComponent {
    constructor() {
        super();
        this._getColumnWidth = this._getColumnWidth.bind(this);
        this._getRowHeight = this._getRowHeight.bind(this);
        this._cellRenderer = this._cellRenderer.bind(this);
        this._onScroll = this._onScroll.bind(this);
    }
    render() {
        const list = this.props.searchResult;
        return (
            <ResultCardDiv>
                <Grid
                    cellRenderer={this._cellRenderer}
                    columnCount={list.length !== 0 ? list[0].length : 0}
                    columnWidth={this._getColumnWidth}
                    height={this.props.windowHeight}
                    width={this.props.windowWidth<500?this.props.windowWidth:this.props.windowWidth-250}
                    rowCount={list.length + 1}
                    rowHeight={this._getRowHeight}
                    style={gridStyle}
                    scrollToRow={0}
                    onScroll={this._onScroll}
                />
            </ResultCardDiv >
        )

    }
    _onScroll({ scrollTop }) {
        this.props.updateScrollTop(scrollTop)
    }
    _cellRenderer({ columnIndex, key, rowIndex, style }) {
        let content = rowIndex === 0 ? '___' : this.props.searchResult[rowIndex - 1][columnIndex]

        let customStyle = Object.assign({}, style, {
            color: '#ADE7FF',
            display: 'table',
            fontSize: 17,
        });
        let innerDivStyle = {
            display: 'table-cell',
            verticalAlign: 'middle',
            WebkitTapHighlightColor: 'transparent',
            cursor: 'pointer'
        }
        switch (columnIndex) {
            case 0:
                Object.assign(customStyle, {
                    color: '#FFF',
                    textAlign: 'left',
                    fontSize: 19,
                    fontWeight: 'bold',
                    paddingLeft: 15
                });
                break;
            case 1:
                content = content.replace(/\//g, "\n");
                Object.assign(customStyle, {
                    textAlign: 'center',
                    fontSize: 19,
                });
                break;
            case 2:
                Object.assign(customStyle, {
                    textAlign: 'right',
                    paddingRight: 15,
                    fontSize: 21,
                });
                break;
            default:
                break;
        }
        return (
            <CellDiv key={key} style={customStyle} delayTime={rowIndex*0.1}>
                <div style={innerDivStyle}
                    onClick={(e) => {
                        if (e.detail === 3) {
                            if (columnIndex === 1) {
                                let title = this.props.searchResult[rowIndex - 1][columnIndex]
                                this.props.search(title)
                                this.props.addHistory(title)
                                this.props.handleInput(title);
                                this.props.setTopCard('textboxState', 'OPEN');
                            }
                            if (columnIndex === 0) {
                                let check = window.confirm(`連結至Youtube搜尋 "${content}" `);
                                if (check) {
                                    window.open(`https://www.youtube.com/results?search_query=${content}+${this.props.searchResult[rowIndex - 1][columnIndex + 1].replace(/\//g, " ")} `, '_blank').focus()
                                }
                            }
                        }
                    }}>
                    {content}
                </div>
            </CellDiv >
        )
    }
    _getRowHeight({ index }) {
        switch (index) {
            case 0:
                return 80;
            default:
                return 70;
        }
    }
    _getColumnWidth({ index }) {
        const width = this.props.windowWidth<500?this.props.windowWidth:this.props.windowWidth-250;
        switch (index) {
            case 0:
                return width * 0.49;
            case 1:
                return width * 0.29;
            case 2:
                return width * 0.19;
            default:
                return 50;
        }
    }
}

const mapStatetoProps = state => {
    return {
        searchResult: state.searchResult,
        topCardHeight: state.topCardHeight,
        windowHeight: state.windowHeight,
        windowWidth: state.windowWidth,
        onScroll: state.onScroll,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateScrollTop: scrollTop => dispatch(updateScrollTop(scrollTop)),
        search: text => dispatch(search(text)),
        addHistory: text => dispatch(addHistory(text)),
        setTopCard: (element, state) => dispatch(setTopCard(element, state)),
        handleInput: text => dispatch(handleInput(text))
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ResultCard);
