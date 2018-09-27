import React from 'react';
import { ScrollView,View, TouchableOpacity,   StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import {StackNavigator, SafeAreaView} from 'react-navigation';
import {Button} from 'native-base';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import ScreenHeader from '../components/ScreenHeader';
import VideoRecorder from 'react-native-beautiful-video-recorder';

import {
  Entypo,
  Ionicons,
  MaterialIcons,
  Feather,
  Octicons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';
import { Text,  Card, ListItem,  Input } from 'react-native-elements'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import DiscoverCard from '../components/DiscoverCard';
import WatchPlay from '../components/WatchPlay';

const buttonProps = {
  size: 30,
  color: 'white',
  padding: 1
};

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,

  };
  static navigationOptions={
    header:null,
  };
  constructor(props){
    super();
    this.state={
    errors:[],
    }
    this._carousel={};
    this.init();
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  init(){

      this.state={
      bottomLevel:[

        {
         tagline:"Tell a stranger an embarassing story aobut yourself. The weirder, the better and the more upvotes.",
         thumbnail: require ('../assets/images/entertainment.gif'),
         title:"Today's Challenge",
         type: 'regular',
         next: 'AddSupplyDrop'
       },
       {


        thumbnail: require ('../assets/images/tv.gif'),
        title:"Watch",
        title2:"Play",
        type: 'watch'

      },
       {
        tagline:"Goal, three pointer, touchdown",
        thumbnail: require ('../assets/images/sports.gif'),
        title:"This Week",
        next:"CategoryScreen",
        type: 'regular'

      },

      ]
    };
  }
  start = () => {
  	this.videoRecorder.open((data) => {
  		console.log('captured data', data);
  	});
  }

  render() {
  	return (
  		<View>
  			......
  		  <TouchableOpacity onPress={this.start}>
  		  	<Text>Start</Text>
  		  </TouchableOpacity>
  		  <VideoRecorder ref={(ref) => { this.videoRecorder = ref; }} compressQuality={'medium'} /> // quality will be 'low', 'medium' or 'high'
  		</View>
  	);
  }
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'transparent',
  },
  contentContainer:{
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  cardList: {
    ...ifIphoneX({
      marginLeft: -20,
    }),
        paddingTop: 20
  },
  cardList2: {
    paddingBottom: 20,
  },
});
