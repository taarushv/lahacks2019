import React, {Component} from 'react'
import Carousel from 'react-native-snap-carousel';
import { View, StyleSheet, Image, Text } from "react-native";
import {Card} from "react-native-elements"

var wiki = require('./assets/wiki.png')
var map = require('./assets/map.png')
var trans = require('./assets/transs.png')
var wolf = require('./assets/wolf.jpg')


export default class MyCaro extends Component {
    constructor(props){
        super(props);
        this.state = {w:this.props.w, entries:[{title:'Wiki',subtitle:'Wikipedia', img:wiki}, {title:'Wolfram Alpha',subtitle:'Wikipedia', img:wolf}, {title:'Navigation',subtitle:'Maps', img:map}, {title:'Translation',subtitle:'Powered by Google', img:trans}]}
        this._renderItem = this._renderItem.bind(this);
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.pad}>
                <Card >
                <Text onPress={() => {
                    if(item.title == 'Wiki'){
                        this.state.w()
                    }
                }}>{item.title}</Text>
                <Image source={item.img} style={styles.pad}/>
                </Card>
                
            </View>
        );
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              layout="stack"
              loop={true}
              sliderWidth={350}
              itemWidth={280}
              layoutCardOffset={18}
            />
        );
    }
}
const styles = StyleSheet.create({
  pad:{
      paddingLeft:"20%"
  }
});



  