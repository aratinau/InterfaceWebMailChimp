import React, { Component } from 'react';
import CampaignsManagerAPI from "../manager/campaignsManager";

class Campaigns extends Component {

    constructor(props) {
        super(props);

        this.state = {
            campaigns: [],
            loading: false
        };

        this.getCampaigns = this.getCampaigns.bind(this);
        this.replicateCampaign = this.replicateCampaign.bind(this);
    }

    componentDidMount() {
        this.getCampaigns()
    }

    getCampaigns = async () => {
        try {
            const data = await CampaignsManagerAPI.findAll();
            this.setState({
                campaigns: data,
                loading: false
            });
        } catch (error) {
            console.log(error)
        }
    };

    replicateCampaign = async (campaignId) => {
        try {
            await CampaignsManagerAPI.replicateCampaign(campaignId).then(
                this.getCampaigns()
            );
        } catch (error) {
            console.log(error)
        }
    }

    render() {

        return (
            <div className="container pt-5 pb-2">
                <h2>Campaigns</h2>
                <ul className="list-group">
                </ul>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Campaign Id</th>
                        <th>Title</th>
                        <th>Send Time</th>
                        <th>Status</th>
                        <th>Archive</th>
                        <th>Replicate</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.campaigns.map(campaign => (
                            <tr key={campaign.id}>
                                <td>{campaign.id}</td>
                                <td>{campaign.settings.title}</td>
                                <td>{campaign.send_time}</td>
                                <td>{campaign.status}</td>
                                <td>
                                    <a href={campaign.long_archive_url}><button className="btn btn-secondary">Archive</button></a>
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={() => {this.replicateCampaign(campaign.id)}}>Replicate</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Campaigns;
