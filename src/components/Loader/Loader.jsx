import React from "react";
import {Rings} from 'react-loader-spinner';
import PropTypes from "prop-types";

export const Loader = ({loader, size = 50}) => {
  return (
    <div>
      <Rings
        height={size}
        width={size}
        color="#3f51b5"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={loader}
        ariaLabel="rings-loading"
      />
    </div>
  )
}

Loader.propTypes = {
  loader: PropTypes.bool.isRequired,
  size: PropTypes.number,
}
