import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useCachedResources from './hooks/useCachedResources';

import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Program from './screens/Program'
import Diary from './screens/Diary'
import Mine from './screens/Mine'


function HomeTabs() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'alarm'
                            : 'alarm-outline';
                    } else if (route.name === 'Program') {
                        iconName = focused ? 'apps-sharp' : 'apps-outline';
                    } else if (route.name === 'Diary') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Mine') {
                        iconName = focused ? 'md-person-sharp' : 'md-person-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarLabel: (({focused, color}) => {
                    let label;
                    if (route.name === 'Home') {
                        label = '首页'
                    } else if (route.name === 'Program') {
                        label = '项目'
                    } else if (route.name === 'Diary') {
                        label = '日记'
                    } else if (route.name === 'Mine') {
                        label = '我的'
                    }
                    return <Text>{label}</Text>;
                })
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}

        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Program" component={Program}/>
            <Tab.Screen name="Diary" component={Diary}/>
            <Tab.Screen name="Mine" component={Mine}/>
        </Tab.Navigator>
    );
}

export default function App() {
    const isLoadingComplete = useCachedResources();

    const Stack = createStackNavigator();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <NavigationContainer>

                    <Stack.Navigator>
                        <Stack.Screen name="home" component={HomeTabs} options={{
                            title: '注册',
                            header: () => null
                        }}/>
                        <Stack.Screen name="login" component={Login} options={
                            {
                                header: () => null,
                                title: '登录',
                                headerStyle: {
                                    backgroundColor: '#83bbbb',
                                },
                                headerTintColor: '#fff',
                                headerTitleStyle: {
                                    fontWeight: 'bold',
                                },
                            }
                        }/>

                        <Stack.Screen name="register" component={Register} options={{
                            title: '注册',
                            header: () => null
                        }}/>
                    </Stack.Navigator>

                </NavigationContainer>

                <StatusBar/>
            </SafeAreaProvider>
        );
    }
}
