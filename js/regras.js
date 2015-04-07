/**
 * @package     Cattive.Site
 * @subpackage  Templates.cattive
 *
 * @copyright   Copyright (C) 2015, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/* global  $, Pace, document, window,  classie, setTimeout */

$(function () {

    var SubMenuShow = false;
    var larguraDaTela = 0;
    var travaMenu = false;


    limparMenu();

    larguraDaTela = $(document).width() - 730;
    larguraDaTela = (larguraDaTela / 2);

    $(window).resize(function (event) {

        if ($(document).width() <= 730) {
            travaMenu = true;
        } else {
            travaMenu = false;
        }
        larguraDaTela = $(document).width() - 730;
        larguraDaTela = (larguraDaTela / 2);
    });

    if ($(document).width() <= 730) {
        travaMenu = true;
    } else {
        travaMenu = false;
    }


    /* Limpa o conteúdo interno do submenu */
    function limparMenu() {
        $('#sub-menu-show .row>div, #sub-menu-show').not('[class*="col-xs"]').css('display', 'none');
    }

    /* Remove o submenu da tela se clicar em qualquer parte da tela */
    $('body').on('click', function () {
        if (SubMenuShow === true) {
            $('#sub-menu-show .row>div, #sub-menu-show').not('[class*="col-xs"]').css('display', 'none');
            SubMenuShow = false;
        }
    });


    $.each($('.menu-principal li'), function (index, value) {
        $(this).children('a').unbind('mouseover');

        $('#sub-menu-show').mouseover(function () {
            $(this).mouseleave(function () {
                if (SubMenuShow === true) {

                    $(this).css('display', 'none');
                    limparMenu();
                    SubMenuShow = false;
                }
            });

        });

        $(this).children('a').on('mouseover', function () {
            if (travaMenu === false) {

                if (SubMenuShow === true) {

                    $('#sub-menu-show').css('display', 'none');
                    limparMenu();
                    SubMenuShow = false;
                }

                var href = $(this).attr('href');
                var posicao = $(this).offset().left;
                posicao = posicao - larguraDaTela;

                $('.arrow-up').css('margin-left', posicao + 'px');
                $('.arrow-up-border').css('margin-left', posicao + 'px');


                if (SubMenuShow === false) {
                    var left = ($(this).width() / 2) - 30;

                    $('.arrow-up, .arrow-up-border').css({
                        'left': left.toString() + 'px'
                    });
                    $('#sub-menu-show, .arrow-up, .arrow-up-border').css('display', 'block');
                    $('#menu-' + href.substring(1)).css('display', 'block');
                    SubMenuShow = true;
                }
            }
        });
    });


    /* Coloca a barra de progresso azul depois que terminar de carregar */
    Pace.on('done', function () {
        $('.pace-progress').addClass('pace-inactive');
        $('.pace-progress').css('display', 'block');
        $('.pace-progress').removeClass('pace-progress');
    });


    /* Chamar o Slider */
    $("#slider-topo").owlCarousel({
        autoPlay: 5000,
        singleItem: true,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1000,
        mouseDrag: false

    });

    $("#slider-videos").owlCarousel({
        pagination: false
    });

    $("#slider-mais-noticias").owlCarousel({
        pagination: false
    });

    $("#slider-podcast").owlCarousel({
        singleItem: true,
        pagination: false
    });


    /* Setas do Slider */
    /* Videos */
    $('.slider-seta-esquerda-videos').click(function () {
        var owl = $("#slider-videos").data('owlCarousel');
        owl.prev();
    });
    $('.slider-seta-direita-videos').click(function () {
        var owl = $("#slider-videos").data('owlCarousel');
        owl.next();
    });

    /* Podcast */
    $('.slider-seta-esquerda-podcast').click(function () {
        var owl = $("#slider-podcast").data('owlCarousel');
        owl.prev();
    });
    $('.slider-seta-direita-podcast').click(function () {
        var owl = $("#slider-podcast").data('owlCarousel');
        owl.next();
    });

    /* + Noticias */
    $('.slider-seta-esquerda-maisNoticias').click(function () {
        var owl = $("#slider-mais-noticias").data('owlCarousel');
        owl.prev();
    });
    $('.slider-seta-direita-maisNoticias').click(function () {
        var owl = $("#slider-mais-noticias").data('owlCarousel');
        owl.next();
    });

    /* Efeito no Carousel
	$('.efeito-img-noticia').mouseover(function{
		$('.sombra-img-noticia')
	}); */


    /* Ativar/Desativar Img Shadow do submenu */
    $('.ativar-shadow').mouseover(function () {
        $(this).addClass('img-shadow');
    });
    $('.ativar-shadow').mouseleave(function () {
        $(this).removeClass('img-shadow');
    });

    /* Ativar/Desativar Img Shadow do slider-videos */
    var travarMouseOver = false;
    $('.ativar-shadow-videos').mouseover(function () {
        if (travarMouseOver === false) {
            $(this).find('.efeito-img-shadow').removeClass('container-slider-videos-img');
            $(this).find('.efeito-img-shadow').addClass('container-slider-videos-img-active');

            $(this).find('.txt-slider-videos').animate({
                "bottom": "+=7px"
            }, 200);

            $(this).addClass('img-shadow-videos');
            travarMouseOver = true;
        }

    });
    $('.ativar-shadow-videos').mouseleave(function () {
        $(this).find('.efeito-img-shadow').removeClass('container-slider-videos-img-active');
        $(this).find('.efeito-img-shadow').addClass('container-slider-videos-img');
        $(this).find('.txt-slider-videos').animate({
            "bottom": "-=7px"
        }, 200);
        $(this).removeClass('img-shadow-videos');
        travarMouseOver = false;
    });

    $(window).scroll(function () {
        if ($(document).scrollTop() > 50) {
            $('nav').find('.menu-superior').hide();
            $('nav').addClass('shrink');
            /*$('nav').find('.menu-inferior').animate({height: "10px"}, 500)*/
            $('.pace-inactive').css('display', 'none');
        } else {
            $('nav').removeClass('shrink');
            $('nav').find('.menu-superior').fadeIn('slow');
            $('.pace-inactive').css('display', 'block');

        }
    });


    /* Efeito para ativar o hover nas img que tem border-bottom no efeito */
    $('.efeito-slider-maisNoticias').mouseover(function () {
        $(this).find('ul li a').addClass('img-noticia-a-hover');
        $(this).find('ul li a img').addClass('img-noticia-img-hover');
        $(this).find('a').addClass('efeito-slider-maisNoticias-a-hover');
    });

    $('.efeito-slider-maisNoticias').mouseleave(function () {
        $(this).find('ul li a').removeClass('img-noticia-a-hover');
        $(this).find('ul li a img').removeClass('img-noticia-img-hover');
        $(this).find('a').removeClass('efeito-slider-maisNoticias-a-hover');
    });

    /* Efeito Hover do Submenu */
    $('.submenu-titulo-link').mouseover(function () {
        $(this).find('span a').addClass('efeito-slider-maisNoticias-a-hover');
    });
    $('.submenu-titulo-link').mouseleave(function () {
        $(this).find('span a').removeClass('efeito-slider-maisNoticias-a-hover');
    });

    /* Efeito hover das noticias do topo/direita */
    $('.efeito-cima-direita').mouseover(function () {
        $(this).find('span a').addClass('efeito-slider-maisNoticias-a-hover');
    });
    $('.efeito-cima-direita').mouseleave(function () {
        $(this).find('span a').removeClass('efeito-slider-maisNoticias-a-hover');
    });



});

/*$('.pace-inactive').css('display', 'none');*/
