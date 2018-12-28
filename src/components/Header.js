import React, { Component } from 'react';

class Header extends Component {

    componentDidMount() {
        
    }

    componentWillUnMount() {

    }

    render() {
        return (
            <header className="Header">
                <img src='./icon.png'></img>
                <h1>Mezzurite Developer Tools</h1>
            </header>
        );
    }
}

export default Header;