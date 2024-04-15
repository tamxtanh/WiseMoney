import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

async function uploadAvatar() {
    // Request permission to access the user's photos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
    }

    // Let the user pick an image from their device
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    // If the user didn't cancel, upload the image to Supabase
    if (!result.cancelled) {
        // Read the image file as binary data
        const imageUri = Platform.OS === 'android' ? result.uri : result.uri.replace('file://', '');
        const data = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

        // Upload the image to Supabase Storage
        const { error } = await supabase.storage.from('my files/images/avatar').upload(`avatar.jpg`, data, { contentType: 'image/jpeg', upsert: true });

        if (error) {
            console.error(error);
            return;
        }

        // Get the URL of the uploaded image
        const { publicURL, error: urlError } = supabase.storage.from('my files/images/avatar').getPublicUrl(`avatar.jpg`);

        if (urlError) {
            console.error(urlError);
            return;
        }

        console.log(publicURL);  // You can now use this URL to display the image or save it to your database
    }
}

export default uploadAvatar
