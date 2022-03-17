import React from 'react';
import styled from 'styled-components';
import Text from '../../elements/Text';

function WaitPlayerList({ blackPlayer, whitePlayer }) {
    console.log(blackPlayer, whitePlayer)

    return (
        <PlayerContainer>
            <BlackPlayerCard>
                <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ marginRight: "31px", boxSizing: "border-box" }}>
                        <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#D3D3D3", margin: "0 0 6px 0" }}>
                        </div>
                        <div>
                            <Text>{blackPlayer?.id}</Text>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 16px 0">
                            Point {blackPlayer?.point}p
                        </Text>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                            <Text is_bold="600">
                                승률:
                                {blackPlayer?.score
                                    ?
                                    blackPlayer?.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                    :
                                    null
                                }%
                            </Text>
                            <Text is_size="14px">
                                (전체 &nbsp;
                                {blackPlayer?.score
                                    ?
                                    blackPlayer?.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                    :
                                    null
                                }승 &nbsp;
                                {blackPlayer?.score
                                    ?
                                    blackPlayer?.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                    :
                                    null
                                }패
                                )
                            </Text>
                        </div>
                    </div>
                </div>
            </BlackPlayerCard>
            <WhitePlayerCard>
                <div style={{ padding: "18px 24px 23px 23px", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ marginRight: "31px", boxSizing: "border-box" }}>
                        <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#D3D3D3", margin: "0 0 6px 0" }}>
                        </div>
                        <div>
                            <Text>{blackPlayer?.id}</Text>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Text is_bold="800" is_size="17px" is_line_height="19px" is_margin="0 0 16px 0">
                            Point {blackPlayer?.point}p
                        </Text>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "219px" }}>
                            <Text is_bold="600">
                                승률:
                                {blackPlayer?.score
                                    ?
                                    blackPlayer?.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                    :
                                    null
                                }%
                            </Text>
                            <Text is_size="14px">
                                (전체 &nbsp;
                                {blackPlayer?.score
                                    ?
                                    blackPlayer?.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                    :
                                    null
                                }승 &nbsp;
                                {blackPlayer?.score
                                    ?
                                    blackPlayer?.score[0].win === 0
                                        ?
                                        0
                                        :
                                        (blackPlayer?.score[0].win) / (blackPlayer.score[0].win + blackPlayer.score[1].lose)
                                    :
                                    null
                                }패
                                )
                            </Text>
                        </div>
                    </div>
                </div>
            </WhitePlayerCard>
        </PlayerContainer>
    )
}

const PlayerContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const BlackPlayerCard = styled.div`
    width: 367px;
    height: 130px;
    // color: white;
    // background-color: black;
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    margin-right: 18px;
`

const WhitePlayerCard = styled.div`
    width: 367px;
    height: 130px;
    box-shadow: -3px 3px 6px 3px #A8937340;
    border-radius: 14px;
    margin-left: 18px;
`

// const PlayerThumbnail = styled.img`
//     // width: 100%;
//     width: 200px;
//     height: 100px;
//     position: relative;
//     padding-top: 75%;

//     img {
//         position: absolute;
//         top: 0px;
//         left: 0px;
//         width: 100%;
//         height: 100%;
//         display: block;
//         border-radius: 50%;
//         border: 1px solid black;
//         object-fit: cover;
//     }
// `

export default React.memo(WaitPlayerList);