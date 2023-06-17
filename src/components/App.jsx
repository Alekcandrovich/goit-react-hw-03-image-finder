import React, { Component } from 'react';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Loader from './Loader';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Modal from './Modal';
import { fetchImages } from '../servise/api';

const lightbox = new SimpleLightbox('.gallery_item a');

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
    if (this.state.images !== prevState.images) {
      lightbox.refresh();
    }
  }

  onSearchSubmit = async (searchQuery) => {
    this.setState({
      searchQuery,
      page: 1,
      totalHits: 0,
      images: [],
      isLoading: true,
    });

    const data = await fetchImages(searchQuery, this.state.page);

    if (!data) {
      Notiflix.Notify.failure(
        'An error occurred while fetching images Please try again later.'
      );
      this.setState({ isLoading: false });
      return;
    }

    const { totalHits, hits } = data;

    if (totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      this.setState({ isLoading: false });
      return;
    }

    this.setState({
      totalHits,
      images: hits,
      isLoading: false,
    });

    if (totalHits > 12) {
      this.setState({ showLoadMoreButton: true });
    }

    Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
  };

  onLoadMoreClick = async () => {
    this.setState({ isLoading: true });

    const nextPage = this.state.page + 1;
    const data = await fetchImages(this.state.searchQuery, nextPage);

    if (!data) {
      Notiflix.Notify.failure(
        'An error occurred while loading more images. Please try again later.'
      );
      this.setState({ isLoading: false });
      return;
    }

    const images = [...this.state.images, ...data.hits];

    this.setState({
      page: nextPage,
      images,
      isLoading: false,
    });
  };

  onImageClick = (modalImageUrl) => {
    this.setState({ showModal: true, modalImageUrl });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, modalImageUrl: '' });
  };

  render() {
    const { isLoading, images, showModal, modalImageUrl } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSearchSubmit} />

        {isLoading ? (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            className="center"
          />
        ) : (
          <>
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
            {images.length > 0 && (
              <Button onClick={this.onLoadMoreClick}>Load more</Button>
            )}
          </>
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