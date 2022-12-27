import React from "react";
import {Header} from "./Searchbar.styled";
import {SearchForm} from "../SearchForm/SearchForm";
import PropTypes from "prop-types";

export const Searchbar = ({onSubmit, loader}) => {

  return (
    <Header>
      <SearchForm loader={loader} onSubmit={onSubmit}></SearchForm>
    </Header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loader: PropTypes.bool,
}

