import axios from 'axios';

const queryGallery = async (image) => {
  try {
    const { data } = await axios.post('/kairosGalleryRecognize', { img: image });
    return data;
  } catch (err) {
    // todo: handle client errors better
    console.warn(err.message);
  }
};

const storeInGallery = async (imgURL) => {
  try {
    await post('galleryStore', { img: imgURL });
  } catch (err) {
    // todo: handle client errors better
    console.warn(err.message);
  }
};



export { queryGallery, storeInGallery };