import React from 'react';
import { createStackNavigator, StackNavigator, MaterialTopTabBarWithStatusBar,
  createBottomTabNavigator, createMaterialTopTabNavigator,
  tabBarComponent, tabBarStyle, tabBarOptions } from 'react-navigation';
import { SafeAreaView, Text, View, StyleSheet, Button } from 'react-native';
import ToDoList from './src/ToDoList';
import GroceriesList from './src/GroceriesList';
import { Header } from './src/Header';

class groceriesAndTasks extends React.Component {

  render() {
    return (
      <SafeAreaView>
      </SafeAreaView>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator(
  {
    Tasks: ToDoList,
    Groceries: GroceriesList,
  },
  {
    // tabBarComponent: MaterialTopTabBarWithStatusBar,
    tabBarOptions: {
    labelStyle: {
      paddingTop: 50,
    }
  }
  }
);

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 50,
    paddingLeft: 50,
  },
})

export default class App extends React.Component {
  render() {
    return (
      <TabNavigator/>
    );
  }
}
