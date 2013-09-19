
(function($){

	var scale = null;

	var methods = {

		init : function(options){
			
		    return this.each(function() {

				var element = $(this),
				    cropCoordinates = {},
				    previewCoordinates = {},
				    jcrop_api = null,
				    imageOfUpload = null,
					fileTypes = new Array('image/jpeg','image/png','image/bmp','image/gif');

				settings = $.extend( {
					path			  : '',
					uploadFolder      : './',
					uploadFile        : 'imageUpload.php',

					imageDefault      : 'data:image/png;base64,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',
					maxFileSize       : '1024',
					fileTypes         : ['image/jpeg','image/png','image/bmp','image/gif'],
					
					Jcrop             : null,
					
					resizeTo          : null,
					renameTo          : null,
					convertTo         : null,

					onBeforeSend      : function(f){},
					onComplete        : function(r){},
					onError           : function(r){},
					onProgress        : function(p){},
					onDrag            : function(e){},
					onDrop            : function(e){}

				}, options);
							
				var label    = $('<label></label');
				var progress = $('<span></span>');
				var head     = document.getElementsByTagName('head')[0];

				var css = document.createElement('link');
					css.href = settings.path + 'css/imageUpload.jquery.css';
					css.rel  = 'stylesheet';
					css.type = 'text/css';
					head.appendChild(css);

				$.each(settings.fileTypes, function(x,y){
					if ( jQuery.inArray(y, fileTypes) == -1){
						settings.fileTypes.splice(x,1);
					}
				});
				
				if ( element.attr('type') != 'file' ){
					alert('Objeto inválido!\n\nimageUpload deve ser usado obrigatoriamente num input[type=\'file\']');
					return false;
				}
			
				
				label
					.attr('for', element.attr('id'))
					.css('background-image','url(' + settings.imageDefault + ')');
					
				label.insertAfter( element );
				
				
				progress.addClass('progress');
				
				label			
					.attr('title','Clique ou arraste uma imagem para alterar.');
				
				element
					.attr('accept',settings.fileTypes.join(","))
					.addClass('imageUpload')
					.hide();
							
				label.bind('dragleave',function(e){
					dragHover(e);
				});
				
				label.bind('dragover',function(e){
					dragHover(e);
				});
				
				label.bind('drop',function(e){
					drop(e);
				});
				
				$(document).bind('dragover', function(e){
					dragAreaHover(e);
				});
				
				$(document).bind('dragleave', function(e){
					dragAreaHover(e);
				});
				
				$(document).bind('drop', function(e){
					e.stopPropagation();
					e.preventDefault();
					
					$("body").removeClass('hover');
					$('#opacity-box').remove();
					
				});
				
				$(document).bind('mouseenter', function(){
					$("body").removeClass('hover');
					$('#opacity-box').remove();
				});
				
				element.bind('change', function(e,a){
					file = this.files[0];
					read(file);
				});
				
				var dragAreaHover = function(e) {
				
					element.parent().find('.messageError').remove();
					label.removeClass('error');
				
					e.stopPropagation();  
					e.preventDefault();  

					if ( e.type == "dragover" ){
						
						$("body").addClass('hover');

						try{
							window.clearInterval(itv);
						}catch(ex){}
						
					}else{
					
						remove = function(){
						
							$("body").removeClass('hover');
							$('#opacity-box').remove();
							
							try{
								window.clearInterval(itv);
							}catch(ex){}
						}
						
						itv = window.setTimeout(remove, 500);
					}
					
					settings.onDrag(e);
				
				}
				
				var dragHover = function(e) {
				
					try{
						window.clearInterval(itv);
					}catch(ex){}
				
					e.stopPropagation();  
					e.preventDefault();  

					if ( e.type == "dragover" ){
						label.addClass('hover');
					}else{
						label.removeClass('hover');
					}
					
					settings.onDrop(e);

				};
				
				var drop = function(e) {
				
					dragHover(e);
					
					event = e.originalEvent;
					file = event.dataTransfer.files[0];

					read(file);
					
				};
				
				var read = function(file) {

					if ( jQuery.inArray(file.type, fileTypes) >= 0){
						if ( jQuery.inArray(file.type, settings.fileTypes) == -1){
							settings.onError('Arquivo inválido.');
							
							label.addClass('error').removeClass('success').removeClass('sending');
								
							return;
						}
					}else{
						settings.onError('Arquivo inválido.');
						label.addClass('error').removeClass('success').removeClass('sending');
						return;
					}
					
					if ( file.size > ( settings.maxFileSize * 1000 ) ){
						settings.onError('Arquivo muito grande.');
						label.addClass('error').removeClass('success').removeClass('sending');
						return;
					}
					
					if ( settings.Jcrop ){
						Jcrop(file);
						return;
					}
					
					sendFile(file);
				}
				
				var sendFile = function(file) {
					
					var data = new FormData();
					data.append('imageUpload',file);
					data.append('uploadFolder',settings.uploadFolder);
					
					$.each(cropCoordinates, function(x,y){
						data.append('cropCoordinates['+x+']',y);
					});

					if ( settings.convertTo != null ){
						data.append('convertTo', settings.convertTo);
					}

					if ( settings.renameTo != null ){
						data.append('renameTo', settings.renameTo);
					}
					
					if ( settings.resizeTo != null ){
						if (settings.resizeTo.width){
							data.append('resizeTo[width]', settings.resizeTo.width);
						}
						if (settings.resizeTo.height){
							data.append('resizeTo[height]', settings.resizeTo.height);
						}
					}

					destroy();

				
					jQuery
						.ajax({
							url: settings.uploadFile,
							data: data,
							cache: false,
							contentType: false,
							processData: false,
							type: 'POST',
							
							beforeSend: function(){

								label
									.removeAttr('for')
									.removeClass('success')
									.removeClass('error');
									
								settings.onBeforeSend(file)
								
							},
							
							success: function(result){

								label
									.addClass('success')
									.removeClass('error')
									.removeClass('sending')
									.attr('for', element.attr('id'))
									
								var reader = new FileReader();

								reader.onload = function(f) {
									label
										.css('background-image','url(' + f.target.result + ')');
								}

								reader.readAsDataURL(file);
									
								$.each(previewCoordinates, function(x,y){
									label.css(x,y);
								});
								
								settings.onComplete(result);
								
								console.log(result)
								
							},
							
							error: function(result){
								
								label
									.addClass('error')
									.removeClass('success')
									.removeClass('sending')
									.attr('for', element.attr('id'));
									
								settings.onError(result.responseText);
								
								label.addClass('error').removeClass('success').removeClass('sending');
								
								console.log(result.responseText);
							},
							
							xhr: function() {
								myXhr = $.ajaxSettings.xhr();

								if(myXhr.upload){
									myXhr.upload.addEventListener('progress',function showProgress(evt) {

										if (evt.lengthComputable) {
											settings.onProgress(evt);											
										}  
									}, false);
								} else {
									console.log("Upload progress is not supported.");
								}
								return myXhr;
							}
						
						});
					
				}
				
				var Jcrop = function(file){


					var bootstrapButtons = document.createElement('link');
						bootstrapButtons.href = settings.path + 'css/bootstrapButtons.css';
						bootstrapButtons.rel  = 'stylesheet';
						bootstrapButtons.type = 'text/css';
						bootstrapButtons.id  = 'bootstrapButtons';

					var JcropCss = document.createElement('link');
						JcropCss.href = settings.path + 'plugin/Jcrop/css/jquery.Jcrop.css';
						JcropCss.rel  = 'stylesheet';
						JcropCss.type = 'text/css';
						JcropCss.id   = 'JcropCss';

					var JcropJs = document.createElement('script');
						JcropJs.id   = 'JcropJs';
						JcropJs.type = 'text/javascript';
						JcropJs.src  = settings.path + 'plugin/Jcrop/js/jquery.Jcrop.js?' + new Date().getTime();
				
					var 
						div           = $('<div></div>'), 
						button        = $('<button></button>'),
						link          = $('<link/>'),
						img           = $('<img />'),
						script		  = $('<script></script>'),
						
						containerCrop = div.clone(),
						tableCrop     = div.clone(),
						tableCellCrop = div.clone(),
						center 		  = div.clone(),
						fillBorder    = div.clone(),
						largeBorder   = div.clone(),
						box           = div.clone(),
						picture       = div.clone(),
						buttons       = div.clone(),
						
						buttonCancel  = button.clone(),
						buttonCrop    = button.clone();
						
						areaCrop      = img.clone(); 

					$(document).bind('keydown',function(e){
						if ( e.which == 27 ) {
		                    destroy();
		                };
					});
					
					containerCrop
						.attr('id','containerCrop')
						.bind('click', function(){
							destroy();
						});
						
					tableCrop
						.attr('id','tableCrop');

					tableCellCrop
						.attr('id','tableCellCrop');

					center
						.attr('id','center')
						.bind('click', function(e){
							e.stopPropagation();
						});
						
					fillBorder
						.attr('id','fillBorder');
						
					largeBorder
						.attr('id','largeBorder');
						
					box
						.attr('id','box');
						
					picture
						.attr('id','picture');
						
					buttons
						.attr('id','buttons');
						
						
					buttonCancel
						.text('Cancelar')
						.addClass('btn')
						.addClass('btn-vermelho')
						.bind('click', function(){
							
							destroy();

						});
						
					buttonCrop
						.text('Cortar')
						.addClass('btn')
						.addClass('btn-azul')
						.bind('click',function(){

							if( cropCoordinates.x2 != "undefined" && cropCoordinates.x2 > 0)
								sendFile(file);
							else
								alert('Antes de cortar a imagem, faça uma seleção.');

						});
					
						
					$('body').append(
						containerCrop.append(
							tableCrop.append(
								tableCellCrop.append(
									center.append(
										fillBorder.append(
											largeBorder.append(
												box.append(picture).append(buttons)
											)
										)
									)
								)
							)
						)
					);
					
					buttons
						.append(buttonCancel)
						.append(buttonCrop);
					
					areaCrop
						.attr('id','areaCrop');
		

					JcropJs.onload = function() {

						var reader = new FileReader();

						reader.onload = function(f) {

							areaCrop
								.attr('src',f.target.result)
								.Jcrop({
									onChange: function(c){
										cropCoordinates.x  = c.x  * scale;
										cropCoordinates.y  = c.y  * scale;
										cropCoordinates.x2 = c.x2 * scale;
										cropCoordinates.y2 = c.y2 * scale;
										cropCoordinates.w  = c.w  * scale;
										cropCoordinates.h  = c.h  * scale;

										updatePreview(c);
										
									},
									onSelect: function(c){
									
										updatePreview(c);
									},
									onRelease: function(c){
										cropCoordinates.x  = 0;
										cropCoordinates.y  = 0;
										cropCoordinates.x2 = 0;
										cropCoordinates.y2 = 0;
										cropCoordinates.w  = 0;
										cropCoordinates.h  = 0;
									}
								},function(){
								
									jcrop_api = this
									
									var imgOriginal = new Image();
									imgOriginal.src = areaCrop.attr('src');
									
									scale = imgOriginal.width / areaCrop.width();
									
									var bounds = this.getBounds();
										boundx = bounds[0];
										boundy = bounds[1];

									option = {};
									
									$.each(settings.Jcrop, function(x,y){

										if ( typeof(y) == "string" ){
											eval('option.' + x + '=' + "'" + y + "'");
										}else if( typeof(y) == "number" ){
											eval('option.' + x + '=' + y);
										}else if ( typeof(y) == "object" ){
											if ( Object.prototype.toString.call(y) == "[object Array]" ){
												eval('option.' + x + '= [' + y.join(',') + ']')
											}
										}
										
									});

									jcrop_api.setOptions(option);
									jcrop_api.release();
									
								});
						}

						reader.readAsDataURL(file);

					};

					head.appendChild(bootstrapButtons);
					head.appendChild(JcropCss);
					head.appendChild(JcropJs);
					
					picture.append(areaCrop);

				
				}
				
				var updatePreview = function (c){
				
					if (parseInt(c.w) > 0){
						var rx = label.width() / c.w;
						var ry = label.height() / c.h;
						
						previewCoordinates.backgroundSize      = Math.round(rx * boundx) + 'px';
						previewCoordinates.backgroundPositionX = '-' + Math.round(rx * c.x) + 'px';
						previewCoordinates.backgroundPositionY = '-' + Math.round(ry * c.y) + 'px';

					}
				
				}

				var destroy = function(){

					try{
						jcrop_api.destroy();					
					}catch(e){}

					try{
						head.removeChild(bootstrapButtons);					
					}catch(e){}

					try{
						head.removeChild(JcropCss);					
					}catch(e){}

					try{
						head.removeChild(JcropJs);					
					}catch(e){}

					try{
						containerCrop.remove();					
					}catch(e){}
					

					element.val('');
				}

		    });

		},

		destroy : function(){

			return this.each( function (){

				var element = $(this);
				var head    = document.getElementsByTagName('head')[0];

				try{
					head.removeChild(document.getElementById('bootstrapButtons'));
					
				}catch(e){}

				try{
					head.removeChild(document.getElementById('JcropCss'));
				}catch(e){}

				try{
					head.removeChild(document.getElementById('JcropJs'));					
				}catch(e){}

				element
						.removeAttr('accept')
						.removeAttr('class')
						.removeAttr('style')
						.val('');

				$('label[for="' + element.attr('id') + '"]').remove();

				$("#containerCrop").remove();

			});

		}

	};


	$.fn.imageUpload = function(method) {
	
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.imageUpload' );
		}

	};

})(jQuery);
