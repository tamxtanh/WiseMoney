import * as ImagePicker from "expo-image-picker";

export const handlePickImage = async (setSelectedImage) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled && result.assets.length > 0) {
    setSelectedImage(result.assets[0].uri);
  }
};

export const handleTakePhoto = async (setSelectedImage) => {
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled && result.assets.length > 0) {
    setSelectedImage(result.assets[0].uri);
  }
};
