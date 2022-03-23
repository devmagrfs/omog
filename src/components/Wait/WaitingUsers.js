import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../redux/configureStore';
import Logo from '../../pictures/omokjomok.svg'

import { actionCreators as roomActions } from '../../redux/modules/room';

import WaitPlayerList from './WaitPlayerList';
import WaitObserverList from './WaitObserverList';
import GameStartBtn from './GameStartBtn';


function WaitingUsers({ socket, roomNum }) {
    console.log("대기방 유저 컴포넌트입니다. 몇 번 렌더링될까요?")
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId");
    const waitingPerson = useSelector((state) => state.room.userInfo);
    console.log(waitingPerson);


    useEffect(() => {
        // socket에 닉네임 보내기
        socket.emit("nickname", userId);
        console.log(userId, ": 닉네임을 보냈습니다.");

        // socket에 입장 정보 보내기
        if (waitingPerson.state === "blackPlayer" || waitingPerson.state === "whitePlayer") {
            socket.emit("enterRoomPlayer", roomNum, waitingPerson.state);
            console.log(`enterRoomBlackPlayer 입장, 방번호 : ${roomNum}, ${waitingPerson.state}`);
        } else {
            socket.emit("enterRoomObserver", roomNum, waitingPerson.state);
            console.log(`enterRoomWhiteObserver 입장, 방번호 : ${roomNum}, ${waitingPerson.state}`)
        }

        // 대기방 접속한 인원 정보 받기
        const welcome = (id, userInfos) => {
            console.log("welcome 실행완료", id, userInfos);
            dispatch(roomActions.setWaitUser(id, userInfos));
        }
        socket.on("welcome", welcome)

        // 사용자 팀 및 상태 변경
        const changeState = (id, userInfos) => {
            console.log("state 변경이 되나요?", id, userInfos);
            dispatch(roomActions.changeState(id, userInfos));
        }
        socket.on("changeComplete", changeState);

        // 방 나갈 때 방 남은 인원 정보 업데이트
        const byeChangeState = (nickname, userInfos) => {
            console.log("bye 정보", nickname, userInfos)
            dispatch(roomActions.changeState(nickname, userInfos));
        }
        socket.on("bye", byeChangeState)
        dispatch(roomActions.resetStateUser(userId));

        return () => {
            socket.off("changeComplete", changeState);
            socket.disconnect();
        }
    }, [])


    return (
        <>
            <div style={{ width: "7rem", height: "76px" }}>
                <img src={Logo} alt="로고" style={{ width: "100%", height: "100%", background: "#C4C4C4" }} />
            </div>
            <WaitPlayerList roomNum={roomNum} socket={socket} />
            <GameStartBtn socket={socket} roomNum={roomNum} />
            <WaitObserverList roomNum={roomNum} socket={socket} />
        </>
    );
}

export default React.memo(WaitingUsers);