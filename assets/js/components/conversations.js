import React, {Component, Fragment} from 'react';
import ConversationsManagerAPI from "../manager/convesationsManager";

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };

        this.getMessagesByConversation = this.getMessagesByConversation.bind(this);
    }

    componentDidMount() {
        this.getMessagesByConversation()
    }

    getMessagesByConversation = async () => {
        try {
            const conversationID = this.props.conversationID;
            const data = await ConversationsManagerAPI.getMessagesByConversation(conversationID);
            this.setState({
                messages: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <Fragment>
                {this.state.messages.map(message => (
                    <div key={message.id}>
                        <div>from: {message.from_email}</div>
                        <div>content: {message.message}</div>
                    </div>
                ))}
            </Fragment>
        )
    }
}

class Conversations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conversations: [],
        };

        this.getConversations = this.getConversations.bind(this);
    }

    componentDidMount() {
        this.getConversations()
    }

    getConversations = async () => {
        this.setState({});
        try {
            const data = await ConversationsManagerAPI.findAll();
            this.setState({
                conversations: data
            });
        } catch (error) {
            console.log(error)
        }
    };

    render() {

        return (
            <div className="container pt-5">
                <button className="btn btn-primary float-right" onClick={() => {this.getConversations()}}>Reload Conversation</button>
                <h2>Conversations</h2>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Campaign Id</th>
                        <th>From</th>
                        <th>Message Count</th>
                        <th>Subject</th>
                        <th>Last Message</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.conversations.map(conversation => (
                            <tr key={conversation.id}>
                                <td>{conversation.campaign_id}</td>
                                <td>{conversation.from_email}</td>
                                <td>{conversation.message_count}</td>
                                <td>{conversation.subject}</td>
                                <td>
                                    <Messages conversationID={conversation.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Conversations;
