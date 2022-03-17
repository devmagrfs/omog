import React, { useEffect,useState,useCallback } from "react";
import styled from "styled-components";


import { Button, Text,Input } from "../elements/index";
import Roomlist from "../components/Roomlist";
import UsersInfo from "../components/UsersInfo";
import MainFooter from "../components/MainFooter";
import Spinner from "../elements/Spinner"
import LeaderBoard from "../components/LeaderBoard";
import useInput from "../hook/useInput";

import Logo from "../pictures/omogLogo.png";
import { useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/room";

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading]= useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [roomaName, onChangeRoomaName, setRoomaName] = useInput("");  


  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const enterWaiting= () =>{
    // alert("안녕",roomaName);
    dispatch(roomActions.addRoomDB(roomaName))
  };
  
  const onKeyPress = useCallback((e) => {
  
    if (e.key == "Enter") {
      enterWaiting();
    }
  });
  useEffect (()=>{
    let timer= setTimeout(()=>{
      setLoading(false)
  },1000)
  },[]);
  
  
  return (
    <>
      <Container>
      {loading?(<Spinner type={'page'} is_dim={true}/>):""}
    
        <ListDiv>
          <ListTitle>
            <ListTip>
              <Button 
              is_height="30px" 
              is_width="30px"
              is_margin="5px 0 0 0"
              _onClick={()=>{
                window.location.reload()
              }}
              >
                <Text is_size="15px">↻</Text>
              </Button>
              <Text
              is_size="30px"
              is_bold
              >게임방</Text>
            </ListTip>
            <Button
              is_margin="0 10px"
              is_height="50px"
              is_width="200px"
              is_border="#6071CE solid 2px"
              _onClick={()=>{
                alert("죄송합니다! 빠른시일 내로 구현하겠습니다!")
              }}
            >
              방 번호 입력
            </Button>
          </ListTitle>
          <RoomDiv>
            <Roomlist />
          </RoomDiv>
        </ListDiv>
        <UserInfoWrap>
            <UsersInfo />
            <ButtonWrap>
            <Button
              is_margin="20px auto"
              is_height="60px"
              is_width="150px"
              is_radius="8px"
              is_border=" solid 2px #94d7bb"
              is_background="#94d7bb"
              _onClick={() => {
                openModal();
              }}
            >
              <Text
              is_color="white"
              >방 만들기</Text>
            </Button>
            <Button
              is_margin="20px auto"
              is_height="60px"
              is_width="150px"
              is_radius="8px"
              is_border=" solid 2px #94d7bb"
              is_background="#94d7bb"
              _onClick={()=>{
                alert("죄송합니다! 빠른시일 내로 구현하겠습니다!")
              }}
            >
              <Text
              is_color="white"
              >플레이어 빠른 참가</Text>
            </Button>
            <Button
              is_margin="20px auto"
              is_height="60px"
              is_width="150px"
              is_radius="8px"
              is_border=" solid 2px #94d7bb"
              is_background="#94d7bb"
              _onClick={()=>{
                alert("죄송합니다! 빠른시일 내로 구현하겠습니다!")
              }}
            >
              <Text
              is_color="white"
              >관전자 빠른 참가</Text>
            </Button>
          </ButtonWrap>
          </UserInfoWrap>
        {/* <Button
          _onClick={() => {
            dispatch(userActions.logout());
          }}
        >
          로그아웃
        </Button> */}
   
      <LeaderBoard
      open={modalOpen}
      close={closeModal}
      header="방을 만들어 봅시다~!"
      enter={enterWaiting}
      enterName="방 만들기"
      >
        <ModalFlex>
        <Nemo/>
        <Text>방 이름</Text>
        </ModalFlex>
        <MakeRomm
        name="message"
        onKeyDown={(e) => onKeyPress(e)}
        onChange={(e) => onChangeRoomaName(e)}
        placeholder="what...?"
        value={roomaName}
        id="outlined-multiline-static"
        variant="outlined"
        label="Message"
        />
        <ModalFlex>
        <Nemo/>
        <Text>시간</Text>
        </ModalFlex>


      </LeaderBoard>
      </Container>
      <MainFooter />
      <LogoWrap>
        <LogoImg src={Logo} />
      </LogoWrap>
    </>
  );
};
const Container = styled.div`
  display: flex;
  width: 1200px;
  margin: 70px auto;
`;
const UserInfoWrap = styled.div`
  width: 300px;
`;
const RoomDiv = styled.div`
  height: 500px;
  width: 1000px;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius:18px 18px 0 0;
  margin : 15px 0 0 0; 
  background-color : #f2f2f2;
`;
const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  height : 40px;
`;
const ListDiv = styled.div`
margin: 0 30px 0 0; 
`;
const ButtonWrap = styled.div`
display : flex; 
flex-direction: column;
justify-content : center;
width:300px;
height:350px;
`;
const ListTip = styled.div`
display: flex;
`;
const LogoWrap = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  right :200px;
  bottom : 100px;
`;
const LogoImg = styled.img`
  width: 200px;
  height: 100px;
`;
const MakeRomm = styled.input`
  width: 400px;
  height: 50px;
  border : 0.5px black solid;
  background-color: #ffffff;
  padding-left: 25px;
 
  ::placeholder {
    font-size: 18px;
  }
  :focus {
    outline: 2px black solid;
  }
  @media (max-width: 767px) {
    width: 300px;
    ::placeholder {
      padding: 0px 20px;
      font-size: 16px;
    }
  }
`;
const Nemo = styled.div`
width : 15px;
height : 15px;
background-color : #94d7bb;
margin : 4px 3px 0 0;
`;
const ModalFlex = styled.div`
display : flex;
margin : 5px 0 15px 0;
`;
export default Main;
