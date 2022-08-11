import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import tw from 'twrnc';
import ModalConfirmation from './components/ModalConfirmation';

export default function App() {
  return (
    <View style={tw`flex flex-1 bg-purple-400 items-center justify-center`}>
      <ModalConfirmation/>
    </View>
  );
}

