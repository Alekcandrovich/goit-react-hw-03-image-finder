import React from 'react';
import css from './imageGallery.module.css';

const ImageGallery = ({ children }) => (
  <ul className={css.image_gallery}>{children}</ul>
);

export default ImageGallery;