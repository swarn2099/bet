import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { BlurView } from 'expo';
import {
  Entypo,
  Ionicons,
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import AccountScreen from '../screens/AccountScreen';
import DiscoverScreen from '../screens/DiscoverScreen';

export default createBottomTabNavigator(
  {
    Watch: { screen: DiscoverScreen },
    Play: {screen: DiscoverScreen},
    You: {screen: AccountScreen},

  },
  {
    navigationOptions: ({ navigation, screenProps }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        const props = {
          size: 28,
          style: { marginBottom: -3, width: 25 },
          color: focused ? Colors.tabIconSelected : Colors.tabIconDefault,
        };

        switch (routeName) {
          case "Watch":
          return <MaterialCommunityIcons name="airballoon" {...props} />;

          case 'Play':
            return <Ionicons name="md-glasses" {...props} />;

          case 'You':
            return <MaterialCommunityIcons name="account" {...props} />;
        }
      },
    }),

    tabBarOptions: {
      style: {
        backgroundColor: '#1b2020',
      },
    },
  }
);
