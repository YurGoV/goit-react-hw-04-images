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
  const prevQuery = useRef('motorcycles');
  const prevPage = useRef(1);


  useEffect(() => {

    if (!queryResponse || prevQuery.current !== query || prevPage.current !== page) {

      loaderLoad(true)

      const fetch = async () => {

        const response = await getImages(query, page, perPage);

        loaderLoad(false);
        //
        if (response.name === 'AxiosError') {
          return toast('Sorry, something is wrong  `:( ')
        }

        if (response.hits.length === 0) {
          setQuery(prevQuery.current);
          setPage(prevPage.current);
          return toast('Sorry, we couldn\'t find any images according to your request :(');
        }


        if (prevQuery.current !== query) {
          prevQuery.current = query
        }
        if (prevPage.current !== page) {
          prevPage.current = page
        }

        if (page === 1) {
          setQueryResponse(response.hits);
          setTotalImages(response.totalHits);
        } else {
          prevPage.current = page;
          setQueryResponse([...queryResponse, ...response.hits]);
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
}

