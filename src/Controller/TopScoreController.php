<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TopScoreController extends AbstractController
{
    #[Route('/topbut', name: 'app_topbut')]
    public function index(): Response
    {
        return $this->render('top_score/index.html.twig' );
    }
}
