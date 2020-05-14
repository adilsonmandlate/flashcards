import React, { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { addCardToDeck } from "../../../utils/helper";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background: #fff;
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

const AddCard = ({ route, navigation }) => {
  const { deckId } = route.params;

  const [values, setValues] = useState({
    question: "",
    answer: "",
  });

  const handleSubmit = () => {
    addCardToDeck({ title: deckId, card: values }).then(() => {
      setValues({ question: "", answer: "" });
      navigation.navigate("Deck Details", { id: deckId });
    });
  };

  return (
    <Container>
      <View style={{ flex: 1 }}>
        <Input
          value={values.question}
          placeholder="Question"
          onChange={(value) =>
            setValues({ ...values, question: value.nativeEvent.text })
          }
        />
        <Input
          value={values.answer}
          placeholder="Answer"
          onChange={(value) =>
            setValues({ ...values, answer: value.nativeEvent.text })
          }
        />
      </View>

      <Button
        disabled={values.question && values.answer ? false : true}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#fff" }}>Add Card</Text>
      </Button>
    </Container>
  );
};

export default AddCard;
