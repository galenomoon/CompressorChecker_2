import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity as TO, Modal } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useFonts, Inter_900Black, Inter_800ExtraBold, Inter_600SemiBold } from '@expo-google-fonts/inter';

import tw from 'twrnc';

export default function ModalConfirmation({ show, close, turnOffCompressor, turnOnCompressor, toggle }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  let [fontsLoaded] = useFonts({ Inter_900Black, Inter_800ExtraBold, Inter_600SemiBold });

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
        <View style={tw`flex items-center bg-[#333] w-[90%] ${toggle ? 'h-[70%]' : 'h-[30%]'} overflow-hidden rounded-2xl shadow-xl`}>
          <View style={tw`bg-[#555] flex  ${toggle ? 'flex-2' : 'flex-5'}  flex-row justify-end items-center w-full`}>
            <TO onPress={close}>
              <Ionicons name='close' size={40} style={tw`mx-2 text-white rounded-xl bg-[#444] px-[1px]`} />
            </TO>
          </View>
          <View style={tw`flex flex-18 w-full justify-center items-center`}>
            {toggle ?
              <View style={tw`flex bg-white overflow-hidden w-[340px] h-[430px] items-center p-[30px] rounded-2 shadow-md`}>
                <View style={tw`flex w-[320px] h-[320px] overflow-hidden rounded-xl`}>
                  <Camera style={tw`w-[100%] h-[100] bg-gray-300 `} type={type} />
                </View>
                <View style={tw`h-18 flex-row w-full items-center justify-evenly`}>
                  <TO onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                    <MaterialIcons name='flip-camera-android' size={40} style={tw`mx-2 text-white bg-[#555] p-2 rounded-3xl`} />
                  </TO>
                  <TO onPress={() => [turnOffCompressor(), close()]}>
                    <Ionicons name='camera' size={40} style={tw`mx-2 text-white bg-[#555] p-2 rounded-3xl`} />
                  </TO>
                </View>
              </View>
              :
              <View style={tw`w-full h-full justify-center items-center`}>
                <Text style={[tw`text-2xl text-center text-white `, { fontFamily: 'Inter_800ExtraBold' }]}>
                  Deseja realmente ligar o compressor?
                </Text>
                <View style={tw`flex flex-row w-full items-center justify-evenly px-5`}>
                  <TO onPress={()=> close()} style={tw`text-white flex items-center justify-center px-5 py-2 my-3 rounded-2xl`}>
                    <Text style={[tw`text-[#777] text-lg`, { fontFamily: 'Inter_600SemiBold' }]}>
                      cancelar
                    </Text>
                  </TO>
                  <TO onPress={()=> [turnOnCompressor(), close()]} style={tw`text-white flex items-center justify-center px-5 py-2 my-3 rounded-2xl bg-[#D42B15]`}>
                    <Text style={[tw`text-white text-lg`, { fontFamily: 'Inter_600SemiBold' }]}>
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

