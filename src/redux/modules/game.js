import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import api from "../../api/api";

// initialState
const initialState = {
   
}

// actions
const GETGAME = "GETGAME";
const GAMEEND = "GAMEEND";

// action creators
const getGame = createAction(GETGAME , (gameInfo) => ({gameInfo}));


// middleware actions
const getGameDB = (gameNum) =>{
    return async function ( dispatch, getState, { history }){
        await api.get( `/game/start/${gameNum}`)
        .then(function(response){
            console.log("낙지전골",response.data.gameInfo);
            dispatch(getGame(response.data.gameInfo));
        })
    }
};
const gameResultDB= (result)=>{
    return async function (dispatch, useState, { history }) {
        // const token = localStorage.getItem('token');
        await api.post("/gameFinish", result)
            .then(function (response) {
                console.log("안녕 나는 미들웨어 result야", response.data)
                history.push(`/game/result/${result.gameNum}`)
            }).catch(error => {
                // window.alert("방참가 실패!");
                console.log(error)
            });
    }
};

const gameOutDB=(gameNum )=>{
    return async function (dispatch, getState, { history }) {
        console.log("gameNum", gameNum);
        await api.delete(`/game/delete${gameNum}`)
            .then(function (response) {
                console.log(response);
                history.push("/main");
            })
    }
};

//reducer
export default handleActions({
    [GETGAME]: (state, action) => produce(state, (draft) => {
        draft.gameInfo = action.payload.gameInfo
        console.log("action.payload.gameInfo", action.payload.gameInfo)
    }),
    
    
    
},
    initialState
);

const actionCreators = {
    getGameDB,
    gameOutDB,
    gameResultDB
    
}

export { actionCreators };