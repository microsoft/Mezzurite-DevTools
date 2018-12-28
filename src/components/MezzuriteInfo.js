import React, { Component } from 'react';

import MezzuriteInspector from '../MezzuriteInspector.js';

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
                    mezzuritePackage: `Mezzurite Package Name: ${event.Framework.name}`,
                    mezzuriteVersion: `Mezzurite Package Version: ${event.Framework.version}`
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
                <div id="mezzurite-found">{this.state.mezzuriteFoundMessage}</div>
                <div id="mezzurite-package">{this.state.mezzuritePackage}</div>
                <div id="mezzurite-version">{this.state.mezzuriteVersion}</div>
                <ul id="timings">
                    {timingItems}
                </ul>
            </div>
        );
    }
}

export default MezzuriteInfo;