import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { Font } from "expo";

import Container from "./components/Container";
import Card from "./components/Card";
import QuestionRow from "./components/QuestionRow";

import data from "./data";

const slowItDown = () => {
  let j = 0;
  const interval = setInterval(() => {
    for (let i = 0; i < 1000; i++) {
      console.log("slooowww", i);
    }
    if (j > 10) {
      clearInterval(interval);
    }
    j++;
  }, 100);
};

export const loadFonts = () =>
  Font.loadAsync({
    "bangers-regular": require("./assets/fonts/Bangers-Regular.ttf"),
    "quicksand-regular": require("./assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-light": require("./assets/fonts/Quicksand-Light.ttf"),
    "quicksand-bold": require("./assets/fonts/Quicksand-Bold.ttf")
  });

export default class App extends React.Component {
  state = {
    fontsReady: false,
    userAnswer: null,
    question: data
  };

  componentDidMount() {
    loadFonts().then(() => this.setState({ fontsReady: true }));
  }

  handleAnswer = userAnswer => {
    this.setState(state => {
      const updatedAnswers = state.question.answers.map(answer => {
        if (answer.answer === userAnswer.answer) {
          return {
            ...answer,
            answerCount: answer.answerCount + 1
          };
        }
        return answer;
      });
      return {
        userAnswer,
        question: {
          ...state.question,
          totalResponses: state.question.totalResponses + 1,
          answers: updatedAnswers
        }
      };
    });
    slowItDown();
  };

  render() {
    if (!this.state.fontsReady) {
      return (
        <Container>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </Container>
      );
    }

    const { question } = this.state;
    return (
      <Container padding>
        <Card>
          <Text style={styles.questionText}>{question.question}</Text>
          {question.answers.map((answer, index) => {
            let wasUserAnswer = false;
            let answered = false;
            if (this.state.userAnswer) {
              answered = true;
              wasUserAnswer = answer.answer === this.state.userAnswer.answer;
            }

            return (
              <QuestionRow
                key={answer.answer}
                index={index}
                answer={answer.answer}
                answered={answered}
                onPress={() => this.handleAnswer(answer)}
                wasUserAnswer={wasUserAnswer}
                answerResponses={answer.answerCount}
                totalResponses={question.totalResponses}
                isCorrectAnswer={answer.correct}
              />
            );
          })}
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  questionText: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "quicksand-light",
    color: "#4A4A4A"
  }
});
