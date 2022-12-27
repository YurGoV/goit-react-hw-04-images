import React from "react";
import {Formik, Form, Field} from 'formik';
import {Button, Input, Span} from "./SearchForm.styled";
import {Loader} from "../Loader/Loader";
import {toast} from "react-toastify";
import PropTypes from "prop-types";


export const SearchForm = ({onSubmit, loader}) => {

  const onFormicSubmit = (values, {resetForm}) => {
    if (values.query.trim() === '') {
      return toast('please input what you want to find')
    }

    onSubmit(values.query, 1);
    resetForm();
  }

  return (
    <Formik initialValues={{query: ''}} onSubmit={onFormicSubmit}>

      <Form>
        <Button type="submit">
          <Loader loader={loader}></Loader>
          {!loader &&
            <Span>Search</Span>
          }
        </Button>

        <Field
          as={Input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </Form>

    </Formik>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loader: PropTypes.bool,
}
