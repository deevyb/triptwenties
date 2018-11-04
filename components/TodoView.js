import React, { Component } from 'react';
import { SafeAreaView, Text, FlatList, TextInput, View, Button, KeyboardAvoidingView
 } from 'react-native';
import { Header } from './Header';
import { TodoItemView } from './TodoItemView';

class TodoView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskNames: [],
      taskText: "",
    }
  }

  changedText = text => {
    this.setState({taskText: text})
  };

  addTask = () => {
    if (this.state.taskText.trim().length > 0) {
      this.setState(
        prevState => {
          let { taskNames, taskText } = prevState;
          return {
            taskNames: taskNames.concat({ key: taskNames.length, taskText: taskText}),
            taskText: ""
          };
        }
      );
      this.textInput.clear();
    }
  };

  deleteTask = i => {
    this.setState(
      prevState => {
        let taskNames = prevState.taskNames.slice();
        taskNames.splice(i, 1);
        return {taskNames: taskNames};
      }
    )
  }
  render() {
    return (
      <KeyboardAvoidingView>
      <SafeAreaView>
        <Header headerText="Exterminator" />


        <FlatList
          data={this.state.taskNames}
          renderItem={({item, index}) =>
            <View>
              <View>
                <Text>
                  {item.taskText}
                </Text>
                <Button title='X' onPress={() => this.deleteTask(index)} />
              </View>
            </View>
        }
        />


        <TodoItemView>

          <TextInput ref={input => {this.textInput=input}}
            autoCorrect={false}
            placeholder="Enter: "
            onChangeText={this.changedText}
            onSubmitEditing={
              this.addTask
            }
          />
        </TodoItemView>
      </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }

}


const styles = {
  inputStyle: {
    alignItems: 'center',
    color: "#ff0000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
}

export default TodoView;
