import React from "react";
import {Img, Li} from "./GalleryItem.styled";
import {perPage} from "../App";
import PropTypes from "prop-types";

export const GalleryItem = ({images, onImagesLoaded}) => {

  const totalImages = images.length;
  let loadedImages = 0;
  let newImages = 0;


  const onImagesLoad = () => {

    if (images.length > perPage) {
      newImages = images.length - (Math.floor(totalImages / perPage) - 1) * perPage;
      if (newImages > perPage) {
        newImages = newImages - perPage;
      }
    } else {
      newImages = images.length;
    }

    loadedImages += 1;
    if (loadedImages === newImages) {
      // console.log('all images Loaded');
      onImagesLoaded();
    }
  }

  return (
    <>
      {images.map(image => (
        <Li key={image.id}>
          <Img
            src={image.webformatURL}
            onLoad={onImagesLoad}
            loading="lazy"
            data-link={image.largeImageURL}
            data-alt={image.tags}
            dataset={'test'}
            alt={image.tags}>
          </Img>
        </Li>
      ))}
    </>
  );
};

GalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
  onImagesLoaded: PropTypes.func.isRequired,
}


