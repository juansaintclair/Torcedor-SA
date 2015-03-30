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

    larguraDaTela = $(document).width() - 705;
    larguraDaTela = (larguraDaTela / 2);

    $(window).resize(function (event) {

        if ($(document).width() <= 705) {
            travaMenu = true;
        } else {
            travaMenu = false;
        }
        larguraDaTela = $(document).width() - 705;
        larguraDaTela = (larguraDaTela / 2);
    });

    if ($(document).width() <= 705) {
        travaMenu = true;
    } else {
        travaMenu = false;
    }


    /* Limpa o conteúdo interno do submenu */
    function limparMenu() {
        $('#sub-menu-show .row>div, #sub-menu-show').not('[class*="col-sm"]').css('display', 'none');
    }

    /* Remove o submenu da tela se clicar em qualquer parte da tela */
    $('body').on('click', function () {
        if (SubMenuShow === true) {
            $('#sub-menu-show .row>div, #sub-menu-show').not('[class*="col-sm"]').css('display', 'none');
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
        rewindSpeed: 1000
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
        if (!TSA.travarEfeitosShrink) {
            if ($(document).scrollTop() > 50) {

                $('nav').find('.menu-superior').toggle("size", 1000);

                $('nav').addClass('shrink');
                $('.pace-inactive').css('display', 'none');
                TSA.travarEfeitosShrink = true;
            } else {

                $('nav').removeClass('shrink');

                $('nav').find('.menu-superior').fadeIn('slow', function () {});

                $('.pace-inactive').css('display', 'block');

            }
        }
    });


});

var TSA = {
	travarEfeitosShrink: false
};

/*$('.pace-inactive').css('display', 'none');*/