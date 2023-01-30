<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TopAssistController extends AbstractController
{
    #[Route('/topassist', name: 'app_top_assist')]
    public function index(): Response
    {
        return $this->render('top_assist/index.html.twig');
    }
}
