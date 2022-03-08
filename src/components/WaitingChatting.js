import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Text from '../elements/Text';

import ScrollToBottom from 'react-scroll-to-bottom';

function WaitingChatting(props) {
    const { roomNum, me } = props;
    const inputRef = useRef(null);
    const scrollRef = useRef();

    const id = "아이디1"


    const { socket, blackPlayer, whitePlayer, blackObserverList, whiteObserverList } = props;

    // const [currentMessage, setCurrentMessage] = useState("");
    // const [messageList, setMessageList] = useState([]);
    // const [userInformation, setUserInformation] = useState([]);

    const [inputMessage, setInputMessage] = useState({ nickname: '', chat: '' });
    const [chatMonitor, setChatMonitor] = useState([]);
    const [recentChat, setRecentChat] = useState('');

    const handleInput = (e) => {
        setInputMessage({
            ...inputMessage,
            nickname: id,
            chat: e.target.value,
        });
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            const chat = {
                nickname: id,
                chat: inputMessage.chat,
            };
            console.log("보내는 채팅", inputMessage.chat)
            socket.emit('chat', inputMessage.chat);
            setInputMessage({ ...inputMessage, chat: '' });
            inputRef.current.value = "";
        }
    };

    useEffect(() => {
        const receiveChat = async () => await socket.on("chat", (data) => {
            console.log("받아오는 채팅", data)
            setRecentChat(data);
            // setChatMonitor([...chatMonitor, recentChat])
        })

        receiveChat();
    }, []);

    useEffect(() => {
        const setChat = async () => {
            (await recentChat.chat?.length) > 0 && setChatMonitor([...chatMonitor, recentChat])
        }

        setChat().then(() => moveScrollToReceiveMessage())
        setRecentChat('');
    }, [recentChat]);

    const moveScrollToReceiveMessage = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    });


    const goodbyeChat = async () => {
        await socket.emit("bye", id);
    }

    return (
        <>
            <ChattingWindow>
                <ChattingHeader>
                    <Text
                        is_padding="0.7em 1em"
                        is_color="#fff"
                        is_bold="700"
                        is_height="45px"
                    >
                        Live Chat
                    </Text>
                </ChattingHeader>

                <div className="chat-body" style={{ width: "100%", height: "100%", overflowX: "hidden" }} ref={scrollRef}>
                    {chatMonitor.map((messageContent, idx) => {
                        return (
                            <div
                                key={idx}
                                className="Message-box"
                                style={{
                                    display: "flex",
                                    justifyContent: messageContent.nickname === id ? "flex-end" : "flex-star",
                                    margin: "5px 0 5px 0"
                                }}>
                                <div>
                                    <MessageContent
                                        style={{ backgroundColor: messageContent.nickname === id ? "cornflowerblue" : "#43a047" }}>
                                        <Text is_padding="3px" is_margin="3px" >{messageContent.chat}</Text>
                                    </MessageContent>
                                    <MessageMeta
                                        style={{ justifyContent: messageContent.nickname === id ? "flex-end" : "flex-star" }}
                                    >
                                        <Text is_margin="0 3px" is_bold="600">{messageContent.nickname}</Text>
                                    </MessageMeta>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="chat-footer"
                    style={{
                        height: "40px",
                        border: "1px solid #263238",
                        borderTop: "none",
                        display: "flex",
                    }}>
                    <Input
                        defaultValue={chatMonitor}
                        _onChange={handleInput}
                        _onKeyPress={handleEnter}
                        is_width="100%"
                        ref={inputRef}
                    />
                    {/* <Button
                        _onClick={handleEnter}
                        is_width="30%"
                    >
                        &#9658;
                    </Button> */}
                </div>
            </ChattingWindow>
            <button onClick={goodbyeChat}>나가기 버튼</button>
        </>
    );
}

const ChattingWindow = styled.div`
    width: 300px;
    height: 600px;
    border: 5px solid gray;
    border-radius: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`

const ChattingHeader = styled.div`
    height: 45px;
    border-radius: 5px;
    background: #263238;
    cursor: pointer;
    margin-top: 0;
`

const MessageContent = styled.div`
    width: auto;
    height: auto;
    min-height: 40px;
    max-width: 120px;
    border-radius: 5px;
    color: white;
    display: flex;
    align-items: center;
    margin-right: 5px;
    margin-left: 5px;
    padding-right: 5px;
    padding-left: 5px;
    overflow-wrap: break-word;
    word-break: break-word;
`

const MessageMeta = styled.div`
    display: flex;
    width: auto;
    fontSize: 12px;
    marginLeft: 5px;
    marginRight: 5px;
`



export default WaitingChatting;