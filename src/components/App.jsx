import React, { Component } from 'react';
import Notiflix from 'notiflix';
import Loader from './Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import { fetchImages } from '../servise/api';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    totalHits: 0,
    isLoading: false,
    images: [],
    showModal: false,
    modalImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, searchQuery } = this.state;
    if (page !== prevState.page || searchQuery !== prevState.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });
    try {
      const { totalHits, hits } = await fetchImages(
        this.state.searchQuery,
        this.state.page
      );

      if (!hits.length) {
        Notiflix.Notify.failure(
          'An error occurred while fetching images Please try again later.'
        );
        return;
      }

      if (totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      
      const imagesProp = hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
    
      this.setState(prevState => ({
        totalHits,
        images: [...prevState.images, ...imagesProp],
      }));
    } catch (error) {
      Notiflix.Notify.failure(
        'An error occurred while fetching images Please try again later.'
      );
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSearchSubmit = async searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      totalHits: 0,
      images: [],
    });

    try {
      const { totalHits } = await fetchImages(searchQuery, 1);
      Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
      this.setState({ totalHits });
    } catch (error) {
      Notiflix.Notify.failure(
        'An error occurred while fetching images Please try again later.'
      );
    }
  };

  onLoadMoreClick = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onImageClick = modalImageUrl => {
    this.setState({ showModal: true, modalImageUrl });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, modalImageUrl: '' });
  };

  render() {
    const { isLoading, images, showModal, modalImageUrl, totalHits } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSearchSubmit} />

        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
              views={image.views}
              largeImageURL={image.largeImageURL}
              onImageClick={() => this.onImageClick(image.largeImageURL)}
            />
          ))}
        </ImageGallery>

        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            className="loader_center loader_overlay"
          />
        )}
        {!isLoading && totalHits !== images.length && (
          <Button onClick={this.onLoadMoreClick}>Load more</Button>
        )}
        {showModal && (
          <Modal onCloseModal={this.onCloseModal}>
            <img src={modalImageUrl} alt="modal" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;