import React from 'react';
import { node, string } from 'prop-types';
import './Container.css';

const MezzuriteDetails = (props) => (
  <div className='Container'>
    { props.title &&
    <p className='title'>{props.title}</p>
    }
    {props.children}
  </div>
);

MezzuriteDetails.propTypes = {
  children: node,
  title: string
};

export default MezzuriteDetails;
