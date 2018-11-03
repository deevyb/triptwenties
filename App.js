import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import TodoView from './src/components/TodoView';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <TodoView />
      </SafeAreaView>
    );
  }
}
