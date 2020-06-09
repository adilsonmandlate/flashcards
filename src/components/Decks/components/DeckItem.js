import React, { Fragment } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Button = styled.TouchableHighlight`
  padding: 15px 20px 15px;
  border-bottom-width: 1px;
  border-color: #ecf0f1;
  height: 200px;
  border-radius: 5px;
  border-width: 1px;
  margin-bottom: 5px;
`;

const DeckMain = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DeckName = styled.Text`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const DeckDescription = styled.Text`
  text-align: justify;
  font-size: 15px;
  flex: 1;
`;

const DeckDetails = styled.Text`
  color: #95a5a6;
`;

const DeckItem = ({ deck, onPress }) => {
  return (
    <Button underlayColor={"#ecf0f1"} onPress={() => onPress(deck?.title)}>
      <Fragment>
        <DeckMain>
          <DeckName>{deck?.title}</DeckName>
          <Text style={{ color: "#bdc3c7" }}>30 mins ago</Text>
        </DeckMain>

        <DeckDescription>
          A small description, lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Etiam malesuada justo lectus, nec pellentesque diam
          tempor pharetra.
        </DeckDescription>
        <DeckDetails>{`${deck?.questions?.length} ${
          deck?.questions?.length > 1 || deck?.questions?.length == 0
            ? "cards"
            : "card"
        }`}</DeckDetails>
      </Fragment>
    </Button>
  );
};

export default DeckItem;
