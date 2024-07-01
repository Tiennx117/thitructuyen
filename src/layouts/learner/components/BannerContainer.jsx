import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from 'primereact/sidebar';
import Slider from "react-slick";
import { Image } from 'components/Image';
import './style/BannerContainer.scss';
function BannerContainer(props) {
  const { onClose } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }; 
  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div>
        <i onClick={() => onClose()} style={{ fontSize: 30, color: '#ffff', cursor: 'pointer', position: 'absolute', top: '3%', zIndex: 9, right: '3%' }} class="fa-regular fa-circle-xmark"></i>
      </div>
      <Slider {...settings}>
        <a href='/learner/featured-course'>
          <Image style={{ height: 400, width: '100%' }} src='https://primefaces.org/cdn/primereact/images/galleria/galleria8.jpg'></Image>
        </a>
        <a href='/learner/featured-course'>
          <Image style={{ height: 400, width: '100%' }} src='https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg'></Image>
        </a>
        <a href='/learner/featured-course'>
          <Image style={{ height: 400, width: '100%' }} src='https://primefaces.org/cdn/primereact/images/galleria/galleria6.jpg'></Image>
        </a>
        <a href='/learner/featured-course'>
          <Image style={{ height: 400, width: '100%' }} src='https://primefaces.org/cdn/primereact/images/galleria/galleria5.jpg'></Image>
        </a>
        <a href='/learner/featured-course'>
          <Image style={{ height: 400, width: '100%' }} src='https://primefaces.org/cdn/primereact/images/galleria/galleria4.jpg'></Image>
        </a>

      </Slider>
    </div>

  );
}

export default BannerContainer;