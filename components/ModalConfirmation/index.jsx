import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Modal style={tw`flex flex-col justify-center items-center`} visible={true}>
      <View style={tw`flex bg-purple-400`}>
        <View style={tw`flex bg-white w-[320px] h-[400px] items-center p-[30px] rounded-2`}>
          <View style={tw`flex w-[300px] h-[300px] overflow-hidden`}>
            <Camera style={tw`w-[100%] h-[100] bg-gray-300`} type={type} />
          </View>
          <TouchableOpacity
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text> FLIP </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

