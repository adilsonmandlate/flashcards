import React, { Fragment } from "react";
import styled from "styled-components/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Text, Animated } from "react-native";

const Button = styled.TouchableHighlight`
  padding: 30px 15px;
  border-bottom-width: 1px;
  border-color: rgba(236, 240, 241, 0.1);
`;

const DeckMain = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const DeckName = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
`;

const DeckTime = styled.Text`
  color: rgba(255, 255, 255, 0.7);
`;

const DeckDetails = styled.Text`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
`;

const RightActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        // backgroundColor: "#c0392b",
        justifyContent: "center",
      }}
    >
      <Animated.Text style={{ color: "#fff", fontWeight: "600", padding: 20 }}>
        Delete
      </Animated.Text>
    </Animated.View>
  );
};

const DeckItem = ({ deck, onPress }) => {
  return (
    <Swipeable renderRightActions={RightActions}>
      <Button underlayColor={"#16a085"} onPress={() => onPress(deck?.title)}>
        <Fragment>
          <DeckMain>
            <DeckName>{deck?.title}</DeckName>
            <DeckTime>30 mins ago</DeckTime>
          </DeckMain>
          <DeckDetails>{`${deck?.questions?.length} ${
            deck?.questions?.length > 1 || deck?.questions?.length == 0
              ? "cards"
              : "card"
          }`}</DeckDetails>
        </Fragment>
      </Button>
    </Swipeable>
  );
};

export default DeckItem;
