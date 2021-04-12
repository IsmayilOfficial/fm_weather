import React, {useEffect,useState} from 'react';
import {View,Text} from 'react-native';
import {Feather} from '@expo/vector-icons';
export type temperature = {
    high: number,
    low: number
}

export default function WeatherDetails({temp}: {temp:temperature}){


    return (
        <View style= {{flexDirection: 'row'}} >
            <Text style={{fontSize:30 }}>{temp.low}</Text>
            <Feather name="arrow-down" size={30} color="blue"/>
            <Text style={{fontSize:30, marginLeft:50 }}>{temp.high}</Text>
            <Feather name="arrow-up" size={30} color="red"/>
        </View>
    
    )

}