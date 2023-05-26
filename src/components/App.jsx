// // import React, { Component } from 'react';
// // import 'react-toastify/dist/ReactToastify.css';
// // import fetchImages from '../services/pixaby-api';
// // import Searchbar from './Searchbar/Searchbar';
// // import ImageGallery from './ImageGallery/ImageGallery';
// // import Button from './Button/Button';
// // import Loader from './Loader/Loader';
// // import Modal from './Modal/Modal';

// // class App extends Component {
// //   state = {
// //     query: '',
// //     page: 1,
// //     imagesOnPage: 0,
// //     totalImages: 0,
// //     isLoading: false,
// //     showModal: false,
// //     images: null,
// //     error: null,
// //     currentImageUrl: null,
// //     currentImageDescription: null,
// //   };

// //   componentDidUpdate(prevProps, prevState) {
// //     const { query, page } = this.state;
// //     const isQueryChanged = prevState.query !== query;
// //     const isPageChanged = prevState.page !== page && page !== 1;

// //     if (isQueryChanged || isPageChanged) {
// //       this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

// //       fetchImages(query, page)
// //         .then(({ hits, totalHits }) => {
// //           const imagesArray = hits.map(hit => ({
// //             id: hit.id,
// //             description: hit.tags,
// //             smallImage: hit.webformatURL,
// //             largeImage: hit.largeImageURL,
// //           }));

// //           let newImages;
// //           let newImagesOnPage;

// //           if (isQueryChanged) {
// //             newImages = imagesArray;
// //             newImagesOnPage = imagesArray.length;
// //           } else {
// //             newImages = [...this.state.images, ...imagesArray];
// //             newImagesOnPage = this.state.imagesOnPage + imagesArray.length;
// //           }

// //           this.setState({
// //             page: isQueryChanged ? 1 : page,
// //             images: newImages,
// //             imagesOnPage: newImagesOnPage,
// //             totalImages: totalHits,
// //           });
// //         })
// //         .catch(error => this.setState({ error }))
// //         .finally(() =>
// //           this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
// //         );
// //     }
// //   }

// //   getSearchRequest = query => {
// //     this.setState({ query });
// //   };

// //   onNextFetch = () => {
// //     this.setState(({ page }) => ({ page: page + 1 }));
// //   };

// //   toggleModal = () => {
// //     this.setState(({ showModal }) => ({ showModal: !showModal }));
// //   };

// //   openModal = e => {
// //     const currentImageUrl = e.target.dataset.large;
// //     const currentImageDescription = e.target.alt;

// //     if (e.target.nodeName === 'IMG') {
// //       this.setState(({ showModal }) => ({
// //         showModal: !showModal,
// //         currentImageUrl: currentImageUrl,
// //         currentImageDescription: currentImageDescription,
// //       }));
// //     }
// //   };

// //   render() {
// //     const {
// //       images,
// //       imagesOnPage,
// //       totalImages,
// //       isLoading,
// //       showModal,
// //       currentImageUrl,
// //       currentImageDescription,
// //     } = this.state;

// //     const getSearchRequest = this.getSearchRequest;
// //     const onNextFetch = this.onNextFetch;
// //     const openModal = this.openModal;
// //     const toggleModal = this.toggleModal;

// //     return (
// //       <>
// //         <Searchbar onSubmit={getSearchRequest} />

// //         {images && <ImageGallery images={images} openModal={openModal} />}
// //         {isLoading && <Loader />}

// //         {imagesOnPage >= 12 && imagesOnPage < totalImages && (
// //           <Button onNextFetch={onNextFetch} />
// //         )}

// //         {showModal && (
// //           <Modal
// //             onClose={toggleModal}
// //             currentImageUrl={currentImageUrl}
// //             currentImageDescription={currentImageDescription}
// //           />
// //         )}
// //       </>
// //     );
// //   }
// // }

// // export default App;

// // Другий варіант
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from '../services/pixaby-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    imagesOnPage: 0,
    totalImages: 0,
    isLoading: false,
    showModal: false,
    images: null,
    error: null,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const isQueryChanged = prevState.query !== query;
    const isPageChanged = prevState.page !== page && page !== 1;

    if (isQueryChanged || isPageChanged) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          let newImages;
          let newImagesOnPage;

          if (isQueryChanged) {
            newImages = imagesArray;
            newImagesOnPage = imagesArray.length;
          } else {
            newImages = [...this.state.images, ...imagesArray];
            newImagesOnPage = this.state.imagesOnPage + imagesArray.length;
          }

          this.setState({
            page: isQueryChanged ? 1 : page,
            images: newImages,
            imagesOnPage: newImagesOnPage,
            totalImages: totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  getSearchRequest = query => {
    this.setState({ query });
  };

  onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(showModal => ({ showModal: !showModal }));
  };
  openModal = (imageUrl, imageDescription) => {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal,
      currentImageUrl: imageUrl,
      currentImageDescription: imageDescription,
    });
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      isLoading,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.getSearchRequest} />

        {images && <ImageGallery images={images} openModal={this.openModal} />}
        {isLoading && <Loader />}

        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={this.onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={this.toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
      </>
    );
  }
}

export default App;
