import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import Logo from '../pictures/omokjomok.svg';
import { Text, Input, Button } from '../elements';

import profile1 from '../pictures/omok-profile1.svg';
import profile2 from '../pictures/omok-profile2.svg';
import profile3 from '../pictures/omok-profile3.svg';
import profile4 from '../pictures/omok-profile4.svg';
import profile5 from '../pictures/omok-profile5.svg';
import profile6 from '../pictures/omok-profile6.svg';
import profile7 from '../pictures/omok-profile7.svg';
import profile8 from '../pictures/omok-profile8.svg';
import profile9 from '../pictures/omok-profile9.svg';
import profile10 from '../pictures/omok-profile10.svg';
import profile11 from '../pictures/omok-profile11.svg';
import SignupModal from '../components/Login/SignupModal';
import ExplainModal from '../components/Login/ExplainModal';


function Login(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const modalEl = useRef();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false)
    const [explainModal, setExplainModal] = useState(true);

    const icons = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11];
    const [pickers, setPickers] = useState([]);
    const [pickIndex, setPickIndex] = useState(0);


    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (id === '' || password === '') {
            alert('입력하지 않은 칸이 있습니다!');
            return;
        }
        dispatch(userActions.loginDB(id, password)).then(
            (res) => {
                if (res === 'ok') {
                    alert('로그인 되었습니다!');
                    props.close();
                }
            }
        )
    }

    const handleSignupModal = () => {
        if (modalVisible === false) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    }

    const closeSignupModal = () => {
    }

    const handleClickOutside = ({ target }) => {
        if (modalVisible && (!modalEl.current || !modalEl.current.contains(target))) {
            console.log(modalEl.current.contains(target))
            setModalVisible(false);
        }
    };

    const handleExplainModal = () => {
        setExplainModal(false);
    }

    const onPickIndex = useCallback((idx) => {
        if (pickIndex === idx) {
            return;
        }

        setPickIndex(idx);
    }, [pickIndex]);

    useEffect(() => {
        setPickers(icons.map((p, idx) => {
            return (
                <Picker
                    key={idx}
                    onClick={() => onPickIndex(idx)}
                    background={pickIndex === idx ? '#333333' : '#C4C4C4'}
                >
                </Picker>
            );
        }));

    }, [onPickIndex, pickIndex]);


    useEffect(() => {
        if (localStorage.getItem("token")) {
            alert("로그인 하셨습니다. 로비 페이지로 이동합니다.")
            history.push('/main')
        }
    }, [])

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [modalVisible]);


    return (
        <LoginPageContainer>
            {explainModal &&
                <ExplainModal handleExplainModal={handleExplainModal} />
            }
            {modalVisible &&
                <SignupModal closeSignupModal={closeSignupModal} visible={modalVisible} ref={modalEl} />
            }
            <LogoBox>
                <img src={Logo} alt="로고" />
            </LogoBox>
            <LoginInputContainer>
                <div>
                    <div>
                        <input type="text" autoComplete="on" placeholder="아이디" onChange={handleIdInput} />
                        <input
                            autoComplete="on"
                            placeholder="비밀번호"
                            type="password"
                            onChange={handlePasswordInput}
                        />
                        <button onClick={handleLogin}>
                            로그인
                        </button>
                    </div>
                    <div className="signup_to_box">
                        <Text is_color="#616161" is_cursor="pointer" _onClick={handleSignupModal}>회원가입 하러가기</Text>
                    </div>
                </div>
            </LoginInputContainer>
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    row-gap: 100px;
`


const LoginInputContainer = styled.div`
    box-sizing: border-box;
    width: 100%;

    > div {
        display:flex;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        flex-direction: column;
        box-sizing: border-box;
        row-gap: 30px;

        > div:nth-child(1){
            display: flex;
            flex-direction: column;
            width: 230px;
            margin: 0 auto;
            text-align: center;
            row-gap: 30px;

            > input:nth-child(1){
                padding: 3px;
                font-size: 14px;
                line-height: 16.8px;
                border: none;
                border-bottom: 2px solid black;
                outline: none;
            }

            > input:nth-child(2){
                font-size: 14px;
                line-height: 16.8px;
                padding: 3px;
                border:none;
                border-bottom: 2px solid black;
                outline: none;
            }

            > button {
                padding: 14px 0;
                font-size: 18px;
                font-weight: 400;
                line-height: 21.6px;
                border-radius: 14px;
                background-color: #94D7BB;
                cursor: pointer;
            }
        }

        > div:nth-child(2){
            display: flex;
            justify-content: center;
        }
    }
`

const LogoBox = styled.div`
    position:absolute;
    top:0%;
    left:50%;
    transform:translate(-50%,10%);

    >img {
        height: auto;
        width: 15rem
    }
`

const Picker = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.background};
    margin: 0 6px;
    cursor: pointer;
`;

export default Login;