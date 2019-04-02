/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { PermissionsAndroid } from "react-native";
import {FormInput, FormLabel} from 'react-native-elements';
import {Button, Platform, StyleSheet, Text, View, ToastAndroid} from 'react-native';
import { Provider, Toast } from '@ant-design/react-native';
import SmsListener from 'react-native-android-sms-listener'
import SendSMS from 'react-native-sms-x';
import { Input } from 'react-native-elements';
import Translate from './Translate'



async function requestReadSmsPermission() {
  try {
  var granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.READ_SMS,
  {
  title: "Auto Verification OTP",
  message: "need access to read sms, to verify OTP"
  }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  console.log("sms read permissions granted", granted); 
  granted = await PermissionsAndroid.request( 
  PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,{ 
  title: "Receive SMS",
  message: "Need access to receive sms, to verify OTP"
  }
 
  );
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: "Location Data",
    message: "Need access"
  })
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS, {
    title: "SMS Data",
    message: "Need access"
  })
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  console.log("RECEIVE_SMS permissions granted", granted);
  } else {
  console.log("RECEIVE_SMS permissions denied");
  }
  } else {
  console.log("sms read permissions denied");
  }
  } catch (err) {
  console.log(err);
  }
  }

export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      location: null,
      question:'',
      answer:'',
      translation:''
    };
    navigator.geolocation.getCurrentPosition((res)=> {this.setState({location:res});console.log(res)})
    
  }
  sampleTestMessage= ()=> {
    SendSMS.send(1, "+16504698411", `0 ${this.state.question}`,
        (msg)=>{
          console.log(msg)
        }
      );
    this.setState({message:''})
  }
  componentDidMount(){
    
    requestReadSmsPermission();
    console.log("sup dude");
    SmsListener.addListener(message => {
      console.log(message)
      
      if(message.body[0] == 1){
        console.log('ok')
        this.setState({translation: message.body.slice(2)})
      }else if(message.body[0] == 0){
        this.setState({message: this.state.message + message.body.slice(2)})
      }
      
    }); 
    
  }
  render() {
    return (
      <View>
                <Text style={{textAlign:"center",marginTop:"20%",fontSize:20}}>Ask Away:</Text>
                <Input
  placeholder='Enter your question' onChangeText={(question) => this.setState({question})} style={styles.root}
  leftIcon={{ type: 'font-awesome', name: 'question' }}
/>
        <Button title="Go" style={{marginLeft:"5%"}} onPress={this.sampleTestMessage}></Button>
        <Text style={styles.wiki}>Powered by Wolfram Alpha computational intelligence</Text>
        {(this.state.message.length>0) ? <Text style={styles.final}>{`"${this.state.message}"`}</Text> :<Text>{this.state.message}</Text> }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    root: {
      marginTop:"10%"
    },
    wiki:{
        paddingLeft: "8%",
        paddingRight:"8%",
        paddingTop:"4%",
        fontSize:15
    },
    final:{
        fontSize:20,
        paddingLeft:"10%",
        paddingTop:"10%",
        paddingRight:"10%"
    }
  });