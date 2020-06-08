import React, { useState, useCallback } from "react";
import { View, Text, StatusBar } from "react-native";
import { saveDeckTitle } from "../../../utils/helper";
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #fff;
`;

const TitleDeck = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin: 20px 0 30px;
  text-align: center;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #bdc3c7;
  padding: 10px;
  border-radius: 10px;
  margin: 0 0 20px;
`;

const Button = styled.TouchableOpacity`
  padding: 20px;
  color: #fff;
  border-radius: 10px;
  align-items: center;
  background: #16a085;
`;

const AddDeck = ({ navigation }) => {
  const [title, setTitle] = useState("");

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
    }, [])
  );

  const handleSubmit = () => {
    saveDeckTitle(title).then(() => {
      setTitle("");
      navigation.navigate("Deck Details", {
        id: title,
      });
    });
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <TitleDeck>What is the title of your new Deck?</TitleDeck>
        <Input
          value={title}
          placeholder="Title"
          onChange={(value) => setTitle(value.nativeEvent.text)}
        />
      </View>

      <Button disabled={title ? false : true} onPress={handleSubmit}>
        <Text style={{ color: "#fff" }}>Create Deck</Text>
      </Button>
    </Container>
  );
};

export default AddDeck;
