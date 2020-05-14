import React, { Fragment } from "react";
import styled from "styled-components/native";

const Button = styled.TouchableHighlight`
  padding: 15px 20px 15px;
  border-bottom-width: 1px;
  border-color: #ecf0f1;
`;

const DeckName = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const DecksCards = styled.Text`
  color: #95a5a6;
`;

const DeckItem = ({ deck, onPress }) => {
  return (
    <Button underlayColor={"#ecf0f1"} onPress={() => onPress(deck?.title)}>
      <Fragment>
        <DeckName>{deck?.title}</DeckName>
        <DecksCards>{`${deck?.questions?.length} decks`}</DecksCards>
      </Fragment>
    </Button>
  );
};

export default DeckItem;
