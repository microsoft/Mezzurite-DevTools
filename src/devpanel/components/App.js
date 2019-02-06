import React, { Component } from 'react';
import Modal from 'react-modal';

import Connection from '../utilities/Connection';
import Subscriber from '../utilities/Subscriber';
import formatTimingsEvent from '../utilities/formatTimingsEvent';

import './App.css';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import HelpDialog from './HelpDialog/HelpDialog';
import Main from './Main/Main';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      applicationLoadTime: null,
      captureCycles: null,
      helpDialogOpen: false,
      loading: true,
      framework: {
        name: null,
        version: null
      }
    };

    Modal.setAppElement('#root');

    this.onHelpDialogClose = this.onHelpDialogClose.bind(this);
    this.onHelpDialogOpen = this.onHelpDialogOpen.bind(this);
  }

  componentDidMount () {    
    // Obtain the inspected window's tab ID
    // TODO: this should honestly be passed into App as a prop...
    const inspectedWindowTabId = chrome.devtools.inspectedWindow.tabId;

    // Set up the background page connection
    const backgroundPageConnection = new Connection();
    backgroundPageConnection.connect('devtools-page');

    // Set up handlers for events or topics of interest that may come through the background page connection
    // TODO: add handlers for events that indicate whether or not Mezzurite was found, which are currently available
    const subscriber = new Subscriber(backgroundPageConnection);
    subscriber.connect();
    subscriber.subscribeToTopic('timing', timingEvent => this.handleTimingEvent(timingEvent));

    // Notify the background page that we are ready to receive events
    backgroundPageConnection.postMessage({
      action: 'init',
      tabId: inspectedWindowTabId
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
        formattedTimings.insideViewportComponents != null ||
        formattedTimings.outsideViewportComponents != null
      ) {
        const captureCycle = {
          insideViewportComponents: formattedTimings.insideViewportComponents,
          outsideViewportComponents: formattedTimings.outsideViewportComponents,
          routeUrl: formattedTimings.routeUrl,
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

      this.setState({ loading: false });
    }
  }

  onHelpDialogClose () {
    this.setState({ helpDialogOpen: false });
  }

  onHelpDialogOpen () {
    this.setState({ helpDialogOpen: true });
  }

  render () {
    return (
      <div className='app'>
        <Header />
        <Main
          applicationLoadTime={this.state.applicationLoadTime}
          captureCycles={this.state.captureCycles}
          loading={this.state.loading}
          onHelpClick={this.onHelpDialogOpen}
        />
        <Footer packageName={this.state.framework.name} packageVersion={this.state.framework.version} />
        <Modal
          isOpen={this.state.helpDialogOpen}
          className='modal'
          contentLabel='Help Dialog'
          onRequestClose={this.onHelpDialogClose}
          overlayClassName='overlay'
          shouldFocusAfterRender
          shouldCloseOnOverlayClick
          shouldCloseOnEsc
          shouldReturnFocusAfterClose
        >
          <HelpDialog
            onCloseClick={this.onHelpDialogClose}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
