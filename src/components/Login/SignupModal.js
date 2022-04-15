import React, { useState, forwardRef, useRef } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import { actionCreators as userActions } from '../../redux/modules/user';
import Button from '../../elements/Button';

import profile1 from '../../pictures/omok-profile1.svg';
import profile2 from '../../pictures/omok-profile2.svg';
import profile3 from '../../pictures/omok-profile3.svg';
import profile4 from '../../pictures/omok-profile4.svg';
import profile5 from '../../pictures/omok-profile5.svg';
import profile6 from '../../pictures/omok-profile6.svg';
import profile7 from '../../pictures/omok-profile7.svg';
import profile8 from '../../pictures/omok-profile8.svg';
import profile9 from '../../pictures/omok-profile9.svg';
import profile10 from '../../pictures/omok-profile10.svg';
import profile11 from '../../pictures/omok-profile11.svg';
import SignupIconModal from './SignupIconModal';

const SignupModal = forwardRef(({ props }, modalEl) => {
    const icons = [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11];

    const dispatch = useDispatch();
    const slideRef = useRef(null);
    const inputIdRef = useRef(null);
    const inputEmailRef = useRef(null);
    const inputPassRef = useRef(null);

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [pickIndex, setPickIndex] = useState(0);
    const [iconModal, setIconModal] = useState(false);


    const handleIdInput = (e) => {
        setId(e.target.value);
    }

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirmInput = (e) => {
        setPasswordConfirm(e.target.value);
    }

    const handleIconModal = () => {
        if (iconModal === false) {
            setIconModal(true);
        } else {
            setIconModal(false);
        }
    }

    const handleSignupModal = () => {
        dispatch(userActions.signupPassCheck(false));
    }

    const idCheck = (id) => {
        let _reg = /^[A-Z0-9a-z]{2,11}$/g;
        return _reg.test(id);
    }
    const emailCheck = (email) => {
        let regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return regEmail.test(email);
    }

    const handleSignup = (e) => {
        e.preventDefault();

        if (idCheck(id) === false) {
            inputIdRef.current.focus();
            Swal.fire({
                icon: 'warning',
                title: '아이디 형식 오류',
                text: '아이디 형식이 올바르지 않습니다.',
            });
            return;
        }

        if (emailCheck(email) === false) {
            inputEmailRef.current.focus();
            Swal.fire({
                icon: 'warning',
                title: '이메일 형식 오류',
                text: '이메일 형식이 올바르지 않습니다.',
            });
            return;
        }

        if (password !== passwordConfirm) {
            inputPassRef.current.focus();
            Swal.fire({
                icon: 'warning',
                title: '비밀번호 일치 오류',
                text: '비밀번호가 일치하지 않습니다.',
            });
            return;
        }

        if (id === '' || email === '' || password === '' || passwordConfirm === '') {
            Swal.fire({
                icon: 'warning',
                title: '입력 오류',
                text: '입력하지 않은 칸이 있습니다.',
            });
            return;
        }

        dispatch(userActions.signupDB(id, email, password, passwordConfirm, pickIndex))
    }

    const handleIconSelect = (e) => {
        setPickIndex(Number(e.target.className.slice(10)))
    }


    return (
        <SignupModalOverlay signup="true">
            <div className="signup_modal_box" tabIndex="-1">
                <div onClick={handleSignupModal}>
                    <span>&#10005;</span>
                </div>
                <div className="signup_modal_title_box">
                    <h2>회원가입</h2>
                </div>
                <div className="signup_modal_input_box" style={{ position: "relative" }}>
                    <input ref={inputIdRef} type="text" placeholder="아이디 : 2~12자, 영문 혹은 영문+숫자" onChange={handleIdInput} />
                    <input ref={inputEmailRef} type="email" placeholder="이메일 : 상품발송용 이메일 입니다!" onChange={handleEmailInput} />
                    <input ref={inputPassRef} type="password" placeholder="비밀번호" onChange={handlePasswordInput} />
                    <input type="password" placeholder="비밀번호 확인" onChange={handlePasswordConfirmInput} />
                    <div style={{ width: "80%", display: "flex", justifyContent: "space-around" }}>
                        <span>프로필 사진</span>
                        <button onClick={handleIconModal}>변경</button>
                    </div>
                    <div className="SliderContainer" style={{ width: "100%", height: "auto", marginBottom: "10px" }}>
                        <Container>
                            <div className="icon__box" ref={slideRef}>
                                <FillImage src={icons[pickIndex]} />
                            </div>
                        </Container>
                        {iconModal &&
                            <SignupIconModal handleIconSelect={handleIconSelect} />
                        }
                    </div>

                    <Button
                        is_width="13rem"
                        is_size="18px"
                        is_height="50px"
                        is_radius="10px"
                        is_background="#94D7BB"
                        _onClick={handleSignup}
                    >
                        회원가입
                    </Button>
                </div>
            </div>
        </SignupModalOverlay>
    );
});


const SignupModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: block;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
    box-sizing: border-box;
    overflow: auto;

    > div {
        position :relative;
        top: 50%;
        transform: translateY(-50%);
        width: 20rem;
        height: auto;
        margin: 0 auto;
        padding: 1.5rem;
        border: 2px solid #000;
        border-radius: 14px;
        background: #fff;

        > div:nth-child(1) {
            display:flex;
            justify-content: flex-end;

            > span {
                font-size: 18px;
                font-weight: 800;
                cursor: pointer;
            }
        }

        > div:nth-child(2) {
            width: 70%;
            margin: 0 auto 30px auto;
            text-align: center;

            > h2 {
                color: #189FFB;
                padding: 0;
                margin: 0;
                font-weight: 800;
            }
        }

        > div:nth-child(3) {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-content: center;
            align-items: center;
            justify-content: center;
            row-gap: 20px;

            > input {
                font-size: 14px;
                width: 80%;
                max-width: 20rem;
                padding: 0 5px;
                line-height: 30px;
                border: none;
                border-bottom: 1px solid #000;
                outline: none;

                &::placeholder {
                    color: #B1B1B1;
                }

                &:nth-child(2)::placeholder{
                    color: red;
                }

                @media only screen and (max-width: 600px) {
                    font-size: 1.8vmax;
                    line-height: 2vmax;
                }

                @media only screen and (min-width: 600px) {
                    font-size: 1.6vmax;
                    line-height: 1.8vmax;
                }

                @media only screen and (min-width: 992px) {
                    font-size: 1.2vmax;
                    line-height: 1.4vmax;
                }

                @media only screen and (min-width: 1280px) {
                    font-size: 1rem;
                    line-height: 1.2rem;
                }
            }
        }
    }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;

    .icon__box {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const FillImage = styled.img`
    max-width: 100%;
    height: 100px;
    object-fit: cover;
    outline: ${props => props.isClicked ? "4px solid #94D7BB" : ""};
`;


export default SignupModal;