import React, { useState, useEffect, Fragment } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import {
  getDeck,
  clearLocalNotification,
  setLocalNotification,
} from "../../../utils/helper";

const Container = styled.View`
  background: #fff;
  padding: 20px;
  flex: 1;
`;

const QuestionText = styled.Text`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin: 20px 0 20px;
`;

const ShowQuestionAnswer = styled.Text`
  color: #e74c3c;
  font-size: 19px;
  font-weight: 700;
  text-align: center;
`;

const ScoreText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  flex: 1;
`;

const QuizButton = styled.TouchableOpacity`
  padding: 18px;
  width: 100%;
  background-color: ${(props) => (props.incorrect ? "#e74c3c" : "#2ecc71")};
  align-items: center;
  color: #fff;
  margin: 10px;
  border-radius: 12px;
`;

const Quiz = ({ route, navigation }) => {
  const { deckId } = route.params;
  const [deck, setDeck] = useState({});
  const [showScore, setScoreVisibility] = useState(false);
  const [correctNumber, setCorrection] = useState(0);
  const [question, setQuestion] = useState(0);
  const [showAnswer, setAnswer] = useState(false);

  useEffect(() => {
    if (deckId) {
      getDeck(deckId)
        .then((result) => {
          setDeck(result);
          if (result && result.questions) {
            setQuestion(0);
          }
        })
        .catch((error) => {
          alert("Error: ", error);
          navigation.goBack();
        });
    }
  }, []);

  const handleCorrection = (correct) => {
    if (correct) {
      setCorrection(correctNumber + 1);
    }

    if (question + 1 != deck.questions.length) {
      setQuestion(question + 1);
    } else {
      setScoreVisibility(true);
    }

    setAnswer(false);
    /** We can assume from point that the user has already made the study for the day */
    clearLocalNotification().then(setLocalNotification);
  };

  const restartQuiz = () => {
    setScoreVisibility(false);
    setCorrection(0);
    setQuestion(0);
    setAnswer(false);
  };

  return (
    <Fragment>
      {deck?.questions?.length > 0 && (
        <Container>
          {deck?.questions && !showScore && (
            <Fragment>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {`${question + 1}/${deck?.questions?.length}`}
              </Text>
              <View style={{ flex: 1 }}>
                {!showAnswer && (
                  <QuestionText>
                    {deck?.questions[question]?.question}
                  </QuestionText>
                )}
                {showAnswer && (
                  <QuestionText>
                    {deck?.questions[question]?.answer}
                  </QuestionText>
                )}

                {showAnswer && (
                  <TouchableOpacity onPress={() => setAnswer(false)}>
                    <ShowQuestionAnswer>Question</ShowQuestionAnswer>
                  </TouchableOpacity>
                )}
                {!showAnswer && (
                  <TouchableOpacity onPress={() => setAnswer(true)}>
                    <ShowQuestionAnswer>Answer</ShowQuestionAnswer>
                  </TouchableOpacity>
                )}
              </View>
              <View>
                <QuizButton onPress={() => handleCorrection(true)}>
                  <Text style={{ color: "#fff" }}>Correct</Text>
                </QuizButton>
                <QuizButton incorrect onPress={() => handleCorrection(false)}>
                  <Text style={{ color: "#fff" }}>Incorrect</Text>
                </QuizButton>
              </View>
            </Fragment>
          )}

          {showScore && (
            <Fragment>
              <ScoreText>
                You scored {correctNumber} of {deck?.questions?.length}
              </ScoreText>
              <QuizButton onPress={() => restartQuiz()}>
                <Text style={{ color: "#fff" }}>Restart Quiz</Text>
              </QuizButton>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ShowQuestionAnswer>Go back to Deck</ShowQuestionAnswer>
              </TouchableOpacity>
            </Fragment>
          )}
        </Container>
      )}

      {deck?.questions?.length == 0 && (
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "600" }}
          >
            Sorry, you cannot take a quiz because there are no cards in the deck
          </Text>
        </View>
      )}
    </Fragment>
  );
};

export default Quiz;
