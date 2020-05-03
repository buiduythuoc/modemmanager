import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

const maxDimen = 1000;
const maxSize = 1000000;

class ImagePickerHelper {
  static resizeImage = image => {
    return new Promise((resolve, reject) => {
      if (image === 'delete') resolve('delete');
      else if (!image || !image.uri) resolve('');
      else if (image.fileSize > maxSize) {
        var originalRotation =
          image.originalRotation !== undefined ? image.originalRotation : 0;
        ImageResizer.createResizedImage(
          image.uri,
          maxDimen,
          maxDimen,
          'JPEG',
          90,
          originalRotation,
        )
          .then(resizedImage => {
            RNFS.readFile(resizedImage.uri, 'base64').then(imageBase64 => {
              resolve(imageBase64);
            });
          })
          .catch(error => {
            reject(error);
            console.log('error ', error);
          });
      } else {
        RNFS.readFile(image.uri, 'base64').then(imageBase64 => {
          resolve(imageBase64);
        });
      }
    });
  };
}
export default ImagePickerHelper;
