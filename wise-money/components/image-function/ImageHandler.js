import * as ImagePicker from "expo-image-picker";
import resizeImage from "../../function/ResizeImage";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../lib/supabase";

export const handlePickImage = async (setSelectedImage) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result?.cancelled && result?.assets?.length > 0) {
    setSelectedImage(result.assets[0].uri);
  }
};

export const handleTakePhoto = async (setSelectedImage) => {
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result?.cancelled && result?.assets?.length > 0) {
    setSelectedImage(result.assets[0].uri);
  }
};

export const uploadImage = async (imageUri, type) => {
  // Read the file into memory as a base64 encoded string
  const resizedUri = await resizeImage(imageUri, 200);
  const base64Image = await FileSystem.readAsStringAsync(resizedUri, {
    encoding: "base64",
  });

  // Convert base64 to ArrayBuffer using decode
  const arrayBuffer = decode(base64Image);

  // Generate a unique filename based on the current timestamp
  const filename = `${type}_${Date.now()}.jpg`;

  const { data, error } = await supabase.storage
    .from("my files/images/" + type)
    .upload(filename, arrayBuffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("Error uploading image: ", error);
  } else {
    console.log("Successfully uploaded image: ", data);
  }

  // Get the URL of the uploaded image
  let { data: urlData } = await supabase.storage
    .from("my files/images/" + type)
    .getPublicUrl(filename);

  let publicURL = urlData?.publicUrl; // Corrected this line
  console.log(publicURL); // You can now use this URL to display the image or save it to your database
  return publicURL;
};
