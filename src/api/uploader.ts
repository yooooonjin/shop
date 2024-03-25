import axios from 'axios';

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRSET ?? ''
  );
  formData.append('folder', 'shop');
  return axios.post(process.env.REACT_APP_CLOUDINARY_URL ?? '', formData);
}
