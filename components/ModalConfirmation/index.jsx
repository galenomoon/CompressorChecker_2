import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity as TO, Modal, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import tw from 'twrnc';

export default function ModalConfirmation({ show, close, turnOffCompressor, turnOnCompressor, toggle }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>

  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={tw`w-full h-full bg-black opacity-30 absolute`} />
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`flex items-center bg-[#333] ${toggle ? ' w-[95%] h-[65%]' : 'w-[90%] h-[50%]'} overflow-hidden rounded-2xl shadow-xl`}>
          <View style={tw`bg-[#222] flex  ${toggle ? 'flex-2' : 'flex-2.5'}  flex-row justify-end items-center w-full`}>
            <TO onPress={close}>
              <Ionicons name='close' size={40} style={tw`mx-2 text-white rounded-xl bg-[#444] px-[1px]`} />
            </TO>
          </View>
          <View style={tw`flex flex-18 w-full justify-center items-center`}>
            {toggle ?
              <View style={tw`flex items-center justify-between w-full h-full`}>
                <View style={tw`flex w-[395px] h-[395px] overflow-hidden`}>
                  <Camera style={tw`w-[100%] h-[130%] bg-gray-300 `} type={type} />
                </View>
                <View style={tw`mb-10 flex-row w-full items-center justify-evenly`}>
                  <TO onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                    <MaterialIcons name='flip-camera-android' size={40} style={tw`mx-2 text-white bg-[#555] p-2 rounded-3xl`} />
                  </TO>
                  <TO onPress={() => [turnOffCompressor(), close()]}>
                    <Ionicons name='camera' size={40} style={tw`mx-2 text-white bg-[#555] p-2 rounded-3xl`} />
                  </TO>
                </View>
              </View>
              :
              <View style={tw`flex w-full mb-5 justify-center items-center`}>
                <Image style={tw`w-[50%] h-[50%]`} source={require('../../assets/caution-sign.png')} />
                <Text style={[tw`text-2xl text-center font-bold text-white mb-3`]}>
                  Deseja realmente ligar o compressor?
                </Text>
                <View style={tw`flex flex-row w-full items-center justify-evenly px-5`}>
                  <TO onPress={() => close()} style={tw`text-white flex items-center justify-center px-5 py-2 my-3 rounded-2xl`}>
                    <Text style={[tw`text-[#777] text-lg font-bold`]}>
                      cancelar
                    </Text>
                  </TO>
                  <TO onPress={() => [turnOnCompressor(), close()]} style={tw`text-white flex items-center justify-center px-5 py-2 my-3 rounded-2xl bg-[#D42B15]`}>
                    <Text style={[tw`text-white text-lg font-bold`]}>
                      Confirmar
                    </Text>
                  </TO>
                </View>
              </View>
            }
          </View>
        </View>
      </View>
    </Modal>
  );
}

