import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './modal.module.css';

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { children } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <button
            type="button"
            className={css.closeButton}
            onClick={this.props.onCloseModal}
          ></button>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;