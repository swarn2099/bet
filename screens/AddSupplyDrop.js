import React from 'react';
import {  ScrollView, Image,  View , TouchableOpacity,   StyleSheet } from 'react-native';
import { Camera, Video, ImagePicker, Permissions } from 'expo';
import {StackNavigator, SafeAreaView} from 'react-navigation';
import ScreenHeader from '../components/ScreenHeader';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {Button} from 'native-base';
import moment from 'moment';
import * as firebase from 'firebase';
require("firebase/storage");
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

const buttonProps2 = {
  size: 100,
  color: 'white',
  padding: 1
};

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCamera_RollPermission: status === 'granted' });

  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={this.state.type}
        >
        <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
        <ScreenHeader title="Hi Swarn" location={this.props.screenProps.location}/>

          <View
            style={{
              paddingTop: 20,
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'column',
            }}>
          <Card borderRadius={15} title="Upload your Video" containerStyle={{elevation: 10}}>
          <Button style={{padding: 50}} onPress={this._pickImage}>
            <Ionicons name="ios-camera"{...buttonProps2}/>
          </Button>
          <Button style={{padding: 50}} onPress={this._pickImage2}>
            <Ionicons name="ios-camera"{...buttonProps2}/>
          </Button>
          {image &&
            <Video source={{ uri: image }} style={{ width: 300, height: 200 }} />}
          </Card>

        </View>
        </ScrollView>
        </SafeAreaView>

      </Camera>

      </View>
    );
  }

  _pickImage = async () => {
    let result = await Expo.ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos"
    });
    console.log(result);


    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  _pickImage2 = async () => {
    var storageRef = firebase.storage().ref('players/' + this.state.image);
    storageRef.put(this.state.image);
  };
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
