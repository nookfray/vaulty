$(document).ready(function() {

	// FIXED NAVBAR
	function collapseNavbar() {
		if ($(".main_header").offset().top > 50) {
			$(".main_header").addClass("fixed_header");
		} else {
			$(".main_header").removeClass("fixed_header");
		}
	}

	if($('*').is('.main_header')) {
		$(window).scroll(collapseNavbar);
		$(document).ready(collapseNavbar);
	};



	// ACADEMY NAV
	var lastId,
	topMenu = $(".academy_header .academy_nav"),
	topHeader = $(".main_header"),
	topMenuHeight = topHeader.outerHeight(),
	menuItems = topMenu.find("a"),
	activeBlock = $(".academy_header .active_section"),
	scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	});
	menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 20;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});
	$(window).scroll(function(){
		var fromTop = $(this).scrollTop()+topMenuHeight;
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
			return this;
		});
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
		if (lastId !== id) {
			lastId = id;
			menuItems.parent().removeClass("active").end().filter("[href='#"+id+"']").parent().addClass("active");
			activeTitle = menuItems.parent().end().filter("[href='#"+id+"']").text();
			$(activeBlock).text(activeTitle);
		};
	});

	$(".academy_header .open_btn").click(function() {
		$(this).toggleClass("active");
		($(this).text() === "Close") ? $(this).text("Open") : $(this).text("Close");
		$(".academy_header .academy_nav").slideToggle(300);
	});
	$(".academy_header .active_section, .academy_header .active_page").click(function() {
		if($(window).width() < 576) {
			$(this).toggleClass("active");
			$(".academy_header .academy_nav").slideToggle(300);
		}
	});
	$(".academy_header .academy_nav li a").click(function() {
		if($(window).width() < 1200) {
			$(".academy_header .open_btn, .academy_header .active_section").removeClass("active");
			$(".academy_header .academy_nav").slideUp(300);
		}
	});


	
	

	// SANDWICH ANIMATION
	$(".toggle_menu").click(function() {
		$(this).toggleClass("active");
		$(".main_header .mobile_nav, .user_dropdown .dropdown_menu").slideToggle(300).toggleClass("active");
	});


	$(".soon a").click(function() {
		return false;
	});


	// HOVER DROPDOWN
	$(".main_header .products_dropdown").hover(function(){
		$(this).children(".dropdown_menu").stop().slideDown(200).addClass("open");
		$(this).addClass("open");
	},
	function(){
		$(this).children(".dropdown_menu").stop().slideUp(200).removeClass("open");
		$(this).removeClass("open");
	});


	// HOVER USER DROPDOWN
	$(".main_header .user_dropdown").hover(function(){
		if($(window).width() > 767) {
			$(this).children(".dropdown_menu").stop().slideDown(200).addClass("open");
			$(this).addClass("open");
		}
	},
	function(){
		if($(window).width() > 767) {
			$(this).children(".dropdown_menu").stop().slideUp(200).removeClass("open");
			$(this).removeClass("open");
		}
	});


	// LANGUAGE DROPDOWN
	$("footer .language_dropdown .drop_btn").click(function() {
		$(this).parent().toggleClass("open");
		$(this).next().slideToggle(300);
	});
	$(document).mouseup(function (e) {
		if ($(".language_dropdown").hasClass("open")) {
			var container = $(".language_dropdown");
			if (container.has(e.target).length === 0){
				$(".language_dropdown").removeClass("open");
				$(".language_dropdown .dropdown_menu").slideUp(300);
			}
		}
	});


	$(".icons_list .dropdown > a, .icons_list .dropdown > button").click(function() {
		$(this).parent().toggleClass("open");
		$(this).next().slideToggle(300);
		return false;
	});
	$(document).mouseup(function (e) {
		if ($(".icons_list .dropdown").hasClass("open")) {
			var container = $(".icons_list .dropdown");
			if (container.has(e.target).length === 0){
				$(".icons_list .dropdown").removeClass("open");
				$(".icons_list .dropdown .dropdown_menu").slideUp(300);
			}
		}
	});
	


	$(".mobile_nav .dropdown > a").click(function() {
		$(this).parent().toggleClass("open");
		$(this).next().slideToggle(300);
		return false;
	});


	var swiperMain = new Swiper('.main_slider', {
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		effect: 'fade',
		autoplay: {
			delay: 50000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.main_slider_pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.main_slider_next',
			prevEl: '.main_slider_prev',
		},
	});


	// SPOILER
	$(".spoiler_item .spoiler").click(function() {
		if ($(this).hasClass("active")) {
			$(this).next().collapse('hide');
			$(this).removeClass("active");
		} else {
			$(this).next().collapse('toggle');
			$(this).toggleClass("active");
		}
	});



	// STEPS SLIDER
	var swiperSteps = new Swiper('.steps_slider', {
		spaceBetween: 0,
		pagination: {
			el: '.steps_slider_pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.steps_slider_next',
			prevEl: '.steps_slider_prev',
		},
	});


	// SCROLL TO ID
	$(".terminal_section .top_wrapper .more[href*='#'], .inner_freedom_section .buy_btn, .inner_freedom_section a.buy_btn").mPageScroll2id({
		offset: 90
	});


	// MOD SELECT
	$(".mod_select").niceSelect();


	// PASSWORD OR TEXT
	$(".password_item .show_pass").click(function() {
		var x = $(this).prev().attr("type");
		if ($(this).prev().attr("type") == "password") {
			$(this).prev().attr("type", "text");
		} else {
			$(this).prev().attr("type", "password");
		}
	});


	$(function() {
		$('[data-toggle="popover"]').popover();
	});


	$("#copyButton").click(function() {
		copyToClipboard(document.getElementById("referal_link"));
	});

	function copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).html()).select();
		document.execCommand("copy");
		$temp.remove();
	};



	$(".key_item input").keyup(function () {
		if (this.value.length == this.maxLength) {
			$(this).next('input').focus();
		}
	});



	$('.mod_select').on('change', function() {
		$(this).valid();
	})



	// CUSTOM SELECT
	$(".custom_select .select_btn").click(function() {
		$(".custom_select .select.active").not(this).removeClass("active");
		$(this).parent().toggleClass("active");
	});

	$(".custom_select .select_list li").click(function() {
		$(this).parent().parent().toggleClass("active");
		$(this).parent().siblings(".select_btn").text($(this).text());
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		
	});

	$(document).mouseup(function (e) {
		if ($(".custom_select .select").hasClass("active")) {
			var container = $(".custom_select .select");
			if (container.has(e.target).length === 0){
				$(".custom_select .select").removeClass("active");
			}
		}
	});


	// PRODUCT PAGE SCRIPTS
	var imgSrc = $(".product_main_section .img_block img");
	var activeProduct = $(".custom_select li.active").attr("data-img");
	var activeProductBack = $(".custom_select li.active").attr("data-img-back");

	$('.custom_select .select').each(function() {
		$(this).find(".select_btn").text($(this).find(".select_list").find(".active").text());
	});

	if ($(".view_select .front_view").hasClass("active")) {
		$(imgSrc).attr("src", activeProduct);
	} else if ($(".view_select .back_view").hasClass("active"))  {
		$(imgSrc).attr("src", activeProductBack);
	}

	$(".product_select li").click(function() {
		if ($(".view_select .front_view").hasClass("active")) {
			$(imgSrc).attr("src", $(this).attr("data-img"));
		} else if ($(".view_select .back_view").hasClass("active"))  {
			$(imgSrc).attr("src", $(this).attr("data-img-back"));
		}
	});

	$(".view_select li").click(function() {
		if ($(".view_select .front_view").hasClass("active")) {
			$(imgSrc).attr("src", $(".product_select li.active").attr("data-img"));
		} else if ($(".view_select .back_view").hasClass("active"))  {
			$(imgSrc).attr("src", $(".product_select li.active").attr("data-img-back"));
		}
	});


	// BUTTON SAVE ON A 3 PACK
	$(".add_card .save_btn").click(function() {
		$(".custom_select .new_price strong").text($(this).attr("data-new-price"));
		$(".quantity_select .select_list li").removeClass("active");
		$(".quantity_select .select_list .pack_li").addClass("active");
		$(".quantity_select .select_btn").text($(".quantity_select .select_list .pack_li").text());
	});

	$(".custom_select .quantity_select ul li").click(function() {
		$(".custom_select .new_price strong").text($(this).attr("data-new-price"));

	});


	// PRODUCT CHARACTERISTICS SECTION
	$(".characteristics_section .tab-pane .more").click(function() {
		thisActive = $(".characteristics_section .nav-tabs li .active");
		$(thisActive).removeClass("active").parent().next().find("a").addClass("active");
		$(".characteristics_section .mobile_block .active_page").text($(this).children("span").text());
	});
	
	$(".characteristics_section .nav-tabs li a").click(function() {
		activelink = $(this).children("span").text();
		$(".characteristics_section .mobile_block .active_page").text(activelink);
	});

	$(".characteristics_section .mobile_block .open_btn").click(function() {
		$(this).toggleClass("active");
		($(this).text() === "Close") ? $(this).text("Open") : $(this).text("Close");
		$(".characteristics_section .nav-tabs").slideToggle(300);
	});

	$(".characteristics_section .mobile_block .active_page").click(function() {
		if($(window).width() < 768) {
			$(this).toggleClass("active");
			$(".characteristics_section .nav-tabs").slideToggle(300);
		}
	});

	$(".characteristics_section .nav-tabs li a").click(function() {
		if($(window).width() < 1200) {
			$(".characteristics_section .mobile_block .open_btn").removeClass("active").text("Open");
			$(".characteristics_section .nav-tabs").slideUp(300);
		}
	});


	// PRODUCT COMPARE SECTION
	$(".product_compare .custom_dropdown .drop_btn").click(function() {
		$(this).parent().toggleClass("active");
	});

	$(".product_compare .custom_dropdown .dropdown_menu li").click(function() {
		$(this).parent().parent().removeClass("active");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(this).parent().prev().text($(this).text());
	});

	$(".product_compare .compare_dropdown .dropdown_menu li[data-item='compare_item_1'").click(function() {
		$(".product_compare .item").removeClass("active");
		$("#compare_item_1").addClass("active");
	});
	$(".product_compare .compare_dropdown .dropdown_menu li[data-item='compare_item_2'").click(function() {
		$(".product_compare .item").removeClass("active");
		$("#compare_item_2").addClass("active");
	});
	$(".product_compare .compare_dropdown .dropdown_menu li[data-item='compare_item_3'").click(function() {
		$(".product_compare .item").removeClass("active");
		$("#compare_item_3").addClass("active");
	});

	$(".product_compare .option_dropdown .dropdown_menu li").click(function() {
		var index= $(this).index();
		$(this).parent().prev().text($(this).text());
		$('.product_compare .wrapper .item').each(function() {
			$(this).find("ul li").removeClass("active");
			$(this).find("ul li").eq(index).addClass("active");
		});
	});


	$(".step_cart .show_carts").click(function() {
		$(this).toggleClass("active");
		$(this).next().slideToggle();
	});


	$(".payment_methods .radio_item").click(function() {
		$(this).parent().siblings().removeClass("active");
		$(this).parent().addClass("active");
	});


	$('.shipping_methods input').on('change', function() {
		if($("#different_address_input").is(':checked')) { 
			$(".step_section .different_address").slideDown(100);	
		} else {
			$(".step_section .different_address").slideUp(100);	
		}
	});



	// MAIN FORM
	$('.main_form, .request_form').each(function() {
		$(this).validate({
			ignore: [],
			rules:{
				name: {
					minlength: 2,
				},
				tel: {
					required: true,
					minlength: 8,
				},
				email: {
					email: true,
				},
				emailre: {
					email: true,
				},
				country: {

				},
			},
			messages:{
				name: {
					required: "This field is required."
				},
				tel: {
					required: "This field is required.",
					minlength: "Please enter at least 8 characters."
				},
				email: {
					required: "This field is required.",
					email: "Please enter a valid email address."
				},
				emailre: {
					required: "This field is required.",
					email: "Please enter a valid email address."
				},
				country: {
					required: "This field is required."
				},
			},
			errorPlacement: function(error, element) {
				if (element.is('select:hidden')) {
					error.insertAfter(element.next('.nice-select'));
				} else {
					error.insertAfter(element);
				};
				if (element.is('.key_item input')) {
					error.insertAfter(element.parent());
				} else {
					error.insertAfter(element);
				};
			},
			submitHandler: function(form) {
				$.ajax({
					url: "php/submit.php",
					type: "POST",
					data: $(form).serialize(),
					success: function(response) {
						$('.main_form').trigger('reset');
						$(".modal").modal("hide");
						setTimeout(function(){$('#thanks_modal').modal("show")}, 500); 
					}            
				});
			}
		});
	});


	// STEP FORM
	$('.step_form').each(function() {
		$(this).validate({
			ignore: [],
			rules:{
				name: {
					minlength: 2,
				},
				tel: {
					required: true,
					minlength: 8,
				},
				email: {
					email: true,
				},
				emailre: {
					email: true,
				},
				country: {

				},
			},
			messages:{
				name: {
					required: "This field is required."
				},
				tel: {
					required: "This field is required.",
					minlength: "Please enter at least 8 characters."
				},
				email: {
					required: "This field is required.",
					email: "Please enter a valid email address."
				},
				emailre: {
					required: "This field is required.",
					email: "Please enter a valid email address."
				},
				country: {
					required: "This field is required."
				},
			},
			errorPlacement: function(error, element) {
				if (element.is('select:hidden')) {
					error.insertAfter(element.next('.nice-select'));
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(form) {
				$.ajax({
					url: "php/submit.php",
					type: "POST",
					data: $(form).serialize(),
					success: function(response) {
						
					}            
				});
			}
		});
	});


	// CLOSE THANKS WINDOW
	$(".thanks_window .close").click(function() {
		$(".thanks_window").fadeOut();
	});


});
