import React from 'react';
import styled from 'styled-components';
import '../App.css';
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #eee;
`;

export const UnsplashImage = ({ url, alt, label, price, site_url }) => {
  return (
    <>
      <a href={site_url} target="_blank">
        <figure>
          <div className="imgBox">
            <Img src={url} alt={alt} />
            <div className="description">
              <p>{label}</p>
            </div>
            <div className="price">
              <p>{price}</p>
            </div>
          </div>
        </figure>
      </a>
    </>
  )
}
