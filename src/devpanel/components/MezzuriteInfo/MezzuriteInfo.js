import React, { Component } from 'react';
import MezzuriteDetails from './MezzuriteDetails.js';
import MezzuriteTimings from './MezzuriteTimings.js';
import MezzuriteInspector from '../../services/MezzuriteInspector.js';

class MezzuriteInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      mezzuriteFoundMessage: '',
      mezzuritePackage: '',
      mezzuriteVersion: '',
      timings: []
    };
  }

  componentDidMount () {
    MezzuriteInspector.getMezzuriteObjectAsync().then(value => {
      const strNotFound = 'Mezzurite has not been detected on this page';
      const strFound = 'Mezzurite has been detected on this page';

      if (value === undefined) {
        this.setState({ mezzuriteFoundMessage: strNotFound });
      } else {
        this.setState({ mezzuriteFoundMessage: strFound });
      }

      MezzuriteInspector.listenForTimingEvents(event => {
        this.setState({
          mezzuritePackage: event.Framework.name,
          mezzuriteVersion: event.Framework.version
        });

        this.setState({
          timings: [...this.state.timings, ...event.Timings]
        });
      });

      // Tell the background page to programmatically inject the content script.
      MezzuriteInspector.tellBackgroundToMountContentScript();
    });
  }

  componentWillUnMount () {

  }

  render () {
    return (
      <div className='MezzuriteInfo'>
        <MezzuriteDetails
          mezzuritePackage={this.state.mezzuritePackage}
          mezzuriteVersion={this.state.mezzuriteVersion}
        />
        <MezzuriteTimings
          timings={this.state.timings}
        />
      </div>
    );
  }
}

export default MezzuriteInfo;
