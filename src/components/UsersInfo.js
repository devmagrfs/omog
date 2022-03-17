import { React, useEffect, useState } from "react";
import styled from "styled-components";

import { Text } from "../elements/index";

import Progress from "./Progress";
import LeaderBoard from "./LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const UsersInfo = () => {
  const dispatch = useDispatch();

  const get_user = useSelector((state) => state.user.userInfo);

  const userId = localStorage.getItem("userId");

  // console.log("get_user",get_user.score[0].win);
  const win = get_user.score[0].win;
  const lose = get_user.score[1].lose;

  useEffect(() => {
    dispatch(userActions.loginCheckDB(userId));
  }, []);
  return (
    <UserInfoContainer>
      <User>
         <UserFace/>
        <UserName>
        <Text
         is_bold
         is_size="30px"
        >{get_user.id}</Text>
        <Text> Point {get_user.point} P</Text>

        </UserName>
      </User>
      <Progress 
      win={win} 
      lose={lose}
      width="250px"
      margin=" 0 auto"
      />
      <UserScore>
          <Text
          is_size="14px"
          is_bold
          >
            승률{" "}
            {win / (win + lose) ? (win / (win + lose)) * 100 + "%" : 0 + "%"}
          </Text>
          <Text
          is_size="14px"
          >
            (전체 {win}승 {lose}패)
          </Text>
        </UserScore>
    </UserInfoContainer>
  );
};
const UserInfoContainer = styled.div`
  height: 150px;
  width: 300px;
  background-color :white;
`;
const User = styled.div`
display: flex;
`;

const UserScore = styled.div`
  display: flex;
  justify-content: space-between;
  padding : 5px 20px 0 20px;
  text-align : center;
`;
const UserFace = styled.div`
width: 70px;
height: 70px;
border-radius : 70px;
background-color : white;
border : 3px solid black;
margin : 10px 20px 10px 20px;
`;
const UserName = styled.div`
height : 90px;
width : 135px;
padding : 13px 0 0 0;
`;
export default UsersInfo;
