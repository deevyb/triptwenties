//unchanged since i started navigation

import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, TextInput, View, Button, KeyboardAvoidingView, ScrollView, StyleSheet
 } from 'react-native';
import { Header } from './Header';

class ToDoList extends Component {
  static navigationOptions = {
    title: 'House Tasks',
  };

  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      taskItem: "",
    };
  }

  changedText = text => {
    this.setState({taskItem: text})
  };

  addTask = () => {
    if (this.state.taskItem.trim().length > 0) {
      this.setState(
        prevState => {
          let { taskList, taskItem } = prevState;
          return {
            taskList: taskList.concat({ key: taskList.length, taskItem: taskItem}),
            taskItem: ""
          };
        }
      );
      this.textInput.clear();
    }
  };

  deleteTask = i => {
    this.setState(
      prevState => {
        let taskList = prevState.taskList.slice();
        taskList.splice(i, 1);
        return {taskList: taskList};
      }
    )
  }

  toGroceries = () => {

  }

  render() {
    return (
      <SafeAreaView
      >

        <Header headerText="Tasks" />
        <View style={styles.hr} />
        <TextInput
        style={styles.textInput}
        ref={input => {this.textInput=input}}
          autoCorrect={false}
          placeholder="Enter: "
          onChangeText={this.changedText}
          onSubmitEditing={
            this.addTask
          }
        />
        <FlatList
        style={styles.list}
          data={this.state.taskList}
          renderItem={({item, index}) =>
              <View
              style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.taskItem}
                </Text>
                <Button
                title='delete'
                onPress={() => this.deleteTask(index)} />
              </View>
        }
        />

      </SafeAreaView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    paddingTop: 0,
    },
  list: {
    paddingTop:0,
    width: "100%"
  },
  listItem: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
    paddingLeft: 5,
    flex: 1
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    justifyContent: 'flex-end',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },
});

export default ToDoList;
