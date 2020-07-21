<?php

namespace App\Controller;

use App\Service\MailChimpService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class ApiController extends AbstractController
{
    /** @var MailChimpService */
    private $mailchimp;

    /**
     * HomeController constructor.
     * @param MailChimpService $mailchimp
     */
    public function __construct(MailChimpService $mailchimp)
    {
        $this->mailchimp = $mailchimp;
    }

    /**
     * @Route("/campaigns", name="get_campaigns")
     */
    public function campaigns()
    {
        return new JsonResponse($this->mailchimp->getCampaignsList());
    }

    /**
     * @Route("/campaigns/replicate/{campaignId}", name="campaign_replicate")
     */
    public function campaignLaunch($campaignId)
    {
        if (is_null($campaignId)) {
            throw new \Exception("campaignId can not be null");
        }

        $launch = $this->mailchimp->campaignLaunch($campaignId);
        if (is_null($launch)) {
            return new JsonResponse(array("success" => true));
        }

        return new JsonResponse($launch);
    }

    /**
     * @Route("/conversations", name="get_conversations")
     */
    public function conversations()
    {
        return new JsonResponse($this->mailchimp->getConversations());
    }

    /**
     * @Route("/conversations/{conversationId}", name="get_messages_by_conversation")
     */
    public function messagesByConversation($conversationId)
    {
        if (is_null($conversationId)) {
            throw new \Exception("conversationId can not be null");
        }

        return new JsonResponse($this->mailchimp->getMessagesByConversation($conversationId));
    }
}
