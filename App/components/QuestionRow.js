import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated
} from "react-native";

const getAnswerRowStyles = answered => {
  const s = [styles.answerRow];
  if (answered) {
    s.push(styles.answerRowFilled);
  }
  return s;
};

const getOverlayStyles = (isCorrectAnswer, wasUserAnswer) => {
  const s = [styles.answerBar];
  if (isCorrectAnswer) {
    s.push(styles.answerBarCorrect);
  } else if (wasUserAnswer) {
    s.push(styles.answerBarWrong);
  } else {
    s.push(styles.answerBarNeutral);
  }

  return s;
};

export default class QuestionRow extends React.Component {
  static defaultProps = {
    index: 0,
    answered: false,
    onPress: () => null,
    wasUserAnswer: false,
    answer: null,
    answerResponses: 0,
    totalResponses: 0,
    isCorrectAnswer: false
  };

  _animatedWidth = new Animated.Value(0);

  state = {
    width: 0
  };

  componentDidUpdate() {
    if (this.props.answered === true) {
      this.animateAnswerValue();
    }
  }

  animateAnswerValue = () => {
    const percentage = this.props.answerResponses / this.props.totalResponses;
    const rowWidth = Math.floor(this.state.width * percentage);

    Animated.timing(this._animatedWidth, {
      toValue: rowWidth
    }).start();
  };

  handleOnLayout = ({ nativeEvent }) => {
    this.setState({ width: nativeEvent.layout.width });
  };

  render() {
    const rowStyle = [styles.row];
    if (this.props.index === 0) {
      rowStyle.push(styles.borderTop);
    }

    return (
      <TouchableOpacity
        style={rowStyle}
        disabled={this.props.answered}
        onPress={this.props.onPress}
      >
        <View style={styles.innerRow}>
          <Text
            style={[
              styles.answerText,
              this.props.wasUserAnswer && styles.answerBoldText
            ]}
          >
            {this.props.answer}
          </Text>
          <View
            style={getAnswerRowStyles(this.props.answered)}
            onLayout={this.handleOnLayout}
          >
            <Animated.View
              style={[
                getOverlayStyles(
                  this.props.isCorrectAnswer,
                  this.props.wasUserAnswer
                ),
                this.props.answered && {
                  width: this._animatedWidth
                }
              ]}
            />
            {this.props.answered && (
              <Text style={styles.answerRowText}>
                {this.props.answerResponses}/{this.props.totalResponses}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#F5F4F6",
    marginHorizontal: -10
  },
  innerRow: {
    marginHorizontal: 10
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: "#F5F4F6"
  },
  answerRow: {
    height: 30,
    borderRadius: 15,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  answerRowFilled: {
    backgroundColor: "#F5F4F6"
  },
  answerRowText: {
    fontSize: 20,
    lineHeight: 25,
    color: "#4A4A4A",
    fontFamily: "quicksand-light"
  },
  answerText: {
    marginBottom: 6,
    fontSize: 20,
    lineHeight: 25,
    color: "#4A4A4A",
    fontFamily: "quicksand-regular"
  },
  answerBoldText: {
    fontFamily: "quicksand-bold"
  },
  answerBar: {
    borderRadius: 15,
    marginVertical: 0,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0
  },
  answerBarCorrect: {
    backgroundColor: "#BAE4CF"
  },
  answerBarWrong: {
    backgroundColor: "#F0C6D5"
  },
  answerBarNeutral: {
    backgroundColor: "#D8D8D8"
  }
});
