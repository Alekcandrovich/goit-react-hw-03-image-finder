import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  
  handleImageClick() {
    this.props.onImageClick();
  };

  render() {
    const {
      webformatURL,
      tags,
      onImageClick,
      largeImageURL
    } = this.props;

    return (
      <li className={css.gallery_item}>
        <img
          className={css.gallery_item_image}
          src={webformatURL}
          alt={tags}
          onClick={() => onImageClick(largeImageURL)}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;