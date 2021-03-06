import React, { useState } from "react";
import styled from "styled-components";
import { Button, DatePicker, Progress, Select, Tag } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import moment from "moment";
import userDataApi from "../assets/data/userdata.json";
import userInfoApi from "../assets/data/userInfo.json";

const PRItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const RankContainer = styled.div`
  overflow: auto;
  width: 100%;
  height: 240px;
  margin-top: 12px;
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f9f9f9;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #707070;
    border-radius: 6px;
  }
`;
const RankItemContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: "KoPubWorld Dotum Medium";
  margin-bottom: 20px;
`;

const RankNum = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1px;
  font-size: 12px;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  color: white;
  background-color: #707070;
`;

const RankName = styled.span`
  margin-left: 18px;
  margin-right: 30px;
`;

const RankItem = styled.span`
  font-size: 11px;
  margin-left: 12px;
`;

let firstItem = 0;

const Ranking = ({ isDetail, eventDetail }) => {
  const [sort, setSort] = useState(true);
  const [rankValue, setRankValue] = useState("step");
  const [detail, setDetail] = useState(eventDetail ? true : false);
  const userData = Object.entries(userDataApi);
  const userList = Object.keys(userDataApi);

  let eventUserList = {};
  let eventStartDate = {};
  let eventEndDate = {};
  let tempUserData = {};
  let eventRankingData = {};

  if (eventDetail) {
    eventUserList = Object.values(eventDetail)[2].map((user) => user.uid);
    eventStartDate = Object.values(eventDetail)[4];
    eventEndDate = Object.values(eventDetail)[5];

    tempUserData = userData.filter((user) =>
      eventUserList.find((eventUser) => eventUser === user[0])
    );

    const tempStartDay = moment(eventStartDate).get("Date");
    const tempEndDay = moment(eventEndDate).get("Date");

    tempUserData = tempUserData.map((user) => {
      return [user[0], user[1].slice(tempStartDay - 1, tempEndDay)];
    });
    let tempUserDataLength = tempUserData[0][1].length;

    eventRankingData = tempUserData.map((userMontlyData, index) => {
      let avgMontlyData = {
        uid: "",
        waist: 0,
        step: 0,
        distance: 0,
        calories: 0,
        gaitSpeed: 0,
      };
      for (const {
        waist,
        step,
        distance,
        gaitSpeed,
        calories,
      } of userMontlyData[1]) {
        avgMontlyData.waist += parseInt(waist);
        avgMontlyData.step += parseInt(step);
        avgMontlyData.distance += parseInt(distance);
        avgMontlyData.gaitSpeed += parseInt(gaitSpeed);
        avgMontlyData.calories += parseInt(calories);
      }
      avgMontlyData.waist = (avgMontlyData.waist / tempUserDataLength).toFixed(
        2
      );
      avgMontlyData.step = Math.floor(avgMontlyData.step / tempUserDataLength);
      avgMontlyData.distance = (
        avgMontlyData.distance / tempUserDataLength
      ).toFixed(2);
      avgMontlyData.gaitSpeed = (
        avgMontlyData.gaitSpeed / tempUserDataLength
      ).toFixed(2);
      avgMontlyData.calories = Math.floor(
        avgMontlyData.calories / tempUserDataLength
      );
      avgMontlyData.uid = userList[index];
      return avgMontlyData;
    });
  }

  const userDataLength = userData[0][1].length;

  const userRankingData = userData.map((userMontlyData, index) => {
    let avgMontlyData = {
      uid: "",
      waist: 0,
      step: 0,
      distance: 0,
      calories: 0,
      gaitSpeed: 0,
    };
    for (const {
      waist,
      step,
      distance,
      gaitSpeed,
      calories,
    } of userMontlyData[1]) {
      avgMontlyData.waist += parseInt(waist);
      avgMontlyData.step += parseInt(step);
      avgMontlyData.distance += parseInt(distance);
      avgMontlyData.gaitSpeed += parseInt(gaitSpeed);
      avgMontlyData.calories += parseInt(calories);
    }
    avgMontlyData.waist = (avgMontlyData.waist / userDataLength).toFixed(2);
    avgMontlyData.step = Math.floor(avgMontlyData.step / userDataLength);
    avgMontlyData.distance = (avgMontlyData.distance / userDataLength).toFixed(
      2
    );
    avgMontlyData.gaitSpeed = (
      avgMontlyData.gaitSpeed / userDataLength
    ).toFixed(2);
    avgMontlyData.calories = Math.floor(
      avgMontlyData.calories / userDataLength
    );
    avgMontlyData.uid = userList[index];
    return avgMontlyData;
  });

  const { users } = userInfoApi;
  const onClickHandler = (event) => {
    event.preventDefault();
    setSort(!sort);
  };

  const onChangeRank = (event) => {
    if (!event && typeof event !== "object") return;

    setRankValue(event);
  };

  const onChangeDate = (event) => {
    console.log(event);
    if (!event && typeof event !== "object") return;

    // evnet Handler Error
    let { _d } = event;
    _d = moment(_d).format("YYYY-MM");

    if (_d !== "2020-11") {
      alert(`${_d}에는 데이터가 없습니다.`);
      return;
    }
  };

  const sort_by = (field, reverse) => {
    const key = (value) => parseFloat(value[field]);
    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  const unitStandard = (value) => {
    switch (value) {
      case "step":
        return "걸음";
      case "calories":
        return "kcal";
      case "waist":
        return "inch";
      case "gaitSpeed":
        return "km/h";
      case "distance":
        return "km";
      default:
        break;
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const tagRender = (props) => {
    const { label, closable, onClose } = props;

    return (
      <Tag closable={closable} onClose={onClose}>
        {label}
      </Tag>
    );
  };

  return (
    <>
      <PRItemContainer>
        랭킹{" "}
        <DatePicker
          bordered={false}
          onChange={onChangeDate}
          picker="month"
          defaultValue={moment("2020-11", "YYYY-MM")}
          style={{ color: "#707070" }}
        />
      </PRItemContainer>
      {isDetail && detail ? (
        <div style={{ marginTop: 24 }}></div>
      ) : (
        <PRItemContainer>
          <Select
            tagRender={tagRender}
            style={{
              width: 300,
              height: 32,
              borderRadius: 6,
              color: "#707070",
            }}
            placeholder="Please Select"
            defaultValue={"걸음 수"}
            onChange={onChangeRank}
          >
            <Select.Option value="step">걸음 수</Select.Option>
            <Select.Option value="calories">소모 칼로리</Select.Option>
            <Select.Option value="waist">허리 둘레</Select.Option>
            <Select.Option value="gaitSpeed">걸음 속도</Select.Option>
            <Select.Option value="distance">걸은 거리</Select.Option>
          </Select>
          <Button
            type="primary"
            icon={<SwapOutlined style={{ color: "#020202" }} rotate={90} />}
            size={"middle"}
            ghost
            style={{
              border: "1px solid #c9c9c9",
              marginLeft: 12,
              borderRadius: 4,
            }}
            onClick={onClickHandler}
          />
        </PRItemContainer>
      )}
      {isDetail ? (
        <>
          <RankContainer>
            {eventRankingData
              .sort(sort_by(rankValue, sort))
              .map((user, index) => {
                firstItem = sort
                  ? eventRankingData[0][rankValue]
                  : eventRankingData[eventRankingData.length - 1][rankValue];
                return (
                  <RankItemContainer key={user.uid}>
                    <RankNum>{index + 1}</RankNum>
                    <RankName>
                      {users.find((rankuser) => user.uid === rankuser.uid).name}
                    </RankName>
                    <Progress
                      style={{ width: 210 }}
                      showInfo={false}
                      strokeColor={"#4F42A7"}
                      percent={
                        ((eventRankingData.length - index) /
                          eventRankingData.length) *
                        100
                      }
                      strokeWidth={10}
                    />
                  </RankItemContainer>
                );
              })}
          </RankContainer>
        </>
      ) : (
        <>
          <RankContainer>
            {userRankingData
              .sort(sort_by(rankValue, sort))
              .map((user, index) => {
                console.log(user);
                firstItem = sort
                  ? userRankingData[0][rankValue]
                  : userRankingData[userRankingData.length - 1][rankValue];
                return (
                  <RankItemContainer key={user.uid}>
                    <RankNum>{index + 1}</RankNum>
                    <RankName>
                      {users.find((rankuser) => user.uid === rankuser.uid).name}
                    </RankName>
                    <Progress
                      style={{ width: 160 }}
                      showInfo={false}
                      strokeColor={"#4F42A7"}
                      percent={(user[rankValue] / firstItem) * 100}
                      strokeWidth={10}
                    />
                    <RankItem>
                      {numberWithCommas(user[rankValue])}{" "}
                      {unitStandard(rankValue)}
                    </RankItem>
                  </RankItemContainer>
                );
              })}
          </RankContainer>
        </>
      )}
    </>
  );
};

export default Ranking;
