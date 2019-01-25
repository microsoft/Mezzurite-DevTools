import React, { Component } from 'react';

import MezzuriteInspector from '../services/MezzuriteInspector';
import formatTimingsEvent from '../utilities/formatTimingsEvent';
import './App.css';
import Footer from './Footer/Footer.js';
import Header from './Header/Header.js';
import Main from './Main/Main.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      applicationLoadTime: null,
      captureCycles: null,
      framework: {
        name: null,
        version: null
      }
    };
  }

  componentDidMount () {
    MezzuriteInspector.isMezzuritePresentAsync().then(() => {
      MezzuriteInspector.listenForTimingEvents(event => {
        const formattedTimings = formatTimingsEvent(event);

        if (formattedTimings.applicationLoadTime != null) {
          this.setState({ applicationLoadTime: formattedTimings.applicationLoadTime });
        }

        if (formattedTimings.componentTimings != null && formattedTimings.componentTimings !== []) {
          this.setState((previousState) => {
            const captureCycles = {
              componentTimings: formattedTimings.componentTimings,
              time: formattedTimings.time
            };

            if (previousState.captureCycles != null) {
              return { captureCycles: [ captureCycles, ...previousState.captureCycles ] };
            } else {
              return { captureCycles: [ captureCycles ] };
            }
          });
        }

        this.setState({ framework: formattedTimings.framework });
      });

      // Tell the background page to programmatically inject the content script.
      MezzuriteInspector.tellBackgroundToMountContentScript();
    });
  }

  render () {
    return (
      <div className='app'>
        <Header />
        <Main applicationLoadTime={this.state.applicationLoadTime} captureCycles={this.state.captureCycles} />
        <Footer packageName={this.state.framework.name} packageVersion={this.state.framework.version} />
      </div>
    );
  }
}

export default App;
