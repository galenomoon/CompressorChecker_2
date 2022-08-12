import React, { useState, useEffect } from 'react';
import { View, Switch, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import ModalConfirmation from './components/ModalConfirmation';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [toggle, setToggle] = useState(true)
  const [capturedPhoto, setCapturedPhoto] = useState(null)

  const [showModal, setShowModal] = useState(false)

  const myToggle = (bool) => {
    setToggle(bool);
    AsyncStorage.setItem("toggle", toggle.toString())
  }

  useEffect(() => {
    AsyncStorage.getItem("toggle").then(value => {
      value === "false" ? setToggle(true) : setToggle(false);
    });
    AsyncStorage.getItem("uri").then(value => {
      value.length > 0 === setCapturedPhoto(value)
    });
  }, [])

  return (
    <View style={tw`flex flex-1  items-center justify-center`}>
      <LinearGradient style={tw`flex flex-1 justify-center items-center`} colors={toggle ? ['#cb0000', '#d6ac25', '#cb0000'] : ['#C13584', '#E1306C', '#FCAF45', '#F2f']} >
        {capturedPhoto && !toggle &&
          <View style={[tw`flex items-center ml-10 justify-center absolute left-0 top-20`, { transform: [{ rotate: '20deg' }] }]}>
            <View style={tw`flex items-center pt-3 pb-5 bg-white rounded-sm shadow-2xl w-[200px] h-[220px] `}>
              <Image style={tw`w-[90%] h-[90%] bg-gray-300 `} source={{ uri: capturedPhoto }} />
            </View>
          </View>}
        <Image style={{ transform: [{ scale: 0.8 }] }} source={toggle ? require('./assets/grinning-face.png') : require('./assets/very-happy-face.png')} />
        <View style={tw`flex items-center justify-center bg-white rounded-3xl shadow-lg p-3`}>
          <Text style={[tw`text-2xl font-bold`]}>O COMPRESSOR ESTÁ</Text>
          <Text style={[tw`text-5xl font-bold`]}>{toggle ? 'LIGADO!' : 'DESLIGADO'}</Text>
          <Switch
            value={toggle}
            onValueChange={() => [setShowModal(true)]}
            thumbColor={toggle ? '#777' : "#777"}
            trackColor={{ true: "#c63039", false: "#bbb" }}
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          />
        </View>
        <ModalConfirmation show={showModal} capturedPhoto={capturedPhoto} setCapturedPhoto={setCapturedPhoto} toggle={toggle} turnOffCompressor={() => myToggle(false)} turnOnCompressor={() => myToggle(true)} close={() => setShowModal(!showModal)} />
      </LinearGradient>
    </View>
  );
}

