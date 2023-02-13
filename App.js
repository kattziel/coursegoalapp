import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from 'expo-status-bar';

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style="light"/>
    <View style={styles.appContainer}>
      <Button
        title="Add new goal"
        color="#a065ec"
        onPress={startAddGoalHandler}
      />
      {modalIsVisible && (
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
      )}
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                onDeleteItem={deleteGoalHandler}
              />
            );
          }}
          alwaysBounceVertical={false}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1e085a"
  },
  goalsContainer: {
    flex: 5,
  },
});
