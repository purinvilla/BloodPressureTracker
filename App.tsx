import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {Provider} from 'react-redux';

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Placeholder from "./src/screens/EntryList";
import AddEntry from "./src/screens/AddEntry";
import EntryPage from "./src/screens/EntryPage";
import store from './src/store';

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Login"
            component={Login}
          />
          <Screen
            name="Register"
            component={Register}
          />
          <Screen
            name="Entry List"
            component={Placeholder}
          />
          <Screen
            name="Add Entry"
            component={AddEntry}
          />
          <Screen
            name="Entry Page"
            component={EntryPage}
          />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}