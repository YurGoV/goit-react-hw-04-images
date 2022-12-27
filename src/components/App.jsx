import React, {useEffect, useRef, useState} from "react";
import {Searchbar} from "./Searchbar/Searchbar";
import {Div} from "./App.styled";
import {getImages} from "../services/fetchApi";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const perPage = 12;


export const App = () => {
  const [query, setQuery] = useState('motorcycles');
  const [queryResponse, setQueryResponse] = useState(NaN);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [loader, setLoader] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const prevQueryResponse = useRef(NaN);
  const prevQuery = useRef('motorcycles');
  const prevPage = useRef(1);


  useEffect(() => {

    console.log('prevQR: ', prevQueryResponse.current);

    if (!queryResponse || prevQuery.current !== query || prevPage.current !== page) {
      // console.log('qr ',queryResponse);
      // console.log('pq: ', prevQuery.current);
      // console.log('q: ',query);
      // console.log('pp: ', prevPage.current);
      // console.log('p: ', page);

      if (prevQuery.current !== query) {
        prevQuery.current = query
      }
      if (prevPage.current !== page) {
        prevPage.current = page
      }

      loaderLoad(true)

      const fetch = async () => {

        const response = await getImages(query, page, perPage);
        console.log(response.hits);
        console.log(queryResponse);

        loaderLoad(false);
        //

        if (response.hits.length === 0) {
          return toast('Sorry, we couldn\'t find any images according to your request :(');
        }
        //
        console.log('nozerro answer');

        if (page === 1) {
          setQueryResponse(response.hits);
          setTotalImages(response.totalHits);
          setFetchError('');
        } else {
          setQueryResponse([...queryResponse, ...response.hits]);
          setFetchError('');
         }
      }
      fetch();
    }

  }, [page, query, queryResponse])


  const searchOnQuery = (query) => {
    setQuery(query);
    setPage(1);
  }

  const loadMore = (page) => {
    setPage(page);
  }

  const loaderLoad = (status) => {
    setLoader(status);
    // })
  }


  return (
    <Div>

      <Searchbar onSubmit={searchOnQuery} loader={loader}></Searchbar>

      <ImageGallery
        images={queryResponse}
        page={page}
        totalImages={totalImages}
        loadMore={loadMore}
        fetchError={fetchError}
      >
      </ImageGallery>
      {/*<NewImageGallery*/}
      {/*  images={queryResponse}*/}
      {/*  page={page}*/}
      {/*  totalImages={totalImages}*/}
      {/*  loadMore={loadMore}*/}
      {/*  fetchError={fetchError}*/}
      {/*>*/}
      {/*</NewImageGallery>*/}

      <ToastContainer
        autoClose={2000}
        position="top-center"
        theme="light"
        transition={Zoom}
      />

    </Div>
  );

}

/*

export class OldApp extends Component {

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

        if (response.hits.length === 0) {//todo: повертати у попередній стан, щоб можна було тиснути лоадмор із попереднім запитом
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

*/

