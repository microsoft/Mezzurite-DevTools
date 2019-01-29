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
      MezzuriteInspector.listenForTimingEvents((event) => this.handleTimingEvent(event));
    });
  }

  handleTimingEvent (event) {
    const formattedTimings = formatTimingsEvent(event);

    if (formattedTimings != null) {
      if (formattedTimings.applicationLoadTime != null && this.state.applicationLoadTime == null) {
        this.setState({ applicationLoadTime: formattedTimings.applicationLoadTime });
      }

      if (this.state.framework.name == null && this.state.framework.version == null) {
        this.setState({ framework: formattedTimings.framework });
      }

      if (
        formatTimingsEvent.insideViewportComponents != null ||
        formatTimingsEvent.outsideViewportComponents != null
      ) {
        const captureCycle = {
          insideViewportComponents: formattedTimings.insideViewportComponents,
          outsideViewportComponents: formattedTimings.outsideViewportComponents,
          time: formattedTimings.time,
          viewportLoadTime: formattedTimings.viewportLoadTime
        };

        this.setState((previousState) => {
          if (previousState.captureCycles != null) {
            return { captureCycles: [ captureCycle, ...previousState.captureCycles ] };
          } else {
            return { captureCycles: [ captureCycle ] };
          }
        });
      }
    }
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
