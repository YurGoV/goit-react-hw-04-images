import React, {useEffect, useState} from "react";
import {Ul} from "./ImageGallery.styled";
import {GalleryItem} from "../GalleryItem/GalleryItem";
import {Modal} from "../Modal/Modal";
import {Gallery} from "./ImageGallery.styled";
import {Loader} from "../Loader/Loader";
import {ModalContent} from "../Modal/Modal.styled";
import {ButtonStyled} from "./ImageGallery.styled";
import {Message} from "../Messages/Messages";
import {perPage} from "../App";
import {toast} from "react-toastify";
import PropTypes from "prop-types";

/*
PROPS:
images={queryResponse}
page={page}
totalImages={totalImages}
loadMore={loadMore}
fetchError={fetchError}
*/

export const ImageGallery = ({images, page, totalImages, loadMore, fetchError}) => {
  const [modal, setModal] = useState(true);//todo: відмовитись від буліана - стейт машина + НаН. сюди - тільки валью
  const [imageOpacity, setImageOpacity] = useState(0);
  const [modalLoader, setModalLoader] = useState(true);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(false);


  useEffect(() => {
    console.log('useEffect');

    if (fetchError !== '') {// todo: додати в нову функцію
      return toast('Sorry, something is wrong  :(')
    }

    if (!images) {
      // this.setState({
      setLoading(false);
      // })
    }

    // if (prevProps.images !== this.props.images) {
    if (images.length > 0) {//todo: more?
      // this.setState({
        setLoading(true);
        setModal(true);//todo: ???
        setStatus('pending');
      // })
    } else if (images.length === 0 && fetchError === '') {
      if (!loading) {
        // this.setState({
        setStatus('empty');
        // })
      }
    }
  }, [fetchError, images, loading])

  // ============
  const onClick = (value) => {
    const {link, alt} = value.target.dataset;

    const imageLink = link;
    const imageAlt = alt
    if (value.target.nodeName === 'IMG' && link) {
      // this.setState({
      setModal({link: imageLink, alt: imageAlt});
      setModalLoader(true);//todo: status-pending?//NO. modalImage??
      setModalImage(true);
      // })
    }
  }

  const closeModal = () => {
    // this.setState({
      setModalLoader(true);
        setModal(false);
      setImageOpacity(0);
      setStatus('idle');
      setModalImage(false);
    // })
  }

  const onImgLoaded = () => {
    // this.setState({
      setImageOpacity(1);
      setModalLoader(false);
    // })
  }

  const onImagesLoaded = () => {
    // this.setState({
      setStatus('idle');
    // })
  }

  const onLoadMore = () => {
    // const page = page;
    loadMore(page + 1);
  }


  const LoadMoreBtn = () => {
    const pages = Math.ceil(totalImages / perPage);
    return page < pages;
  }

//=============
  return (
    <>
      <Gallery onClick={onClick}>

        {status === 'empty'
          && <Message>Sorry, we couldn't find any images according to your request :(</Message>}

        {status === 'pending'
          && <Modal value={modal} closeModal={closeModal}>
            <Loader loader={modalLoader} size={250}></Loader>
          </Modal>}

        {modalImage
          && <Modal value={modal} closeModal={closeModal}>
            <ModalContent opacityValue={imageOpacity}><img src={modal.link} onLoad={onImgLoaded}
                                                           alt={modal.alt}/></ModalContent>
            <Loader loader={modalLoader} size={250}></Loader>
          </Modal>
        }

        {loading
          && <Ul>
            <GalleryItem images={images} onImagesLoaded={onImagesLoaded}></GalleryItem>
          </Ul>}


      </Gallery>
      {LoadMoreBtn() && <ButtonStyled onClick={onLoadMore}>Load More</ButtonStyled>}
    </>
  )

}

// ======================
// ======================
/*

export class ImageGallery extends Component {

  state = {
    modal: true,//todo: відмовитись від буліана - стейт машина + НаН. сюди - тільки валью
    imageOpacity: 0,
    modalLoader: true,
    status: 'idle',
    loading: false,
    modalImage: false,
  }


  componentDidUpdate(prevProps, prevState) {
    const {fetchError, images} = this.props;

    if (fetchError !== '') {// todo: додати в нову функцію
      return toast('Sorry, something is wrong  :(')
    }

    if (!images) {
      this.setState({
        loading: false,
      })
    }

    if (prevProps.images !== this.props.images) {
      if (images.length > 0) {//todo: more?
        this.setState({
          loading: true,
          modal: true,//todo: ???
          status: 'pending',
        })
      } else if (images.length === 0 && fetchError === '') {
        if (!this.state.loading) {
          this.setState({
            status: 'empty',
          })
        }
      }
    }
  }


  onClick = (value) => {
    const {link, alt} = value.target.dataset;

    const imageLink = link;
    const imageAlt = alt
    if (value.target.nodeName === 'IMG' && link) {
      this.setState({
        modal: {link: imageLink, alt: imageAlt},
        modalLoader: true,//todo: status-pending?//NO. modalImage??
        modalImage: true,
      })
    }
  }

  closeModal = () => {
    this.setState({
      modalLoader: true,
      modal: false,
      imageOpacity: 0,
      status: 'idle',
      modalImage: false,
    })
  }

  onImgLoaded = () => {
    this.setState({
      imageOpacity: 1,
      modalLoader: false,
    })
  }

  onImagesLoaded = () => {
    this.setState({
      status: 'idle',
    })
  }

  loadMore = () => {
    const page = this.props.page;
    this.props.loadMore(page + 1);
  }

  render() {
    const {images, page} = this.props;
    const {modal, modalLoader, imageOpacity, status, loading, modalImage} = this.state;
    const LoadMoreBtn = () => {
      const pages = Math.ceil(this.props.totalImages / perPage);
      return page < pages;
    }

    return (
      <>
        <Gallery onClick={this.onClick}>

          {status === 'empty'
            && <Message>Sorry, we couldn't find any images according to your request :(</Message>}

          {status === 'pending'
            && <Modal value={modal} closeModal={this.closeModal}>
              <Loader loader={modalLoader} size={250}></Loader>
            </Modal>}

          {modalImage
            && <Modal value={modal} closeModal={this.closeModal}>
              <ModalContent opacityValue={imageOpacity}><img src={modal.link} onLoad={this.onImgLoaded}
                                                             alt={modal.alt}/></ModalContent>
              <Loader loader={modalLoader} size={250}></Loader>
            </Modal>
          }

          {loading
            && <Ul>
              <GalleryItem images={images} onImagesLoaded={this.onImagesLoaded}></GalleryItem>
            </Ul>}


        </Gallery>
        {LoadMoreBtn() && <ButtonStyled onClick={this.loadMore}>Load More</ButtonStyled>}
      </>
    )
  };
}


ImageGallery.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ]),
  page: PropTypes.number.isRequired,
  totalImages: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  fetchError: PropTypes.string,
};
*/

ImageGallery.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ]),
  page: PropTypes.number.isRequired,
  totalImages: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
  fetchError: PropTypes.string,
};


