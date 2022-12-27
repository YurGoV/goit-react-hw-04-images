import React from "react";//todo: в окрему папку
import {MessageStyle} from "./Messages.styled";
import PropTypes from "prop-types";


export const Message = (props) => {

  const children = props.children;

  return (
    <MessageStyle>
      <h1>{children}</h1>
    </MessageStyle>
  )
}

Message.propTypes = {
  children: PropTypes.string.isRequired,
}
