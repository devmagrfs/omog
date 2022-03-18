import { React, useCallback, useEffect, useState } from "react";
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
  const point = get_user.point;
 


  const UserFaceColor =useCallback((point)=>{
    let color= "black"
    if(point >= 1300 && point < 1500){
      color = "#D3AB6F";
      return color;
    }
    if(point >= 1500 && point < 2000){
      color ="#B2B2B2";
      return color;
    }
    if(point >= 2000 && point < 3000){
      color ="#FFF27E";
      return color;
    }
    if(point >= 3000){
      color = "#22E1E4";
      return color;
    }
    return color;
  },[]);
  
  const color = UserFaceColor(point);

  useEffect(() => {
    dispatch(userActions.loginCheckDB(userId));
  }, []);
  return (
    <UserInfoContainer>
      <User>
        <UserFace color={color}/>
        <UserName>
          <Text is_bold is_size="30px" is_margin="10px">
            {get_user.id}
          </Text>
          <Text is_margin="15px 0 0 0"> Point {get_user.point} P</Text>
        </UserName>
      </User>
      <Progress win={win} lose={lose} width="250px" margin=" 0 auto" />
      <UserScore>
        <Text is_size="14px" is_bold>
          승률 {win / (win + lose) ? (win / (win + lose)) * 100 + "%" : 0 + "%"}
        </Text>
        <Text is_size="14px">
          (전체 {win}승 {lose}패)
        </Text>
      </UserScore>
    </UserInfoContainer>
  );
};
const UserInfoContainer = styled.div`
  height: 150px;
  width: 300px;
  background-color: white;
`;
const User = styled.div`
  display: flex;
`;

const UserScore = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 20px 0 20px;
  text-align: center;
`;
const UserFace = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: white;
  border: 3px solid ${(props) => props.color};
  margin: 10px 20px 10px 20px;
`;
const UserName = styled.div`
  height: 90px;
  width: 135px;
  padding: 13px 0 0 0;
`;
export default UsersInfo;
