import React from "react";
import styled, { keyframes } from "styled-components";
import LoadingC from "../pictures/Loading.png"
import { Text } from ".";

const Spinner = (props) => {
  const { type, size, is_dim, is_result, loading_time } = props;

  return (
    <React.Fragment>
      <SpinnerWrap type={type} is_dim={is_dim} is_result={is_result}>
        <div>

          <SpinnerSvg size={size} />

          <ProgressBar width={props.width} margin={props.margin}>
            <HighLight width={9 / 10 * 100 + "%"} loading_time={loading_time} />
          </ProgressBar>
          <Text
            is_bold
            is_color="white"
            is_size="30px"
            is_margin="15px"
          > LOADING . . .</Text>
        </div>
      </SpinnerWrap>
    </React.Fragment>
  );
};

Spinner.defaultProps = {
  type: "inline", // inline, page
  is_dim: false,
  // size: 400,
  is_result: false,
};

const SpinnerWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  ${(props) =>
    props.type === "page"
      ? `position: fixed;
        height: 95vh;
        top: 0;
        left: 0;
        padding: 0;
        z-index: 9999;`
      : ``}
  ${(props) =>
    props.is_dim
      ? `
     background: rgba(0,0,0,0.4); 
     height: 100vh;
  `
      : ``}

${(props) =>
    props.is_result
      ? `
     background: rgba(0,0,0,1); 
     height: 100vh;
  `
      : ``}
      
`;

const SpinnerSvg = styled.div`
  // --size: ${(props) => props.size}px;
  width: 400px;
  height: 200px;
  background-image: url(${LoadingC});
  background-size : contain;
background-repeat: no-repeat;
  // background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; background: none; display: block; shape-rendering: auto;' width='200px' height='200px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Cg transform='rotate(0 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(30 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(60 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.75s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(90 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(120 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(150 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.5s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(180 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(210 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(240 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.25s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(270 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(300 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3Cg transform='rotate(330 50 50)'%3E%3Crect x='47' y='24' rx='3' ry='3.36' width='6' height='12' fill='%23222222'%3E%3Canimate attributeName='opacity' values='1;0' keyTimes='0;1' dur='1s' begin='0s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/g%3E%3C/svg%3E");
  // background-size: var(--size);
  margin : 0 0 0 20%;
`;
const loading = keyframes`
from{
  width : 0px;
}
to{
  width : 100px;
}
`;
const ProgressBar = styled.div`
  background: #eee;
  width: 100%;
  height: 20px;
  margin: auto 0;
  border : 2px solid black;
  border-radius : 5px;
  padding : 4px 3px;
`;

const HighLight = styled.div`
  background: #94d7bb;
  
  animation-name: ${loading};
        animation-duration: ${props => props.loading_time ? `${props.loading_time}s` : "0.5s"};
        animation-timing-function: linear;
        animation-iteration-count: 1;
        animation-fill-mode: none;
        animation-play-state: running;
  height: 20px;
`;

export default Spinner;