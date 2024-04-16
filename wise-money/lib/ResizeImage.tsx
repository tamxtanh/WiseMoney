// import ImageResizer from 'react-native-image-resizer';


// async function resizeImage(uri, maxWidth) {
//     const { uri: resizedUri } = await ImageResizer.createResizedImage(
//         uri,
//         maxWidth,
//         maxWidth,
//         'JPEG',
//         80, // adjust the quality as needed
//         0,
//         undefined,
//         false,
//         { mode: 'contain', onlyScaleDown: true },
//     );
//     return resizedUri;
// }


import * as ImageManipulator from 'expo-image-manipulator';
async function resizeImage(uri, maxWidth) {
    const data = await ImageManipulator.
        manipulateAsync(uri, [
            { resize: { width: maxWidth, height: maxWidth } },
        ],
            { compress: 0.5, format: ImageManipulator.SaveFormat.PNG });
    return data.uri
}
export default resizeImage