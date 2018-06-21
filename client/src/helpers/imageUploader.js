import axios from 'axios';

const imageUploader = (id) => {
  const fileData = new FormData();
  const imageFile = document.getElementById(id).files[0];

  if (imageFile) {
    fileData.append('file', imageFile);
    fileData.append('upload_preset', 'meal_image');
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`;
    // const config = {
    //   onUploadProgress: (progressEvent) => {
    //     const uploadedPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //     console.log(uploadedPercent);
    //   }
    // };
    axios.post(url, fileData, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      onUploadProgress: (progressEvent) => {
        const uploadedPercent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(uploadedPercent);
      }
    })
      .then((res) => {
        console.log(res.data.url);
        return res.data.url;
      })
      .catch(err => console.log(err));
  }
};

export default imageUploader;

