import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import io from "socket.io-client";

import { Button } from '@material-ui/core';
import WaitingChatting from '../components/WaitingChatting';
import Text from '../elements/Text';
import { actionCreators as roomActions } from '../redux/modules/room';

const socket = io.connect("http://localhost:3001");


function Waiting(props) {
    const [blackPlayer, setBlackPlayer] = React.useState({});
    const [whitePlayer, setWhitePlayer] = React.useState({});

    const [blackObserverList, setBlackObserverList] = React.useState([]);
    const [whiteObserverList, setWhiteObserverList] = React.useState([]);


    // const userInfo = {
    //     roomNum: 123,
    //     userList: [{
    //         id: "아이디1",
    //         score: 150,
    //         point: 1000,
    //         state: "player",
    //     },
    //     {
    //         id: "아이디2",
    //         score: 170,
    //         point: 1000,
    //         state: "player",
    //     },
    //     {
    //         id: "아이디3",
    //         score: 200,
    //         point: 1400,
    //         state: "observer",
    //     }],
    // }

    const id = "아이디1";
    const state = "Aplayer";
    const roomNum = "123";

    useEffect(() => {
        socket.on("connection", async () => {
            console.log("연결되었습니다.")
            socket.emit("nickname", id);
            socket.emit("enterRoomPlayer", roomNum, state);
            await socket.on("welcome", (id, userInfo) => {
                console.log("welcome 실행완료", id, userInfo)
                if (state === "Aplayer") {
                    setWhitePlayer(userInfo)
                } else if (state === "Bplayer") {
                    setBlackPlayer(userInfo)
                } else if (state === "AObserver") {
                    setWhiteObserverList([...whiteObserverList, userInfo])
                } else {
                    setBlackObserverList([...blackObserverList, userInfo])

                }
            });
        });
    }, [])

    return (
        <div className="main_container" style={{ display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
            <div className="container_left" style={{ padding: "20px" }}>
                <div className="player_container" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="white_player_box" style={{ textAlign: "center", width: "100%" }}>
                        {whitePlayer &&
                            <PlayerCard>
                                <Text>id</Text>
                                <Text>score</Text>
                                <Text>승률</Text>
                                {/* <PlayerThumbnail /> */}
                            </PlayerCard>
                        }
                    </div>
                    <div className="black_player_box" style={{ textAlign: "center", width: "100%", color: "white", backgroundColor: "black" }}>
                        {blackPlayer &&
                            <PlayerCard>
                                <Text>id</Text>
                                <Text>score</Text>
                                <Text>승률</Text>
                                {/* <PlayerThumbnail /> */}
                            </PlayerCard>
                        }
                    </div>
                </div>
                <div className="button_box" style={{ textAlign: "center" }}>
                    <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                </div>
                <div className="observer_container" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="white_observer_box" style={{ textAlign: "center" }}>
                        <ObserverCard></ObserverCard>
                        <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                    </div>
                    <div className="black_observer_box" style={{ textAlign: "center", backgroundColor: "black" }}>
                        <ObserverCard></ObserverCard>
                        <Button is_width="10px" is_border="1px solid pink">버튼</Button>
                    </div>
                </div>
            </div>
            <div className="container_right" style={{ padding: "20px" }}>
                <WaitingChatting />
            </div>
        </div>
    );
}

const PlayerCard = styled.div`
    width: 100%;
`

const PlayerThumbnail = styled.img`
    // width: 100%;
    width: 200px;
    height: 100px;
    position: relative;
    padding-top: 75%;

    img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 50%;
        border: 1px solid black;
        object-fit: cover;
    }
`

const ObserverCard = styled.div`
    width: 200px;
    height: 100%;
    border: 1px solid blue;
`

export default Waiting;