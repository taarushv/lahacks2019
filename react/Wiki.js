import React, {Component} from 'react';
import {Button, ScrollView, Platform, StyleSheet, Text, View, ToastAndroid, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import SendSMS from 'react-native-sms-x';
import SmsListener from 'react-native-android-sms-listener'

export default class Wiki extends Component{
    constructor(props){
        super(props);
        this.state = {name:'', message:'',}
    }
    sampleTestMessage(name){
        SendSMS.send(1, "+16504698411", `2 ${name}`,
            (msg)=>{
            console.log(msg)
            }
        );
    }
    componentDidMount(){ 
        SmsListener.addListener(message => {
            console.log(message)
            this.setState({message: this.state.message + message.body})
            if(message.length < 153){
                console.log(this.state.message)    
            } 
        }); 
    }
    render(){
        return(
            <ScrollView>
                

                <Text style={{textAlign:"center",marginTop:"20%",fontSize:20}}>Wikipedia:</Text>
                <Input
  placeholder='Search' onChangeText={(name) => this.setState({name})} style={styles.root}
  leftIcon={{ type: 'font-awesome', name: 'search' }}
/>
                <Button title="Go" onPress={() => this.sampleTestMessage(this.state.name)}/>
                <Text style={styles.wiki}>{this.state.message}</Text>
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
    }
  });
  
