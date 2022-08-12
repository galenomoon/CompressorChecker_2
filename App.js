import React, { useState } from 'react';
import { View, Switch, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import ModalConfirmation from './components/ModalConfirmation';

export default function App() {
  const [toggle, setToggle] = useState(true)
  const [showModal, setShowModal] = useState(false)

  return (
    <View style={tw`flex flex-1  items-center justify-center`}>
      <LinearGradient style={tw`flex flex-1 justify-center items-center`} colors={toggle ? ['#cb0000', '#d6ac25', '#cb0000'] : ['#C13584', '#E1306C', '#FCAF45', '#F2f']} >
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
        <ModalConfirmation show={showModal} toggle={toggle} turnOffCompressor={() => setToggle(false)} turnOnCompressor={() => setToggle(true)} close={() => setShowModal(!showModal)} />
      </LinearGradient>
    </View>
  );
}

