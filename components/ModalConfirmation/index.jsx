import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity as TO, Modal, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';


import tw from 'twrnc';

export default function ModalConfirmation({ show, close, turnOffCompressor, capturedPhoto, setCapturedPhoto, turnOnCompressor, toggle }) {
  const cameraRef = useRef(null)
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(false)
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>

  const takePicture = async () => {
    if (cameraRef) {
      let data = await cameraRef.current.takePictureAsync({})
      setCapturedPhoto(data?.uri)
      AsyncStorage.setItem("uri", data?.uri?.toString())

    }
  }


  return (
    <>
      <Modal animationType="slide" transparent={true} visible={show}>
        <View style={tw`w-full h-full bg-black opacity-30 absolute`} />
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`flex items-center bg-[#333] w-[95%] h-[40%] overflow-hidden rounded-2xl shadow-xl`}>
            <View style={tw`bg-[#222] flex flex-4 flex-row justify-end items-center w-full`}>
              <TO onPress={close}>
                <Ionicons name='close' size={40} style={tw`mx-2 text-white rounded-xl bg-[#444] px-[1px]`} />
              </TO>
            </View>
            <View style={tw`flex flex-22 w-full justify-center items-center`}>
              <View style={tw`flex items-center justify-center w-full`}>
                <Image style={tw`w-[50%] h-[50%]`} source={toggle ? require('../../assets/camera.png') : require('../../assets/caution-sign.png')} />
                <Text style={[tw`text-2xl text-center font-bold text-white `]}>
                  {toggle ? 'Tira uma foto do compressor?' : 'Deseja realmente ligar o compressor?'}
                </Text>
                {toggle && <Text style={[tw`text-xl text-center font-semibold text-[#777] mb-3`]}> (Só pra garantir né? rs) </Text>}
                <View style={tw`flex flex-row w-full items-center justify-evenly px-5 pb-2`}>
                  <TO onPress={() => close()} style={tw`text-white flex items-center justify-center px-10 py-2 my-3 rounded-2xl`}>
                    <Text style={[tw`text-[#777] text-lg font-bold`]}>
                      cancelar
                    </Text>
                  </TO>
                  <TO onPress={() => toggle ? [setCamera(true)] : [turnOnCompressor(), close()]} style={tw`text-white flex items-center justify-center px-10 py-2 my-3 rounded-2xl ${toggle ? "bg-[#276de6]" : "bg-[#D42B15]"}`}>
                    <Text style={[tw`text-white text-lg font-bold`]}>
                      {toggle ? 'Claro!' : 'Confirmar'}
                    </Text>
                  </TO>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={camera}>
        <View style={tw`w-full h-full bg-[#111]  absolute`} />
        <View style={tw`w-full h-full flex flex-1 items-center justify-evenly`}>
          {capturedPhoto ?
            <Image style={tw`w-[130%] h-[75%] bg-gray-300 `}
              source={{ uri: capturedPhoto }}
            /> :
            <Camera ref={cameraRef} style={tw`w-[130%] h-[75%] bg-gray-300 `} type={type} />}
          {capturedPhoto ?
            <View style={tw`mb-10 flex-row w-full items-center justify-evenly`}>
              <TO onPress={() => setCapturedPhoto(null)}>
                <MaterialIcons name='delete' size={65} style={tw`mx-2 text-white p-3 rounded-full`} />
              </TO>

              <TO onPress={() => [turnOffCompressor(), close(), setCamera(false)]}>
                <MaterialIcons name='save' size={65} style={tw`mx-2 text-white p-3 rounded-full`} />
              </TO>
            </View> :
            <View style={tw`mb-10 flex-row w-full items-center justify-evenly`}>
              <TO onPress={() => setCamera(false)}>
                <MaterialIcons name='arrow-back' size={65} style={tw`mx-2 text-white p-3 rounded-full`} />
              </TO>
              <TO onPress={() => takePicture()} style={tw`bg-[#fff] p-10 rounded-full`}>
              </TO>
              <TO onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
                <MaterialIcons name='flip-camera-android' size={65} style={tw`mx-2 text-white p-3 rounded-full`} />
              </TO>
            </View>
          }
        </View>
      </Modal>
    </>
  );
}

