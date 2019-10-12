import matchSorter from 'match-sorter';
import dataArray from '../data/dataArray';
import oldiesDataArray from '../data/oldiesDataArray';
import engOldiesDataArray from '../data/engOldiesDataArray';

const initState = {
  text: '',
  topCardHeight: 0,
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
  isFetchingNewest: false,
  error: null,
  zhSwitchChecked: true,
  engSwitchChecked: true,
  listDisplay: true,
  historyMode: 'DETAIL',
  /* 處理網頁捲動&目錄的動畫state */
  scrollTop: 0,
  milestone: 0,
  topCardState: 'UP',
  menuState: 'INIT',
  textboxState: 'CLOSE',
  searchIconState: '',
  titlePic: 0,
  /* 網頁資料之state */
  newestData: null,
  liuXingData: dataArray,
  searchSource: [...oldiesDataArray, ...engOldiesDataArray, ...dataArray],
  history: [],
  searchResult: []
}

const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/;
const clearAllBlank = str => {
  str = str.replace(/\r\n/g, "")
  str = str.replace(/\n/g, "");
  str = str.replace(/\s/g, "");
  return str;
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_TOPCARD':
      let obj = {};
      obj[action.element.toString()] = action.state;
      return Object.assign({}, state, obj);
    case 'SWITCH_TEXTBOX':
      return Object.assign({}, state, {
        textboxState: !state.textboxState
      });
    case 'SET_TOPCARD_DEFAULT':
      return Object.assign({}, state, {
        text: '',
        topCardHeight: 0,
        scrollTop: 0,
        milestone: 0,
        topCardState: 'UP',
        menuState: 'CLOSE',
        textboxState: 'CLOSE',
        searchIconState: '',
        searchResult: []
      });
    case 'HANDLE_INPUT':
      return Object.assign({}, state, {
        text: action.text
      });
    case 'ADD_HISTORY':
      if (action.text !== "" && (state.history.length === 0 || action.text !== state.history[state.history.length - 1]['content'])) {
        let temp = { date: action.date, content: clearAllBlank(action.text) }
        const url = 'https://sheltered-brushlands-78140.herokuapp.com/addHistory';
        fetch(`${url}?content=${action.text}&date=${action.date}&collectionName=history`)
        return Object.assign({}, state, {
          history: [...state.history, temp]
        });
      }
      else
        return state;
    case 'SEARCH':
      if (!zhuyin.test(clearAllBlank(action.text).slice(-1))) {
        return Object.assign({}, state, {
          searchResult: clearAllBlank(action.text) === ''
            ? [] : matchSorter(state.searchSource, clearAllBlank(action.text))
        });
      }
      else
        return state;
    case 'UPDATE_WINDOW_SIZE':
      return Object.assign({}, state, {
        windowHeight: action.windowHeight,
        windowWidth: action.windowWidth
      });
    case 'UPDATE_SCROLL_TOP':
      let topCardState = state.topCardState;
      let milestone = state.milestone;
      const buffetSpace = 100;
      switch (topCardState) {
        case 'MAX':
          if (action.scrollTop > milestone) {
            topCardState = 'UP';
          }
          else {
            milestone = action.scrollTop;
          }
          break;
        case 'UP':
          if (action.scrollTop > milestone + buffetSpace) {
            topCardState = 'MIN';
            milestone = action.scrollTop;
          }
          break;
        case 'MIN':
          if (action.scrollTop < milestone) {
            topCardState = 'DOWN';
          }
          else {
            milestone = action.scrollTop;
          }
          break;
        case 'DOWN':
          if (action.scrollTop < milestone - buffetSpace) {
            topCardState = 'MAX';
            milestone = action.scrollTop;
          }
          break;
        default:
          break;
      }
      return Object.assign({}, state, {
        scrollTop: action.scrollTop,
        topCardState,
        milestone,
      });
    case 'ZH_SWITCH_CHANGE':
      let zh = action.checked ? oldiesDataArray : [];
      let eng = state.engSwitchChecked ? engOldiesDataArray : [];
      return Object.assign({}, state, {
        zhSwitchChecked: action.checked,
        text: '',
        searchResult: [],
        searchSource: [...zh, ...eng, ...state.liuXingData]
      });
    case 'ENG_SWITCH_CHANGE':
      let zh1 = state.zhSwitchChecked ? oldiesDataArray : [];
      let eng1 = action.checked ? engOldiesDataArray : [];
      return Object.assign({}, state, {
        engSwitchChecked: action.checked,
        text: '',
        searchResult: [],
        searchSource: [...zh1, ...eng1, ...state.liuXingData]
      });
    case 'CHANGE_PIC':
      return Object.assign({}, state, {
        titlePic: state.titlePic + 1
      });

    /* 擷取最新資料之四個actions */
    case 'BEGIN_FETCH_DATA':
      if (state.isFetchingNewest)
        return state;
      return Object.assign({}, state, { isFetchingNewest: true, error: null });
    case 'FINISH_FETCH_DATA':
      if (!state.isFetchingNewest)
        return state;
      return Object.assign({}, state
        , { isFetchingNewest: false, error: action.error });
    case 'RECV_FETCH_DATA_RESULT':
      let zh2 = state.zhSwitchChecked ? oldiesDataArray : [];
      let eng2 = state.engSwitchChecked ? engOldiesDataArray : [];
      if (!action.data || action.data.length === 0)
        return state;
      return Object.assign({}, state, {
        newestData: action.data,
        liuXingData: action.data['arrayData'],
        searchSource: [...zh2, ...eng2, ...action.data['arrayData']]
      });
    default:
      return state;
  }
}

export default rootReducer;