import React from "react";
import styled from "styled-components";
import MainHeader from "../../Components/MainHeader";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import Helmet from "react-helmet";

const StatusObj = {
  0: {
    status: "시작전",
    color: "#3778CF",
  },
  1: {
    status: "진행중",
    color: "#37CF65",
  },
  2: {
    status: "종료",
    color: "#CF3737",
  },
};

const EventContainer = styled.div`
  width: 100%;
  height: 76px;
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  padding: 0px 32px 0px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "KoPubWorld Dotum Medium";
  font-size: 15px;
`;

const EventTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 60px;
  color: #f6f6f6;
  font-size: 12px;
  border-radius: 3px;
`;

const EventDetailContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const EventDetail = styled.div``;

const EventAverageContainer = styled.div`
  height: 200px;
  width: 100%;
  border: 1px solid #c9c9c9;
  border-radius: 6px;
  margin: 24px 0px;
  padding: 20px 16px;
`;

const RankingContaier = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StepContainer = styled.div`
  border: 1px solid #c9c9c9;
  width: 727px;
  height: 343px;
  border-radius: 6px;
  padding: 20px;
  font-size: 15px;
`;

const StepHeaderContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const PersonalRankingContainer = styled.div`
  border: 1px solid #c9c9c9;
  width: 390px;
  height: 343px;
  border-radius: 6px;
  padding: 12px 20px;
`;

const Event = () => {
  const onChangeEvent = (event) => {
    if (typeof event !== String) return;
  };

  return (
    <>
      <Helmet>
        <title>Event | WELT</title>
      </Helmet>
      <MainHeader />
      <EventContainer>
        <EventTitleContainer>
          이벤트 :{"  "}
          <Select
            style={{
              width: 264,
              height: 32,
              marginLeft: 12,
              marginRight: 20,
              borderRadius: 6,
              color: "#707070",
            }}
            defaultValue={"허리 둘레 줄이기 프로젝트"}
            onChange={onChangeEvent}
          >
            <Select.Option value="걸음 수">걸음 수</Select.Option>
            <Select.Option value="소모 칼로리">소모 칼로리</Select.Option>
            <Select.Option value="허리 둘레">허리 둘레</Select.Option>
            <Select.Option value="걸음 속도">걸음 속도</Select.Option>
            <Select.Option value="걸은 거리">걸은 거리</Select.Option>
          </Select>
          <Status style={{ backgroundColor: StatusObj[0].color }}>
            {StatusObj[0].status}
          </Status>
        </EventTitleContainer>
        <EventDetailContainer>
          <EventDetail>참여인원 : 20명</EventDetail>
          <EventDetail>날짜 : 2020-10-04 ~ 2020-11-11</EventDetail>
          <DeleteOutlined style={{ fontSize: 16 }} />
        </EventDetailContainer>
      </EventContainer>
      <EventAverageContainer>평균 수치</EventAverageContainer>
      <RankingContaier>
        <StepContainer>
          <StepHeaderContainer>
            걸음 수{" "}
            <InfoCircleOutlined style={{ fontSize: 14, marginLeft: 4 }} />
          </StepHeaderContainer>
          <LineChart />
        </StepContainer>
        <PersonalRankingContainer>
          <Ranking />
        </PersonalRankingContainer>
      </RankingContaier>
    </>
  );
};

export default Event;
