import React, { useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import { initialState, authReducer } from './reducers/authReducer';

const Stack = createStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const isLoggedIn = true; // Replace this with your actual login check
    if (isLoggedIn) {
      dispatch({ type: 'LOGIN' });
    }
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={state.isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
