/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NetInfo
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNFB from 'react-native-fetch-blob';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  state = {
    isLoading: true
  }

  isLoading() {
    const deviceId = DeviceInfo.getUniqueID();
    const a = {};
    const projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890&deviceId=' + deviceId;
    const pathToProjectJson = RNFB.fs.dirs.DocumentDir + '/projectJson.json';


    const fetchedProject ={};

    pokretanje = () => {
      fetch(projectJsonURL)
        .then(res =>res.json())
        .then(res => global.projectJson = res)
        .then(() => this.setState({ isLoading: false }))

    }
    nePostojiProjectJson = () => {
      console.log('nePostojiProjectJson()');
      return new Promise((resolve, reject) => {
        RNFB.config({ path: pathToProjectJson }).fetch('GET', projectJsonURL)
          .then(res => { console.log(res.path()); global.projectJson = fetchedProject; return Promise.resolve() })
          .then(() => resolve())
          .catch((err) => reject(err));
      })
    }

    
    NetInfo.isConnected.fetch()
    .then(() => pokretanje())
  }
  componentWillMount() {
    this.isLoading();
  }



  render() {
    if (!this.state.isLoading) {
      {console.log(global.projectJson)}
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {global.projectJson.project.lastChanges}
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
        </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
      );
    } else {
      return(
        
        <Text>AAAAAAAAAAAAAAAAAAaa</Text>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
