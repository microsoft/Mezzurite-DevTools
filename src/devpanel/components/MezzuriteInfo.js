import React, { Component } from 'react';
import Container from './Container.js';
import MezzuriteInspector from '../services/MezzuriteInspector.js';

class MezzuriteInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mezzuriteFoundMessage: "",
            mezzuritePackage: "",
            mezzuriteVersion: "",
            timings: []
        };
    }

    componentDidMount() {
        MezzuriteInspector.getMezzuriteObjectAsync().then(value => {
            const strNotFound = "Mezzurite has not been detected on this page";
            const strFound = "Mezzurite has been detected on this page";

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

    componentWillUnMount() {

    }

    render() {
        const timingItems = this.state.timings.map(timing => 
            <li>{timing.metricType + ", " + timing.value + ", " + timing.data}</li>
        );
        return (
            <div className="MezzuriteInfo">
                <Container title="Mezzurite Framework Details">
                    <div id="mezzurite-package">
                        <span>Mezzurite Package Name: </span>{this.state.mezzuritePackage}
                    </div>
                    <div id="mezzurite-version">
                        <span>Mezzurite Package Version: </span>{this.state.mezzuriteVersion}
                    </div>
                </Container>
                <Container title="Mezzurite Timings">
                    <ul id="timings">
                        {timingItems}
                    </ul>
                </Container>
            </div>
        );
    }
}

export default MezzuriteInfo;