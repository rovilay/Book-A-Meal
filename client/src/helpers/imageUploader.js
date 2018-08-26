import axios from 'axios';
import dotenv from 'dotenv';
import moveProgressBar from './moveProgressBar';

dotenv.config();
/**
 * Gets image file and uploads to cloudinary
 *
 * @param {string} id - id of the DOM element that holds the image
 * @returns {Promise} returns a promise which inturn returns the image cloudinary link
 */
const imageUploader = (id) => {
  const fileData = new FormData();
  const imageFile = document.getElementById(id).files[0];
  const cldNme = process.env.CLOUD_NAME || 'dcqnswemi';

  if (imageFile) {
    fileData.append('file', imageFile);
    fileData.append('upload_preset', 'meal_image');
    const url = `https://api.cloudinary.com/v1_1/${cldNme}/image/upload`;
    return axios.post(url, fileData, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      onUploadProgress: (progressEvent) => {
        const uploadedPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        moveProgressBar(uploadedPercent);
      }
    })
      .then(res => res.data.url)
      .catch(err => err);
  }
};

export default imageUploader;
