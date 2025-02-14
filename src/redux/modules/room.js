import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api";
import Swal from 'sweetalert2';
import * as Sentry from "@sentry/react";
// initialState
const initialState = {
  list: [
    {
      roomName: 1,
      roomNum: 2,
      playerCnt: 1,
      observeCnt: 4,
      state: "",
    },
  ],

  roomInfo: {
    roomNum: "",
    playerCnt: 2,
    observeCnt: 4,
  },

  userInfo: {
    id: 1,
    nickname: "",
    score: [{ win: 0 }, { lose: 0 }],
    point: 0,
    state: "",
  },

  blackObserverList: [],
  whiteObserverList: [],
  blackPlayer: {
    id: 1,
    nickname: "",
    score: [{ win: 0 }, { lose: 0 }],
    point: 0,
    state: "",
  },
  whitePlayer: {
    id: 1,
    nickname: "",
    score: [{ win: 0 }, { lose: 0 }],
    point: 0,
    state: "",
  },
  roomName: "",
};

// actions
const GET_ROOM = "GET_ROOM";
const GET_ROOM_INFO = "GET_ROOM_INFO";
const JOIN_ROOM = "JOIN_ROOM";
const SET_WAIT_USER = "SET_WAIT_USER";
const CHANGE_STATE = "CHANGE_STATE";
const RESET_STATE_USER = "RESET_STATE_USER";
const CHANGE_USERINFO = "CHANGE_USERINFO";

// action creators
const getRoomList = createAction(GET_ROOM, (roomList) => ({ roomList }));
const getRoomInfo = createAction(GET_ROOM_INFO, (roomInfo) => ({ roomInfo }));
const joinRoom = createAction(JOIN_ROOM, (userInfo) => ({ userInfo }));
const setWaitUser = createAction(SET_WAIT_USER, (id, users) => ({ id, users }));
const changeState = createAction(CHANGE_STATE, (id, users) => ({ id, users }));
const resetStateUser = createAction(RESET_STATE_USER, (user) => ({ user }));
const changeUserInfo = createAction(CHANGE_USERINFO, (id, someone, state) => ({
  id,
  someone,
  state,
}));

// middleware actions
const getRoomListDB = (id) => {
  return async function (dispatch, getState, { history }) {
    try{
      const res =await api.get(`/lobby`)
      dispatch(getRoomList(res.data));
    }
    catch(error){
      Sentry.captureException(error);
    }
  };
};
const getRoomInfoDB = (roomNum) => {
  return async function (dispatch, getState, { history }) {
    console.log("roomNum", roomNum);

    try{
        const res = await api.get(`/lobby/joinroom/${roomNum}`);
        dispatch(getRoomInfo(res.data));
    }
  catch(error) {
    Sentry.captureException(error);
  }
  };
};

const addRoomDB = (roomName, timer, color) => {
  return function (dispatch, useState, { history }) {
    const userId = sessionStorage.getItem("userId");
    api
      .post("/lobby/create", {
        roomName: roomName,
        id: userId,
        timer: timer,
        boardColor: color
      })
      .then(function (response) {
        console.log("안녕 나는 미들웨어 add", response.data);
        dispatch(joinRoom(response.data.userInfo));
        history.push(`/waiting/${response.data.roomNum}`);
      })
      .catch((error) => {
        Swal.fire({
          title: '방 생성 실패했어요!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        Sentry.captureException(error);
      });
  };
};

const joinRoomDB = (room) => {
  return function (dispatch, useState, { history }) {
    // const token = localStorage.getItem('token');
    api
      .post("/lobby/joinroom", room)
      .then(function (response) {
        console.log("안녕 나는 미들웨어 join", response);
        dispatch(joinRoom(response.data));
        history.push(`/waiting/${room.roomNum}`);
      })
      .catch((error) => {
        Swal.fire({
          title: '방 입장 실패했어요!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        Sentry.captureException(error);
      });
  };
};

const gameStartDB = (
  blackPlayer,
  whitePlayer,
  blackObserverList,
  whiteObserverList,
  roomNum
) => {
  return async function (dispatch, getState, { history }) {
    console.log(blackPlayer, whitePlayer, blackObserverList, whiteObserverList);
    try {
      const res = await api.post(`/game/create`, {
        blackTeamPlayer: blackPlayer?.id ? blackPlayer.id : null,
        whiteTeamPlayer: whitePlayer?.id ? whitePlayer.id : null,
        blackTeamObserver: blackObserverList,
        whiteTeamObserver: whiteObserverList,
        roomNum: roomNum,
      });
      console.log(res);
      console.log(roomNum);
      history.push(`/game/${roomNum}`);
    } catch (error) {

      Swal.fire({
        icon: 'warning',
        title: '게임 시작 실패',
        text: `${error}`,
      });
      Sentry.captureException(error);
    }
  };
};
const quickStartPlayer = (id) => {
  return function (dispatch, getState, { history }) {
    console.log("id", id);
    api
      .get(`/lobby/fastPlayer/${id}`)
      .then(function (response) {
        console.log("response", response.data);
        dispatch(joinRoom(response.data.userInfo));
        history.push(`/waiting/${response.data.roomNum}`);
      })
      .catch((error) => {
        Swal.fire({
          title: '방이 없습니다!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        Sentry.captureException(error);
      });
  };
};
const quickStartObserver = (id) => {
  return function (dispatch, getState, { history }) {
    console.log("id", id);
    api
      .get(`/lobby/fastObserver/${id}`)
      .then(function (response) {
        console.log("response", response.data);
        dispatch(joinRoom(response.data.userInfo));
        history.push(`/waiting/${response.data.roomNum}`);
      })
      .catch((error) => {
        Swal.fire({
          title: '방이 없습니다!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        Sentry.captureException(error);
      });
  };
};

const numJoinDB = (data) => {
  console.log(data);
  return function (dispatch, useState, { history }) {
    api
      .post("/lobby/roomNumJoin", data)
      .then(function (response) {
        console.log("안녕 나는 Numjoin", response.data.roomNum);
        dispatch(joinRoom(response.data.userInfo));
        history.push(`/waiting/${response.data.roomNum}`);
      })
      .catch((error) => {
        Sentry.captureException(error);
        Swal.fire({
          title: '방이 없습니다!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        console.log(error)
        
      });
  };
};

//reducer
export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.roomList;
        // console.log("action.payload.roomList", action.payload.roomList)
      }),
    [GET_ROOM_INFO]: (state, action) =>
      produce(state, (draft) => {
        draft.roomInfo = action.payload.roomInfo;
        console.log("action.payload.roomInfo", action.payload.roomInfo);
      }),
    [JOIN_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
        console.log("방입장 action.payload.userInfo", action.payload.userInfo);
      }),
    [SET_WAIT_USER]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서까지 왔습니다", action.payload.users[0]);
        draft.blackPlayer = action.payload.users[0].blackPlayerInfo[0];
        draft.whitePlayer = action.payload.users[0].whitePlayerInfo[0];
        draft.blackObserverList = [
          ...action.payload.users[0].blackTeamObserver,
        ];
        draft.whiteObserverList = [
          ...action.payload.users[0].whiteTeamObserver,
        ];
        draft.roomName = action.payload.users[0].roomName;
      }),
    [CHANGE_STATE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.id);
        console.log(action.payload.users);
        draft.blackPlayer = action.payload.users[0].blackPlayerInfo[0];
        draft.whitePlayer = action.payload.users[0].whitePlayerInfo[0];
        draft.blackObserverList = [
          ...action.payload.users[0].blackTeamObserver,
        ];
        draft.whiteObserverList = [
          ...action.payload.users[0].whiteTeamObserver,
        ];
      }),
    [RESET_STATE_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.blackObserverList = [];
        draft.whiteObserverList = [];
        draft.blackPlayer = {};
        draft.whitePlayer = {};
      }),
    [CHANGE_USERINFO]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.id, action.payload.someone);
        if (action.payload.id === action.payload.someone) {
          console.log("같으니까 변경!");
          draft.userInfo = { ...draft.userInfo, state: action.payload.state };
        }
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
  changeState,
  resetStateUser,
  quickStartPlayer,
  quickStartObserver,
  changeUserInfo,
  numJoinDB,
};

export { actionCreators };
