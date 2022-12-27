import React, {Component} from "react";
import {Backdrop} from "./Modal.styled";
import {createPortal} from 'react-dom';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {

    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onBackdropClick = event => {

    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };


  render() {

    return createPortal(
      <Backdrop onClick={this.onBackdropClick}>
        {this.props.children}
      </Backdrop>,
      modalRoot,
    )
  }
}

Modal.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  closeModal: PropTypes.func.isRequired,
}


