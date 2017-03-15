/**
 * @package     Cattive.Site
 * @subpackage  Templates.cattive
 *
 * @copyright   Copyright (C) 2015, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/* global  $, Pace, document, window,  classie, setTimeout, i, DialogFx, mlPushMenu, cbpTooltipMenu, menu */

$(function () {
	//Tooltip Menu Gerenciar
	var menu = new cbpTooltipMenu( document.getElementById( 'cbp-tm-menu' ) );
	
	var SubMenuShow = false;
	var larguraDaTela = 0;
	var travaMenu = false;


	limparMenu();
	
 	
	
	var telaConta = 730;
	/*var alturaTela = $(this).scrollTop();
	
	$(window).on('scroll', function(e){
		var alturaTela = $(this).scrollTop();
		determinaLarguraTela()
	});
	*/
	function determinaLarguraTela() {
		var larguraTelaTotal = $(document).width();
		if (larguraTelaTotal <= 1235) {
			telaConta = 510;
		}
	}
	
	//Iniciar a função que determina a largura da tela pra arrumar a seta do menu
	window.onresize = function(event) {
		determinaLarguraTela()
	};
	
	determinaLarguraTela()
	
	
	larguraDaTela = $(document).width() - telaConta;
	larguraDaTela = (larguraDaTela / 2);

	$(window).resize(function (event) {
		console.log(telaConta)
		if ($(document).width() <= telaConta) {
			travaMenu = true;
		} else {
			travaMenu = false;
		}
		larguraDaTela = $(document).width() - telaConta;
		larguraDaTela = (larguraDaTela / 2);
	});

	if ($(document).width() <= telaConta) {
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
			$('#sub-menu-show .row>div, #sub-menu-show-podcast-videos .row>div').not('[class*="col-xs"]').css('display', 'none');
			$('#sub-menu-show-podcast-videos .row>div, #sub-menu-show-podcast-videos').not('[class*="col-xs"]').css('display', 'none');
			SubMenuShow = false;
		}
	});

	function limparMenuPodcast() {
			$('#sub-menu-show-podcast-videos .row>div, #sub-menu-show-podcast-videos').not('[class*="col-xs"]').css('display', 'none');	
	}


	$.each($('.menu-principal li'), function (index, value) {
		$(this).children('a').unbind('mouseover');

		$('#sub-menu-show').mouseover(function () {
			$(this).mouseleave(function () {
				if (SubMenuShow === true) {

					$(this).css('display', 'none');
					limparMenu();
					limparMenuPodcast();
					SubMenuShow = false;
				}
			});

		});

		$(this).children('a').on('mouseover', function () {
			if (travaMenu === false) {

				if (SubMenuShow === true) {

					$('#sub-menu-show').css('display', 'none');
					limparMenu();
					limparMenuPodcast();
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



	$.each($('.submenu-menu-social-superior li'), function (index, value) {
		$(this).children('a').unbind('mouseover');

		$('#sub-menu-show-podcast-videos').mouseover(function () {
			$(this).mouseleave(function () {
				if (SubMenuShow === true) {

					$(this).css('display', 'none');
					limparMenuPodcast();
					limparMenu();
					//console.log('limpa menu');
					SubMenuShow = false;
				}
			});

		});

		$(this).children('a').on('mouseover', function () {
			if (travaMenu === false) {

				if (SubMenuShow === true) {

					$('#sub-menu-show-podcast-videos').css('display', 'none');
					limparMenuPodcast();
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
					$('#sub-menu-show-podcast-videos, .arrow-up, .arrow-up-border').css('display', 'block');
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
		mouseDrag: false,
		transitionStyle: 'fade',
		lazyLoad : true,
		responsive:{
			0:{
	            items:1
	        }
	    }
	});

	

	$('#slider-videos .owl-item').removeAttr('style');

	$("#slider-videos-futebol, #slider-videos-volei, #slider-videos-outrosEsportes, #slider-videos-vejaTambem, #slider-videos, #slider-mais-noticias").owlCarousel({
		pagination: false,
		margin:10,
		lazyLoad : true,
		responsive:{
	        0:{
	            items:1
	        },
	        468:{
	            items:2
	        },
			720:{
	            items:3
	        },
	        990:{
	            items:4
	        },
			1200:{
	            items:5
	        }
	    }
	});


	$("#slider-videos-mexaSe").owlCarousel({
		pagination: false,
		lazyLoad : true,
		margin:10
	});

	$("#slider-podcast").owlCarousel({
		singleItem: true,
		pagination: false,
		lazyLoad : true,
		responsive:{
			0:{
	            items:1
	        }
	    }
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

	/* Interna Futebol */
	$('.slider-seta-esquerda-videos-futebol').click(function () {
		var owl = $("#slider-videos-futebol").data('owlCarousel');
		owl.prev();
	});
	$('.slider-seta-direita-videos-futebol').click(function () {
		var owl = $("#slider-videos-futebol").data('owlCarousel');
		owl.next();
	});

	/* Interna Volei */
	$('.slider-seta-esquerda-videos-volei').click(function () {
		var owl = $("#slider-videos-volei").data('owlCarousel');
		owl.prev();
	});
	$('.slider-seta-direita-videos-volei').click(function () {
		var owl = $("#slider-videos-volei").data('owlCarousel');
		owl.next();
	});

	/* Interna Outros Esportes */
	$('.slider-seta-esquerda-videos-outrosEsportes').click(function () {
		var owl = $("#slider-videos-outrosEsportes").data('owlCarousel');
		owl.prev();
	});
	$('.slider-seta-direita-videos-outrosEsportes').click(function () {
		var owl = $("#slider-videos-outrosEsportes").data('owlCarousel');
		owl.next();
	});

	/* Interna Outros Esportes */
	$('.slider-seta-esquerda-videos-mexaSe').click(function () {
		var owl = $("#slider-videos-mexaSe").data('owlCarousel');
		owl.prev();
	});
	$('.slider-seta-direita-videos-mexaSe').click(function () {
		var owl = $("#slider-videos-mexaSe").data('owlCarousel');
		owl.next();
	});
    $('.slider-seta-esquerda-videos-vejaTambem').click(function () {
		var owl = $("#slider-videos-vejaTambem").data('owlCarousel');
		owl.prev();
	});
    $('.slider-seta-direita-videos-vejaTambem').click(function () {
		var owl = $("#slider-videos-vejaTambem").data('owlCarousel');
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
			$('nav').find('.menu-superior').show();
			$('.pace-inactive').css('display', 'block');

		}
	});


var travarMouseOverVideos = false;

$('.img-shadow-videos-submenu').mouseover(function () {
		if (travarMouseOverVideos === false) {
			//$(this).find('.efeito-img-shadow').removeClass('container-slider-videos-img');
			//$(this).find('.efeito-img-shadow').addClass('container-slider-videos-img-active');

			$(this).find('.txt-slider-videos-submenu').animate({
				"bottom": "+=7px"
			}, 200);
			

			//$(this).addClass('img-shadow-videos');
			travarMouseOverVideos = true;
		}
	});

$('.img-shadow-videos-submenu').mouseleave(function () {
		$(this).find('.efeito-img-shadow').removeClass('container-slider-videos-img-active');
		$(this).find('.efeito-img-shadow').addClass('container-slider-videos-img');
		$(this).find('.txt-slider-videos-submenu').animate({
			"bottom": "-=7px"
		}, 200);
		//$(this).removeClass('img-shadow-videos');
		travarMouseOverVideos = false;
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
	var efeitoCimaDireita = $('.efeito-cima-direita div:not(.link-cinza):not(.conteudo-noticia)');
	efeitoCimaDireita.mouseover(function () {
		var self = $(this).parents('.efeito-cima-direita');
		self
			.find('span a')
			.addClass('efeito-slider-maisNoticias-a-hover');

		self.find('.img-noticia ul li a').addClass('img-noticia-a-hover');
		self.find('.img-noticia ul li a img').addClass('img-noticia-img-hover');
		self.find('.link-azul-escuro a').addClass('efeito-slider-maisNoticias-a-hover');
	}).mouseleave(function () {
		var self = $(this).parents('.efeito-cima-direita');
		self
			.find('span a')
					.find('span a')
			.removeClass('efeito-slider-maisNoticias-a-hover');

		self.find('.img-noticia ul li a').removeClass('img-noticia-a-hover');
		self.find('.img-noticia ul li a img').removeClass('img-noticia-img-hover');
		self.find('.link-azul-escuro a').removeClass('efeito-slider-maisNoticias-a-hover');
	});

	 /* Ativador da "Wilma */
    var dlgTrigger = document.querySelectorAll('[data-dialog]');
    var someDialog, dlg;
    for (i = 0; i < dlgTrigger.length; i++) {
        someDialog = document.getElementById(dlgTrigger[i].getAttribute('data-dialog'));
        dlg = new DialogFx(someDialog);
        dlgTrigger[i].addEventListener('click', dlg.toggle.bind(dlg));

    }
 
	
	/* Trigger do Menu Mobile */
	new mlPushMenu(document.getElementById('mp-menu'), document.getElementById('triggerMenu'), {
			type: 'cover'
	});

});

/*$('.pace-inactive').css('display', 'none');*/
