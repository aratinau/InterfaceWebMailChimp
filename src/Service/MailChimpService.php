<?php

namespace App\Service;

class MailChimpService
{
    private $api_endpoint;
    private $api_key;

    public function __construct()
    {
        $this->api_endpoint = $_ENV['MAILCHIMP_API'];
        $this->api_key = $_ENV['MAILCHIMP_KEY'];
    }

    public function makeRequest($url, $request_type = 'GET', $data = array())
    {
        if($request_type == 'GET')
            $url .= '?' . http_build_query($data);

        $mch = curl_init();
        $headers = array(
            'Content-Type: application/json',
            'Authorization: Basic ' . base64_encode('user:'. $this->api_key)
        );

        curl_setopt($mch, CURLOPT_URL, $url );
        curl_setopt($mch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($mch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($mch, CURLOPT_CUSTOMREQUEST, $request_type);
        curl_setopt($mch, CURLOPT_TIMEOUT, 10);
        curl_setopt($mch, CURLOPT_SSL_VERIFYPEER, false);

        if( $request_type != 'GET' ) {
            curl_setopt($mch, CURLOPT_POST, true);
            curl_setopt($mch, CURLOPT_POSTFIELDS, json_encode($data) );
        }

        return json_decode(curl_exec($mch));
    }

    public function getCampaignsList()
    {
        $url = $this->api_endpoint . '/campaigns';

        return $this->makeRequest($url, 'GET');
    }

    public function getConversations()
    {
        $url = $this->api_endpoint . '/conversations';

        return $this->makeRequest($url, 'GET');
    }

    public function getMessagesByConversation($conversationId)
    {
        $url = $this->api_endpoint . '/conversations/' . $conversationId . '/messages';

        return $this->makeRequest($url, 'GET');
    }

    /**
     * get a campaign Id, duplicate this campaign Id,
     * update-it to allow reply possibility and then send this new campaign
     *
     * @param $campaignId
     * @return mixed
     */
    public function campaignLaunch($campaignId)
    {
        $urlReplicate = $this->api_endpoint . '/campaigns/' . $campaignId . '/actions/replicate';

        $data = array("settings" => array("reply_to" => "true"));
        $replicateACampaign = $this->makeRequest($urlReplicate, 'POST', $data);
        $campaignId = $replicateACampaign->id;
        $actionSendUrl = $this->api_endpoint . '/campaigns/' . $campaignId . '/actions/send';

        return $this->makeRequest($actionSendUrl, 'POST');
    }
}
