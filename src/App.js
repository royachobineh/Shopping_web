import React, { useState, useEffect } from 'react';
import { UnsplashImage } from './components/UnsplashImage';
import { Loader } from './components/Loader';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
  }
`;

const WrapperImages = styled.section`
  width: calc(100% - 16px);
  margin-left: 8px;
`;
var offsetCounter = 0;
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImage] = useState([]);
  useEffect(() => {
    fetchImages();
  }, [])

  const fetchImages = (offset = 0) => {
    offset = offsetCounter;
    offsetCounter = offsetCounter + 60;
    const apiRoot = "https://xoosha.com";
    axios
      .get(`${apiRoot}/ws/1/test.php?offset=${offset}`)
      .then(res => {
        setImage([...images, ...res.data]);
      })

  }
  return (
    <div>
      <div className="searchBar">
        <input type="text" placeholder="Search..." onChange={event => {setSearchTerm(event.target.value)}}/>
      </div>
      <GlobalStyle />
      <InfiniteScroll
        dataLength={images.length}
        next={() => fetchImages(offsetCounter)}
        hasMore={true}
      >
        <WrapperImages>
          <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 500: 2, 900: 3, 1200: 4, 1400: 5, 1600: 6}}>
            <Masonry gutter="10px">
                {images.filter((val) => {
                  if (searchTerm == '') {
                    return val;
                  }
                  else if (val.description != null && val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                  }
                }).map((image, i) => (
                  <UnsplashImage url={image.image_url} alt={image.slug} label={image.name} price={image.price} site_url={image.url}/>
                ))}
            </Masonry>
          </ResponsiveMasonry>
        </WrapperImages>
      </InfiniteScroll>
    </div>
  );
}

export default App;
