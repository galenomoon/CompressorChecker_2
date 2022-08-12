import React, { useState } from 'react';
import { View, Switch, Text, Image } from 'react-native';
import tw from 'twrnc';
import ModalConfirmation from './components/ModalConfirmation';
import { useFonts, Inter_900Black, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export default function App() {
  const [toggle, setToggle] = useState(true)
  const [showModal, setShowModal] = useState(false)
  let [fontsLoaded] = useFonts({ Inter_900Black, Inter_800ExtraBold });

  return (
    <View style={tw`flex flex-1 ${toggle ? 'bg-[#e6252e]' : 'bg-[#0ad3f2]'} items-center justify-center`}>
      <Image style={{ transform: [{ scale: 0.8 }] }} source={toggle ? require('./assets/grinning-face.png') : require('./assets/very-happy-face.png')} />
      <View style={tw`flex items-center justify-center bg-white rounded-3xl shadow-lg p-3`}>
        <Text style={[tw`text-2xl `, { fontFamily: 'Inter_900' }]}>O COMPRESSOR ESTÁ</Text>
        <Text style={[tw`text-5xl `, { fontFamily: 'Inter_800ExtraBold' }]}>{toggle ? 'LIGADO!' : 'DESLIGADO'}</Text>
        <Switch
          value={toggle}
          onValueChange={() => [setShowModal(true)]}
          thumbColor={toggle ? '#777' : "#777"}
          trackColor={{ true: "#c63039", false: "#bbb" }}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        />
      </View>
      <ModalConfirmation show={showModal} toggle={toggle} turnOffCompressor={() => setToggle(false)} turnOnCompressor={() => setToggle(true)} close={() => setShowModal(!showModal)} />
    </View>
  );
}

