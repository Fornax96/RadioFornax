/**

Donations welcome:
	BTC: 122MeuyZpYz4GSHNrF98e6dnQCXZfHJeGS
	LTC: LY1L6M6yG26b4sRkLv4BbkmHhPn8GR5fFm
		~ Thank you!

------------

MIT License (MIT)

Copyright (c) 2013 http://dogets.com/ 
Copyright (c) 2013 http://scotty.cc/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

if (typeof DogetsComCounter != 'number')
var DogetsComCounter = 0;

if (typeof DogetsCom != 'object')
var DogetsCom = {
	source: 'http://www.dogets.com/widget/'
	//source: 'http://dogets.com/widget/'
	, config: []
	, go :function(config) {
		config = DogetsCom.validate(config);
		DogetsCom.config[DogetsComCounter] = config;
		DogetsCom.loader.jquery();
		document.write('<span data-dogets-instance="'+DogetsComCounter+'" class="DOGETSCOM_CONTAINER"></span>');
		DogetsComCounter++;
	}
	, validate: function(config) {
		var $accepted = [];
		$accepted['currencies'] = ['dogecoin'];
		$accepted['counters'] = ['count','amount','hide'];
		$accepted['alignment'] = ['al','ac','ar','bl','bc','br'];
		if (!config.currency || !DogetsCom.in_array(config.currency,$accepted['currencies']))
			config.currency = 'dogecoin';
		if (!config.counter || !DogetsCom.in_array(config.counter,$accepted['counters']))
			config.counter = 'count';
		if (!config.alignment || !DogetsCom.in_array(config.alignment,$accepted['alignment']))
			config.alignment = 'bl';
		if (typeof config.qrcode != 'boolean')
			config.qrcode = true;
		if (typeof config.auto_show != 'boolean')
			config.auto_show = false;
		if (!config.wallet_address)
			config.wallet_address = 'My '+ config.currency +' wallet_address is missing!';
		if (!config.lbl_button) 
			config.lbl_button = 'Donate';
		if (!config.lbl_address)
			config.lbl_address = 'My Bitcoin Address:';
		if (!config.lbl_count)
			config.lbl_count = 'Donation';
		if (!config.lbl_amount)
			config.lbl_amount = 'BTC';
		if (typeof config.decimals != 'number' || config.decimals < 0 || config.decimals > 10)
			config.decimals = 4;

		return config;
	}
	, init: function(){
		DogetsCom.loader.stylesheet();
		$(window).resize(function(){
			DogetsCom.window_resize();
		});
		setTimeout(function(){
			/* this delayed start gives the page enough time to 
			   render multiple widgets before pinging for counts.
			*/
			DogetsCom.build();
		},800);		
	}
	, build: function(){
		$containers = $("span[data-dogets-instance]");
		$containers.each(function(i,v){
			$config = DogetsCom.config[$(this).attr('data-dogets-instance')];
			$counter = $config.counter == 'hide'?'':('<span><img src="'+DogetsCom.source+'icon_loading.gif" width="13" height="13" /></span>');
			$button = '<a class="DOGETSCOM_BUTTON_'+$config.currency.toUpperCase()+'" href="#"><img src="'+DogetsCom.source+'icon_'+$config.currency+'.png" /><span>'+$config.lbl_button+'</span></a>'+$counter;
			$(this).html($button);
			$(this).find('> a').unbind('click').click(function(e){
				e.preventDefault();
				DogetsCom.show(this);
			});
		});
		DogetsCom.counters();
	}
	, window_resize: function(){
		$.each(DogetsCom.config,function(i,v){
			DogetsCom.window_position(i);
		});
	}
	, window_position: function($instance){
		$config = DogetsCom.config[$instance];
		coin_window = "#DOGETSCOM_WINDOW_"+$instance;

			obj = "span[data-dogets-instance='"+$instance+"'] > a";
			/* 	to make alignment relative to the full width of the container instead 
			of just the button change this occurence of $(obj) to $(obj).parent(), 
			do the same for the occurences within the switch statement. */
			$pos = $(obj).offset(); 
			switch ($config.alignment) {
				default:
				case 'al': /* above left */
					$top = $pos.top - $(coin_window).outerHeight() - 10;
					$left = $pos.left; 
					break;
				case 'ac': /* above center */
					$top = $pos.top - $(coin_window).outerHeight() - 10;
					$left = $pos.left + ($(obj).outerWidth()/2) - ($(coin_window).outerWidth()/2);
					break;
				case 'ar': /* above right */
					$top = $pos.top - $(coin_window).outerHeight() - 10;
					$left = $pos.left + $(obj).outerWidth() - $(coin_window).outerWidth();
					break;
				case 'bl': /* bottom left */
					$top = $pos.top + $(obj).outerHeight() + 10;
					$left = $pos.left; 
					break;
				case 'bc': /* bottom center */
					$top = $pos.top + $(obj).outerHeight() + 10;
					$left = $pos.left + ($(obj).outerWidth()/2) - ($(coin_window).outerWidth()/2);
					break;
				case 'br': /* bottom right */
					$top = $pos.top + $(obj).outerHeight() + 10;
					$left = $pos.left + $(obj).outerWidth() - $(coin_window).outerWidth();
					break;
			}
		if ($(coin_window).is(':visible')) {
			$(coin_window).stop().animate({'z-index':99999999999,'top':$top,'left':$left},150);
		} else {
			$(coin_window).stop().css({'z-index':99999999998,'top':$top,'left':$left});
		}
	}
	, counter: []
	, counters: function(){
		$addresses = [];
		$.each(DogetsCom.config,function(i,v){
			$instance = i;
			$config = v;
			if ($config.counter != 'hide')
				$addresses.push($instance+'_'+$config.currency+'_'+$config.wallet_address);
			else {
				if ($config.auto_show) 
					$("span[data-dogets-instance='"+i+"']").find('> a').click();
			}
		});
		if ($addresses.length) {
			DogetsCom.loader.script({
				id: 'DOGETSCOM_INFO'+Math.random()
				, source: (DogetsCom.source+'dogets_lookup.php?data='+$addresses.join('|'))
				, callback: function(){
					if (typeof DOGETSCOM_DATA == 'object') {
						DogetsCom.counter = DOGETSCOM_DATA;
						var test=JSON.stringify(DogetsCom.counter);
							//alert(test);
						$.each(DogetsCom.counter,function(i,v){
							$config = DogetsCom.config[i];
							//v.count=20;
							//v.amount=100;
							//if (!v.count || v == null) v = {count:0,amount:0};
							//alert(v.count);
							//alert(v.amount);
							$("span[data-dogets-instance='"+i+"']").find('> span').html($config.counter=='count'?v.count:(v.amount.toFixed($config.decimals)+' '+$config.lbl_amount));
							if ($config.auto_show) {
								$("span[data-dogets-instance='"+i+"']").find('> a').click();
							}
						});
					}
					if ($("span[data-dogets-instance] > span img").length > 0) {
						setTimeout(function(){DogetsCom.counters();},2500);
					}
				}
			});
		}
	}
	, show: function(obj) {
		$instance = $(obj).parent().attr('data-dogets-instance');
		$config = DogetsCom.config[$instance];
		coin_window = "#DOGETSCOM_WINDOW_"+$instance;
		$(".DOGETSCOM_WINDOW").css({'z-index':99999999998});
		if (!$(coin_window).length) {

			$sel = !navigator.userAgent.match(/iPhone/i)?'onclick="this.select();"':'onclick="prompt(\'Select all and copy:\',\''+$config.wallet_address+'\');"';

			$html = ''
				  + '<label>'+$config.lbl_address+'</label>'
				  + '<input type="text" readonly '+$sel+'  value="'+$config.wallet_address+'" />'
				  + '<a class="DOGETSCOM_CREDITS" href="http://www.dogets.com/" target="_blank">Dogets.com</a>'
  				  + '<a class="DOGETSCOM_WALLETURI" href="'+$config.currency.toLowerCase()+':'+$config.wallet_address+'" target="_blank" title="Click here to send this address to your wallet (if your wallet is not compatible you will get an empty page, close the white screen and copy the address by hand)" ><img src="'+DogetsCom.source+'icon_wallet.png" /></a>'
  				  + '<a class="DOGETSCOM_CLOSER" href="javascript:;" onclick="DogetsCom.hide('+$instance+');" title="Close this window">x</a>'
  				  + '<img class="DOGETS_INPUT_ICON" src="'+DogetsCom.source+'icon_'+$config.currency+'.png" width="16" height="16" title="This is a '+$config.currency+' wallet address." />'
				  ;
			if ($config.counter != 'hide') {
				$html += '<span class="DOGETSCOM_COUNT">0<small>'+$config.lbl_count+'</small></span>'
				  	  + '<span class="DOGETSCOM_AMOUNT end">0.00<small>'+$config.lbl_amount+'</small></span>'
				  	  ;				  
			}
			if ($config.qrcode) {
				$html += '<img class="DOGETSCOM_QRCODE" data-dogets-instance="'+$instance+'" src="'+DogetsCom.source+'icon_qrcode.png" width="16" height="16" />'
				  	   + '<img class="DOGETSCOM_QRCODE_LARGE" src="'+DogetsCom.source+'icon_qrcode.png" width="111" height="111" />'
				  	   ;
			}
			var $div = $('<div></div>');
			$('body').append($div);
			$div.attr({
				'id': 'DOGETSCOM_WINDOW_'+$instance
			}).addClass('DOGETSCOM_WINDOW DOGETSCOM_WINDOW_'+$config.currency.toUpperCase()+' DOGETSCOM_WINDOW_'+$config.alignment.toUpperCase()).html($html).unbind('click').bind('click',function(){
				$(".DOGETSCOM_WINDOW").css({'z-index':99999999998});
				$(this).css({'z-index':99999999999});
			});
			if ($config.qrcode) {
				$(coin_window).find('.DOGETSCOM_QRCODE').bind('mouseenter click',function(){
					$config = DogetsCom.config[$(this).attr('data-dogets-instance')];
					$lrg = $(this).parent().find('.DOGETSCOM_QRCODE_LARGE');
					if ($lrg.is(':visible')) {
						$lrg.hide();
						return;
					}
					$lrg.attr({
						src: DogetsCom.source +'qr/?address='+$config.wallet_address
					}).show();
				}).bind('mouseleave',function(){
					$lrg = $(this).parent().find('.DOGETSCOM_QRCODE_LARGE');
					$lrg.hide();
				});
			}
		} else {
			if ($(coin_window).is(':visible')) {
				DogetsCom.hide($instance);
				return;
			}
		}
		DogetsCom.window_position($instance);
		$(coin_window).show();
		$pos = $(coin_window).find('input').position();
		$(coin_window).find('img.DOGETS_INPUT_ICON').css({'top':$pos.top+3,'left':$pos.left+3});
		$(coin_window).find('.DOGETSCOM_WALLETURI').css({'top':$pos.top+3,'left':$pos.left+$(coin_window).find('input').outerWidth()+3});
		if ($config.counter != 'hide') {
			$counters = DogetsCom.counter[$instance];
			if ($counters == null) {
				$counters = {
					count: 0,
					amount: 0
				};
			}
		 	if ($counters.count == null) $counters.count = 0;
		 	if ($counters.amount == null) $counters.amount = 0;
			$(coin_window).find('.DOGETSCOM_COUNT').html($counters.count+ '<small>'+$config.lbl_count+'</small>');
			$(coin_window).find('.DOGETSCOM_AMOUNT').html($counters.amount.toFixed($config.decimals)+ '<small>'+$config.lbl_amount+'</small>');
		}
		if (typeof $config.onShow == 'function') 
			$config.onShow();
	}
	, hide: function($instance) {
		$config = DogetsCom.config[$instance];
		coin_window = "#DOGETSCOM_WINDOW_"+$instance;
		$(coin_window).fadeOut();
		if (typeof $config.onHide == 'function') {
			$config.onHide();
		}
	}
	, in_array: function(needle,haystack) {
		for (i=0;i<haystack.length;i++) {
			if (haystack[i] == needle) { 
				return true;
			}
		}
		return false;
	}
	, loader: {
		loading_jquery: false,
		script: function(obj){
			if (!document.getElementById(obj.id)) {
				var x = document.createElement('script');
				x.onreadystatechange = function(){
					switch (this.readyState) {
						case 'complete':
						case 'loaded':
							obj.callback();
							break;
					}
				};
				x.onload = function(){
					obj.callback();
				};
				x.src = obj.source;
				x.id  = obj.id;
				document.lastChild.firstChild.appendChild(x);
			}
		}
		, stylesheet_loaded: false
		, stylesheet: function(){
			if (!DogetsCom.loader.stylesheet_loaded) {
				DogetsCom.loader.stylesheet_loaded = true;
				var $link = $('<link/>');
				$("head").append($link);
				$link.attr({
					id 		: 'DOGETSCOM_STYLESHEET'
					, rel 	: 'stylesheet'
					, type 	: 'text/css'
					, href 	: DogetsCom.source+'dogets.css'
				});
			}
		}
		, jquery: function(){
			if (!window.jQuery && !DogetsCom.loader.loading_jquery) {
				$prefix = window.location.protocol=='file:'?'http:':'';
				DogetsCom.loader.script({
					id			: 'DOGETSCOM_JQUERY'
					, source 	: $prefix + '//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
					, callback  : function(){
						DogetsCom.init();
					}
				});
				return;
			}
			DogetsCom.init();
		}
	}
};
