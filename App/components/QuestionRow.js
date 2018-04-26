import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default class QuestionRow extends React.Component {
  static defaultProps = {
    index: 0,
    answered: false,
    onPress: () => null,
    wasUserAnswer: false,
    answer: null,
    answerResponses: 0,
    totalResponses: 0
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
          <View style={styles.answerRow}>
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
  }
});
