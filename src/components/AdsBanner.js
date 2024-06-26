import React from 'react';
import banner from '../images/banner.gif'

const AdsBanner = () => {

  return (
    <div style={{
      width: '100%',
    }}>
      <img src={banner} style={{ width: '100%' }} alt="Ads" />
    </div>
  );
};

export default AdsBanner;
