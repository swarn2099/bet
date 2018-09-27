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
import {StackNavigator, withNavigation} from 'react-navigation';

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

const WatchPlay = props => {
  let { image, type, name, name2, tagline, tagline2, date, interested, ...rest } = props;

  return (
    <CardPool {...rest} backgroundImage={image}>
    <View style={styles.cardContent}>
      <TouchableOpacity  onPress={()=>this.props.navigation.navigate('AddSupplyDrop')}>
        <Text style={styles.cardNameText}>{name}</Text>
        <Text style={styles.cardDescriptionText}>{tagline}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddSupplyDrop')}>
        <Text style={{...textShadow, marginTop: 7, color: '#ffffff', fontSize: 32, fontWeight: '800', paddingRight: 10,    textAlign: 'right'}}>{name2}</Text>
        <Text style={styles.cardDescriptionText2}>{tagline2}</Text>
      </TouchableOpacity>
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
  cardNameText2: {
    ...textShadow,
    marginTop: 7,
    color: '#ffffff',
    justifyContent: 'flex-end',
    fontSize: 32,
    fontWeight: '800',
    paddingRight: 10,
  },
  cardContent: {
     flex:1,
     flexDirection: 'column',

  },
  cardDescriptionText: {
    fontSize: 17,
    paddingLeft: 10,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: 'white',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  cardDescriptionText2: {
    fontSize: 17,
    paddingRight: 15,
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: 'white',
    flexDirection: 'row',
    paddingBottom: 20,
    textAlign: 'right'
  },


});

export default WatchPlay;
