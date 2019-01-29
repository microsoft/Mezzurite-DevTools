import React from 'react';

import './MainLoading.css';

const MainLoading = () => (
  <div className='capture-cycle--card capture-cycle--skeleton'>
    <div className='capture-cycle--skeleton-title shimmer' />
    <div className='capture-cycle--skeleton-container'>
      <div className='capture-cycle--skeleton-component shimmer' />
      <div className='capture-cycle--skeleton-component shimmer' />
      <div className='capture-cycle--skeleton-component shimmer' />
    </div>
  </div>
);

export default MainLoading;
