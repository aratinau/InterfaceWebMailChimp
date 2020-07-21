import axios from 'axios';
import { CAMPAIGNS_URL } from "../config";

async function findAll()
{
    return axios
        .get(CAMPAIGNS_URL)
        .then(response => {
            return response.data.campaigns;
        })
    ;
}

async function replicateCampaign(campaign_id)
{
    return axios
        .get(CAMPAIGNS_URL + '/replicate/' + campaign_id)
        .then(response => {
            return response;
        })
    ;
}

export default {
    findAll,
    replicateCampaign
};
