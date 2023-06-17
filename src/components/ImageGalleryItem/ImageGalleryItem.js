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
      onClick,
      largeImageURL
    } = this.props;

    return (
      <li className={css.gallery_item}>
        <a href={largeImageURL} onClick={onClick && (() => onClick(largeImageURL))}>
          <img
            className={css.gallery_item_image}
            src={webformatURL}
            alt={tags}
          />
        </a>
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;