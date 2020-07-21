import React, {Component, Fragment} from 'react';
import Campaigns from "../components/campaigns";
import Conversations from "../components/conversations";

class Home extends Component {

    render() {
        return (
            <Fragment>
                <Campaigns />
                <Conversations />
            </Fragment>
        )
    }
}

export default Home;
