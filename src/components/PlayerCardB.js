import React,{memo} from "react";
import styled from "styled-components";
import { Text } from "../elements/index";
import Progress from "./Progress";

const PlayerCardB = memo(({playerInfo,min2,sec2}) => {
  const win = playerInfo?.score[0].win;
  const lose = playerInfo?.score[1].lose;


  const UserFaceColor =(point)=>{
    let color= "black 2px"
    if(point >= 1300 && point < 1500){
      color = "#835506 3px";
      return color;
    }
    if(point >= 1500 && point < 2000){
      color ="#B2B2B2 3px";
      return color;
    }
    if(point >= 2000 && point < 3000){
      color ="#FFF27E 3px";
      return color;
    }
    if(point >= 3000){
      color = "#22E1E4 3px";
      return color;
    }
    return color;
  };
  


  return (
    <Container>
      <UserFace color={UserFaceColor(playerInfo?.point)} />
      <Text is_bold is_size="30px" is_margin="20px 0">
        {" "}
        {playerInfo ? playerInfo.id : "2"}
      </Text>
      <ProgressWrap>
        <Progress win={win} lose={lose} />
      </ProgressWrap>
      <Text is_margin="10px 0">
        승률 {win / (win + lose) ? Math.ceil(win / (win + lose)* 100 ) + "%" : 0 + "%"}{" "}
      </Text>
      <Text is_size="15px">
        (전체 1{win}승{lose}패 )
      </Text>
      <Text
       is_bold
       is_margin="15px"
       is_color="black"
       is_size="25px"
      >{min2} : {sec2}</Text>
    </Container>
  );
});
const Container = styled.div`
  width: 200px;
  height: 300px;
  border: 2px solid black;
  border-radius: 15px;
  background-color: #e7e7e7;
  margin: 10px 0;
  text-align: center;
  box-shadow: -5px 5px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ProgressWrap = styled.div`
  width: 150px;
  margin: 0 auto;
`;
const UserFace = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  background-color: white;
  border:  solid ${(props) => props.color};
  margin: 25px auto;
`;
export default PlayerCardB;
