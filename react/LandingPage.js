import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import {Alert} from "@ant-design/react-native"
import {Header, Card, Icon} from "react-native-elements"
import MyCaro from './myCaro'
import Wiki from './Wiki'
import App from './App'
import Translate from './Translate'
import Navigation from './Navigation'
export default class LandingPage extends Component {
  constructor(props){
      super(props);
      this.state= {
          showHome: true,
          showWiki: false,
          showTranslate:false,
          showNavigation:false,
          showWolf:false,
      }
  };
  hideA = () => {
      this.setState({showHome:false, showWolf:true})
  }
  hideW = () => {
    this.setState({showHome:false, showWiki:true})
    }
    hideT = () => {
        this.setState({showHome:false, showTranslate:true})
    }
    hideN = () => {
        this.setState({showHome:false, showNavigation:true})
    }
  render() {
    return (
        <View style={styles.root}>
        <Header containerStyle={{height: 65, backgroundColor:"#273E47", paddingBottom:"3%"}} centerComponent={{ text: 'Swify', style: { color: '#fff', fontSize:25}  }} />
        {(this.state.showHome) ?  
        <View>
      <Card
  title='Surf the web, offline!'>
 <Text>{`By leveraging Twilio's SMS API and Google's Cloud Platform, Swifty let's you surf various sites and services such as Google Translate, Navigation, Wikipedia, Wolfram Alpha, etc for free even when you don't have Wifi or Data. \n`}</Text> 
 <Text style={styles.center}>{`Ping check - ✔️`}</Text>
  </Card>
                <Text style={styles.title}>{`Sites/Services`}</Text>
                <MyCaro w={this.hideW} a={this.hideA} t={this.hideT} n={this.hideN} />
                </View> : 'null'}
      {(this.state.showWiki) ? <Wiki /> : null}
      {(this.state.showNavigation) ? <Navigation /> : null}
      {(this.state.showTranslate) ? <Translate /> : null}
      {(this.state.showWolf) ?  <App /> : null}
      
      <Card title={<Icon name="home" onPress={() => this.setState({showHome:true,showTranslate:false,showNavigation:false,showWiki:false, showWolf:false})} type="font-awesome" />}><Text style={styles.center}>{`Built with ❤️ @ LAHacks '19`}</Text></Card>
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    textAlign:"center"
  },
  center:{
      textAlign:"center"
  },
  title:{
      textAlign:"center",
      fontSize:23,
      marginTop:"7%"
  }
});


