import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api";

// initialState
const initialState = {
    list: [
        {
            roomName: 1,
            roomNum: 2,
            playerCnt: 1,
            observeCnt: 4,
            state: ""
        },
    ],

    roomInfo: {
        roomNum: "",
        playerCnt: 2,
        observeCnt: 4
    },

    userInfo: {
        id: 1,
        'nickname': '',
        score: [
            { win: 0 },
            { lose: 0 }
        ],
        point: 0,
    },
    blackObserverList: [],
    whiteObserverList: [],
    blackPlayer: {},
    whitePlayer: {},
}

// actions
const GET_ROOM = "GET_ROOM";
const GET_ROOM_INFO = "GET_ROOM_INFO";
const JOIN_ROOM = "JOIN_ROOM";
const GET_WAITING = "GET_WAITING";
const GAME_START = "GAME_START";
const SET_WAIT_USER = "SET_WAIT_USER";
const CHANGE_TO_OBSERVER = "CHANGE_TO_OBSERVER";
const CHANGE_TO_PLAYER = "CHANGE_TO_PLAYER";
const RESET_STATE_USER = "RESET_STATE_USER";
const QUICK_START_P="QUICK_START_P";



// action creators
const getRoomList = createAction(GET_ROOM, (roomList) => ({ roomList }));
const getRoomInfo = createAction(GET_ROOM_INFO, (roomInfo) => ({ roomInfo }));
const joinRoom = createAction(JOIN_ROOM, (userInfo) => ({ userInfo }));
const setWaitUser = createAction(SET_WAIT_USER, (users) => ({ users }));
const changeToObserver = createAction(CHANGE_TO_OBSERVER, (user) => ({ user }));
const changeToPlayer = createAction(CHANGE_TO_PLAYER, (user) => ({ user }));
const resetStateUser = createAction(RESET_STATE_USER, (user) => ({ user }));


// middleware actions
const getRoomListDB = () => {
    return async function (dispatch, getState, { history }) {
        await api.get("/lobby")
            .then(function (response) {
                // console.log(response.data);
                dispatch(getRoomList(response.data));
            })
    }
};
const getRoomInfoDB = (roomNum) => {
    return async function (dispatch, getState, { history }) {
        console.log("roomNum", roomNum);
        await api.get(`/lobby/joinroom/${roomNum}`)
            .then(function (response) {
                // console.log(response.data);
                dispatch(getRoomInfo(response.data));
            })
    }
};



const addRoomDB = (roomName) => {
    return async function (dispatch, useState, { history }) {
        const userId = localStorage.getItem('userId');
        await api.post("/lobby/create",
            {
                roomName: roomName,
                id: userId
            }

        )
            .then(function (response) {
                console.log("안녕 나는 미들웨어 add", response.data)
                dispatch(joinRoom(response.data.userInfo))
                history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
                // window.alert("방생성 실패!");
                console.log(error)
            });
    }
};

const joinRoomDB = (room) => {
    return async function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        await api.post("/lobby/joinroom", room)
            .then(function (response) {
                console.log("안녕 나는 미들웨어 join", response)
                dispatch(joinRoom(response.data));
                history.push(`/waiting/${room.roomNum}`)
            }).catch(error => {
                // window.alert("방참가 실패!");
                console.log(error)
            });
    }
};


const gameStartDB = (blackPlayer, whitePlayer, blackObserverList, whiteObserverList, roomNum) => {
    return async function (dispatch, getState, { history }) {
        console.log(blackPlayer, whitePlayer, blackObserverList, whiteObserverList)
        await api.post(`/game/create`, {
            blackTeamPlayer: blackPlayer.id,
            whiteTeamPlayer: whitePlayer.id,
            blackTeamObserver: blackObserverList,
            whiteTeamObserver: whiteObserverList,
            roomNum: roomNum,
        })
            .then((res) => {
                console.log(res);
                console.log(roomNum);
                history.push(`/game/${roomNum}`)
            })
    }
};
const quickStartPlayer = (id) => {
    return async function (dispatch, getState, { history }) {
        console.log("id", id);
        await api.get(`/lobby/fastPlayer/${id}`)
            .then(function (response) {
               console.log("response",response.data.roomNum);
               history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
               
                console.log(error)
            });
    }
};
const quickStartObserver = (id) => {
    return async function (dispatch, getState, { history }) {
        console.log("id", id);
        await api.get(`/lobby/fastPlayer/${id}`)
            .then(function (response) {
               console.log("response",response.data.roomNum);
               history.push(`/waiting/${response.data.roomNum}`)
            }).catch(error => {
               
                console.log(error)
            });
    }
};



//reducer
export default handleActions({
    [GET_ROOM]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.roomList
        // console.log("action.payload.roomList", action.payload.roomList)
    }),
    [GET_ROOM_INFO]: (state, action) => produce(state, (draft) => {
        draft.roomInfo = action.payload.roomInfo
        console.log("action.payload.roomInfo", action.payload.roomInfo)
    }),
    [JOIN_ROOM]: (state, action) => produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
        console.log("방입장 action.payload.userInfo", action.payload.userInfo)
    }),
    [SET_WAIT_USER]: (state, action) => produce(state, (draft) => {
        console.log("리듀서까지 왔습니다", action.payload.users)
        if (action.payload.user?.state === "blackPlayer") {
            draft.blackPlayer = action.payload.users[0];
        } else if (action.payload.user?.state === "whitePlayer") {
            draft.whitePlayer = action.payload.users[1];
        } else if (action.payload.user?.state === "blackObserver") {
            draft.blackObserverList = action.payload.users[2];
        } else {
            draft.whiteObserverList = action.payload.users[3];
        }

    }),
    [CHANGE_TO_OBSERVER]: (state, action) => produce(state, (draft) => {
        if (action.payload.user.state === "blackPlayer") {
            draft.userInfo = { ...draft.userInfo, state: "blackObserver" }
            draft.blackObserverList.push(action.payload.user);
            const filter_list = draft.whiteObserverList.filter((l) => l.id !== action.payload.user.id);
            draft.whiteObserverList = filter_list;
        } else if (action.payload.user.state === "whitePlayer") {
            draft.userInfo = { ...draft.userInfo, state: "whiteObserver" }
            draft.whiteObserverList.push(action.payload.user);
            const filter_list = draft.blackObserverList.filter((l) => l.id !== action.payload.user.id);
            draft.blackObserverList = filter_list;
        }
    }),
    [CHANGE_TO_PLAYER]: (state, action) => produce(state, (draft) => {
        if (action.payload.user.state === "blackObserver") {
            draft.userInfo = { ...draft.userInfo, state: "blackPlayer" };
            const filter_list = draft.blackObserverList.filter((l) => l.id !== action.payload.user.id);
            draft.blackObserverList = filter_list;
        } else {
            draft.userInfo = { ...draft.userInfo, state: "whitePlayer" }
            const filter_list = draft.whiteObserverList.filter((l) => l.id !== action.payload.user.id);
            draft.blackObserverList = filter_list;
        }
    }),
    [RESET_STATE_USER]: (state, action) => produce(state, (draft) => {
        draft.blackObserverList = [];
        draft.whiteObserverList = [];
        draft.blackPlayer = {};
        draft.whitePlayer = {};
    }),
},
    initialState
);

const actionCreators = {
    getRoomListDB,
    getRoomInfoDB,
    addRoomDB,
    joinRoomDB,
    gameStartDB,
    setWaitUser,
    changeToObserver,
    changeToPlayer,
    resetStateUser,
    quickStartPlayer,
    quickStartObserver
}

export { actionCreators };