import {useEffect, useRef, useState} from "react";
import {Ul} from "./ImageGallery.styled";
import {GalleryItem} from "../GalleryItem/GalleryItem";
import {Modal} from "../Modal/Modal";
import {Gallery} from "./ImageGallery.styled";
import {Loader} from "../Loader/Loader";
import {ModalContent} from "../Modal/Modal.styled";
import {ButtonStyled} from "./ImageGallery.styled";
import {Message} from "../Messages/Messages";
import {perPage} from "../App";
import PropTypes from "prop-types";
import {animateScroll as scroll} from 'react-scroll'

export const ImageGallery = ({images, page, totalImages, loadMore}) => {
  const [modal, setModal] = useState(true);//todo: відмовитись від буліана - стейт машина + НаН. сюди - тільки валью
  const [imageOpacity, setImageOpacity] = useState(0);
  const [modalLoader, setModalLoader] = useState(true);
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(false);
  const prevWindowHeight = useRef(0);


  useEffect(() => {

    if (!images) {
      setLoading(false);
    }

    if (images.length > 0) {
      setLoading(true);
      // setModal(true);
      setStatus('pending');
    }
  }, [images, loading])

  const onClick = (value) => {
    const {link, alt} = value.target.dataset;

    const imageLink = link;
    const imageAlt = alt
    if (value.target.nodeName === 'IMG' && link) {
      setModal({link: imageLink, alt: imageAlt});
      setModalLoader(true);//todo: status-pending?//NO. modalImage??
      setModalImage(true);
    }
  }

  const closeModal = () => {
    setModalLoader(true);
    setModal(false);
    setImageOpacity(0);
    setStatus('idle');
    setModalImage(false);
  }

  const onImgLoaded = () => {
    setImageOpacity(1);
    setModalLoader(false);
  }

  const onImagesLoaded = () => {
    setStatus('idle');
    if (page === 1) {
      prevWindowHeight.current = document.body.scrollHeight;//todo: переробити - винести за  імгЛоад
    }
    if (page > 1) {
      scroll.scrollTo(prevWindowHeight.current - 100);//todo: замінити 100 на висоту футера
      prevWindowHeight.current = document.body.scrollHeight;
    }
  }

  const onLoadMore = () => {
    loadMore(page + 1);
  }


  const LoadMoreBtn = () => {
    const pages = Math.ceil(totalImages / perPage);
    return page < pages;
  }

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


ImageGallery.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
  ]),
  page: PropTypes.number.isRequired,
  totalImages: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired,
};


