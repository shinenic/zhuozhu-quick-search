export const handleInput = (text) => {
    return {
        type: 'HANDLE_INPUT',
        text,
    }
}

export const search = text => {
    return {
        type: 'SEARCH',
        text
    }
}

export const addHistory = text => {
    return {
        type: 'ADD_HISTORY',
        text,
        date: Date.now(),
    }
}

export const changePic = text => {
    return {
        type: 'CHANGE_PIC',
        text
    }
}

export const setTopCard = (element, state) => {
    return {
        type: 'SET_TOPCARD',
        element,
        state
    }
}

export const updateWindowSize = () => {
    return {
        type: 'UPDATE_WINDOW_SIZE',
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    }
}

export const updateScrollTop = scrollTop => {
    return {
        type: 'UPDATE_SCROLL_TOP',
        scrollTop
    }
}

export const zhSwitchChange = checked => {
    return {
        type: 'ZH_SWITCH_CHANGE',
        checked
    }
}

export const engSwitchChange = checked => {
    return {
        type: 'ENG_SWITCH_CHANGE',
        checked
    }
}

export const setTopCardDefault = checked => {
    return {
        type: 'SET_TOPCARD_DEFAULT',
        checked
    }
}

/* 擷取最新資料之四個actions */
export const beginFetchData = () => {
    return {
        type: "BEGIN_FETCH_DATA",
        isFetchingNewest: true
    };
};

export const finishFetchData = error => {
    return {
        type: "FINISH_FETCH_DATA",
        isFetchingNewest: false,
        error
    };
};

export const recvFetchDataResult = data => {
    return {
        type: "RECV_FETCH_DATA_RESULT",
        data
    };
};


export const fetchDataFromServer = () => {
    // 回傳函式，使redux-thunk middleware可以處理
    return (dispatch, getState) => {
        // 通知使用者應用程式正在擷取後端資料，呈現載入中狀態
        // 直接呼叫寫好的同步action creator建立action
        // 非同步Action開始逐一拆解成同步Action
        dispatch(beginFetchData());  

        const API_URL = 'https://sheltered-brushlands-78140.herokuapp.com/list';

        fetch(API_URL, { mode: 'cors' })
            // 收到後端資料API結果
            .then(response => {
                if (response.ok !== true) {
                    switch (response.status) {
                        case 401:
                            return dispatch(finishFetchData(401));
                        case 404:
                            return dispatch(finishFetchData(404));
                        case 500:
                            return dispatch(finishFetchData(500));
                        default:
                            return dispatch(finishFetchData(response.status));
                    }
                } else {
                    response.json().then(data => {
                        dispatch(recvFetchDataResult(data));
                        dispatch(finishFetchData(200));
                    });
                }
            })
            .catch(error => {
                console.log('error', error);
                dispatch(finishFetchData("Failed to fetch"));
            });
    };
};
