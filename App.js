import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import ModalConfirmation from './components/ModalConfirmation';

export default function App() {
  return (
    <View style={tw`flex flex-1 bg-[#333] items-center justify-center`}>
      <ModalConfirmation/>
    </View>
  );
}

