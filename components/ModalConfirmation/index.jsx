import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity as TO, Modal } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import tw from 'twrnc';

export default function ModalConfirmation() {
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
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={tw`w-full h-full bg-black opacity-30 absolute`} />
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`flex items-center justify-center bg-[#333] w-[90%] h-[70%] rounded-2xl`}>
          <View style={tw`flex bg-white w-[320px] h-[400px] items-center p-[30px] rounded-2`}>
            <View style={tw`flex w-[300px] h-[300px] overflow-hidden`}>
              <Camera style={tw`w-[100%] h-[100] bg-gray-300`} type={type} />
            </View>
            <TO onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}>
              <Text> FLIP </Text>
            </TO>
          </View>
        </View>
      </View>
    </Modal>
  );
}

