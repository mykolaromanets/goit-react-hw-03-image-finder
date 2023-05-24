import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { BsXLg } from 'react-icons/bs';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, currentImageUrl, currentImageDescription } = this.props;

    return createPortal(
      <div className="Backdrop__styled" onClick={this.handleClickBackdrop}>
        <div className="Modal__styled">
          <div className="Modal__wrapper">
            <button className="Modal__btn" type="button" onClick={onClose}>
              <BsXLg className="Modal_icon" />
            </button>
          </div>
          <img src={currentImageUrl} alt={currentImageDescription} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
