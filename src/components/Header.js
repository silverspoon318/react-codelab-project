import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <a className="brand-logo center">MEMOPAD</a>

                        <ul>
                            <li>
                                <a>
                                    <i className="material-icons">search</i>
                                </a>
                            </li>
                        </ul>

                        <div className="right">
                            <ul>
                                <li>
                                    <a>
                                        <i className="material-icons">vpn_key</i>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="material-icons">lock_open</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
