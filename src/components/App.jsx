import React, {Component} from "react";
import {Searchbar} from "./Searchbar/Searchbar";
import {Div} from "./App.styled";
import {getImages} from "../services/fetchApi";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const perPage = 12;

export class App extends Component {

  state = {
    query: 'motorcycles',
    queryResponse: NaN,
    page: 1,
    totalImages: 0,
    loader: true,//todo: smallLoader
    fetchError: '',
  }

  async componentDidMount() {
    const {query, page, fetchError} = this.state;

    try {
      const response = await this.fetchImages(query, page, perPage);
      this.setState({
        queryResponse: response.hits,
        totalImages: response.totalHits,
        fetchError: '',
      })
    } catch (error) {
      if (fetchError !== '') {
        return
      }
      return this.setState({
        fetchError: error,
      })
    } finally {
      if (fetchError !== '') {
        return
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const {query, page} = this.state;

    if (this.state.query !== prevState.query) {
      try {
        const response = await this.fetchImages(query, page, perPage);

        if (response.hits.length === 0) {
          return toast('Sorry, we couldn\'t find any images according to your request :(')
        }
        return this.setState({
          queryResponse: response.hits,
          totalImages: response.totalHits,
          fetchError: '',
        })
      } catch (error) {
        this.setState({
          fetchError: error,
        })
      } finally {
        this.setState({
          loader: false,
        })
      }
    }

    if (this.state.query === prevState.query && this.state.page !== prevState.page) {
      try {
        const response = await this.fetchImages(query, page, perPage);
        return this.setState({
          queryResponse: [...this.state.queryResponse, ...response.hits],
          fetchError: '',
        })
      } catch (error) {
        this.setState({
          fetchError: error,
        })
      } finally {
        this.setState({
          loader: false,
        })
      }
    }
  }

  fetchImages = async (query, page, perPage) => {

    if (!this.state.loader) {
      this.loaderLoad(true);
    }
    const images = await getImages(query, page, perPage);
    this.loaderLoad(false);
    return await images;
  }

  searchOnQuery = (query) => {
    this.setState({
      query: query,
      page: 1,
    })
  }

  loadMore = (page) => {
    this.setState({
      page: page,
    })
  }

  loaderLoad = (status) => {
    this.setState({
      loader: status,
    })
  }

  render() {
    return (
      <Div>

        <Searchbar onSubmit={this.searchOnQuery} loader={this.state.loader}></Searchbar>

        <ImageGallery
          images={this.state.queryResponse}
          page={this.state.page}
          totalImages={this.state.totalImages}
          loadMore={this.loadMore}
          fetchError={this.state.fetchError}
        >
        </ImageGallery>

        <ToastContainer
          autoClose={2000}
          position="top-center"
          theme="light"
          transition={Zoom}
        />

      </Div>
    );
  };
}


