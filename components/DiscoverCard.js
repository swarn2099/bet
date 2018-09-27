import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import CardPool from './Card';
import {Button} from 'native-base';
import { LinearGradient } from 'expo';

import {
  Entypo,
  Ionicons,
  Feather,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';
import {addRandomPost} from './helper';
const buttonProps = {
  size: 20,
  color: 'white',
  padding: 5
};

const PoolCards = props => {
  let { image, type, name, tagline, date, interested, ...rest } = props;

  return (
    <CardPool {...rest} backgroundImage={image}>
      <Text style={styles.cardNameText}>{name}</Text>
      <View style={styles.cardContent}>
        <LinearGradient colors={['transparent', '#fff']}>
           <Text style={styles.cardDescriptionText}>{tagline}</Text>
         </LinearGradient>
      </View>
    </CardPool>
  );
};

const textShadow = {
  textShadowOffset: {
    height: 0.1,
  },
  textShadowColor: 'rgba(0, 0, 0, 0.3)',
  textShadowRadius: 5,
};

const styles = StyleSheet.create({
  cardTypeText: {
    ...textShadow,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  cardNameText: {
    ...textShadow,
    marginTop: 7,
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '800',
    paddingLeft: 10,
  },
  cardContent: {
     flex:1,
     flexDirection: 'column',
     justifyContent: 'flex-end',

  },
  cardDescriptionText: {
    fontSize: 23,
    zIndex: 10,
    paddingLeft: 10,
    fontWeight: '700',
    backgroundColor: 'transparent',
    color: 'white',
    height: 350,
    flexDirection: 'row',
  },
  interestedStyle: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    borderRadius: 1000,

  },

});

export default PoolCards;
