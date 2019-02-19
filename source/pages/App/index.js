// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Scheduler from "../../components/Scheduler";
import { connect } from "react-redux";

// Components
const mapStateToProps = (state) => {
    return {
        state,
    };
};

@hot(module)
@connect(mapStateToProps)
export default class App extends Component {
    render () {
        return <Scheduler />;
    }
}
