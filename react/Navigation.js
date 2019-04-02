import React, {Component} from 'react'
import {Button, ScrollView, Platform, StyleSheet, Text, View, ToastAndroid, Picker, WebView} from 'react-native';
import { Input } from 'react-native-elements';
import SendSMS from 'react-native-sms-x';
import SmsListener from 'react-native-android-sms-listener'

var query = [34.0705, -118.4468]
export default class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {start:'', destination:'', directions:'', json:''}
    }
    getDirections = () => {
        SendSMS.send(1, "+16504698411", `3,${query},${this.state.destination}`,
        (msg)=>{
          //console.log(msg)
          this.setState({directions:''})
        }
      );
    }
    componentDidMount(){
        SmsListener.addListener(message => {
            console.log(message)
            this.setState({directions: this.state.directions + message.body})
        });  
        //navigator.geolocation.getCurrentPosition((res)=> {this.setState({location:res});console.log(res)})
    }
    render(){
        return(
            <ScrollView>
                <Text style={{textAlign:"center",marginTop:"20%",fontSize:20}}>Navigation</Text>
                <Text style={{textAlign:"center",paddingTop:"5%"}}>Your co-ordinates: {`${query[0]}, ` + query[1]}</Text>
                <Input
  placeholder='Enter Destination' onChangeText={(destination) => this.setState({destination})} style={styles.root}
  leftIcon={{ type: 'font-awesome', name: 'map' }}
/>
                <Button title="Go" style={{marginLeft:"5%"}} onPress={this.getDirections}></Button>
               <Text style={styles.final}>{this.state.directions}</Text>
               
            </ScrollView>
        )
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
        fontSize:25,
        paddingLeft:"10%",
        paddingTop:"10%",
        paddingRight:"10%"
    }
  });