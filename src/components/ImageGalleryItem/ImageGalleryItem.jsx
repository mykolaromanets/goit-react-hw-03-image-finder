import PropTypes from 'prop-types';
import './ImageGalleryItemStyled.css';

function ImageGalleryItem({ description, smallImage, largeImage, openModal }) {
  return (
    <li
      className="Item__styled"
      onClick={() => openModal(largeImage, description)}
    >
      <img
        src={smallImage}
        alt={description}
        data-large={largeImage}
        className="Item__image"
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
