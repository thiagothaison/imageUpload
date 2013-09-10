(function($){
	$.fn.imageUpload = function(options) {
	
		var element = this;
		var jcrop_api;
		var cropCoordinates = {};
		var previewCoordinates = {};
		var aspectRatio;
		imageOfUpload = null;

		var settings = $.extend( {
			path			  : '',
			uploadFolder      : './',
			cssFile           : 'css/imageUpload.jquery.css',
			uploadFile        : 'imageUpload.php',
			imageDefault      : 'data:image/png;base64,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',
			maxFileSize       : '1024',
			fileTypes         : ['image/jpeg' , 'image/png'],
			cropImage         : false,
			onComplete        : function(){},
			onError           : function(){}
		}, options);
		
	    return this.each(function() {
		
			var label    = jQuery('<label></label');
			var progress = jQuery('<span></span>');
			var head     = document.getElementsByTagName('head')[0];			

			var css = document.createElement('link');
				css.href = settings.path + settings.cssFile;
				css.rel  = 'stylesheet';
				css.type = 'text/css';
				head.appendChild(css);

			
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
				.attr('title','Clique ou arraste uma imagem para alterar.')
				.append(progress);
			
			element
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
			
			jQuery(document).bind('dragover', function(e){
				dragAreaHover(e);
			});
			
			jQuery(document).bind('dragleave', function(e){
				dragAreaHover(e);
			});
			
			jQuery(document).bind('drop', function(e){
				e.stopPropagation();
				e.preventDefault();
				
				jQuery("body").removeClass('hover');
				jQuery('#opacity-box').remove();
				
			});
			
			jQuery(document).bind('mouseenter', function(){
				jQuery("body").removeClass('hover');
				jQuery('#opacity-box').remove();
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
					
					jQuery("body").addClass('hover');

					try{
						window.clearInterval(itv);
					}catch(ex){}
					
				}else{
				
					remove = function(){
					
						jQuery("body").removeClass('hover');
						jQuery('#opacity-box').remove();
						
						try{
							window.clearInterval(itv);
						}catch(ex){}
					}
					
					itv = window.setTimeout(remove, 500);
				}
			
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

			};
			
			var drop = function(e) {
			
				dragHover(e);
				
				event = e.originalEvent;
				file = event.dataTransfer.files[0];

				read(file);
				
			};
			
			var read = function(file) {

				if ( jQuery.inArray(file.type, settings.fileTypes) == -1){
					triggerError('Tipo de arquivo proibido.');
					return;
				}
				
				if ( file.size > ( settings.maxFileSize * 1000 ) ){
					triggerError('Arquivo muito grande.');
					return;
				}
				
				if ( settings.cropImage ){
					cropImage(file);
					return;
				}
				
				sendFile(file);
			}
			
			var triggerError = function(message){
				
				var errorMessage = jQuery('<span></span>');
				errorMessage
					.text(message)
					.addClass('messageError');
					
				label
					.addClass('error')
					.append(errorMessage);
					
				removeError = function(){
					element.parent().find('.messageError').remove();
					label.removeClass('error');
				};
				
				window.setTimeout(removeError,3000);
				
			}
			
			var sendFile = function(file) {
				
				var data = new FormData();
				data.append('file',file);
				data.append('uploadFolder',settings.path + settings.uploadFolder);
				
				jQuery.each(cropCoordinates, function(x,y){
					data.append('cropCoordinates['+x+']',y);
				});
			
				jQuery
					.ajax({
						url: settings.path + settings.uploadFile,
						data: data,
						cache: false,
						contentType: false,
						processData: false,
						type: 'POST',
						
						beforeSend: function(){
							label
								.addClass('sending')
								.removeAttr('for');
							
						},
						
						success: function(result){
							label
								.addClass('success')
								.removeClass('sending')
								.attr('for', element.attr('id'))
								
							var reader = new FileReader();

							reader.onload = function(f) {
								label
									.css('background-image','url(' + f.target.result + ')');
							}

							reader.readAsDataURL(file);
								
							jQuery.each(previewCoordinates, function(x,y){
								label.css(x,y);
							});
							
							settings.onComplete();
							
							jcrop_api.destroy();
							
							head.removeChild(bootstrapButtons);
							head.removeChild(JcropCss);
							head.removeChild(JcropJs);
							
							containerCrop.remove();
							
							console.log(result)
							
						},
						
						error: function(result){
							label
								.addClass('error')
								.removeClass('sending')
								.attr('for', element.attr('id'));
								
							triggerError('Erro durante o envio. Tente novamente.');
							settings.onError();
						},
						
						xhr: function() {
							myXhr = $.ajaxSettings.xhr();

							if(myXhr.upload){
								myXhr.upload.addEventListener('progress',function showProgress(evt) {

									if (evt.lengthComputable) {
										var percentComplete = (evt.loaded / evt.total) * 100;
										jQuery('.imageUpload + label > span.progress').css('width',percentComplete + '%');
									}  
								}, false);
							} else {
								console.log("Upload progress is not supported.");
							}
							return myXhr;
						}
					
					});
				
			}
			
			var cropImage = function(file){


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
					JcropJs.src  = settings.path + 'plugin/Jcrop/js/jquery.Jcrop.js';
			
				var 
					div           = jQuery('<div></div>'), 
					button        = jQuery('<button></button>'),
					link          = jQuery('<link/>'),
					img           = jQuery('<img />'),
					script		  = jQuery('<script></script>'),
					
					containerCrop = div.clone(),
					tableCrop     = div.clone(),
					tableCellCrop = div.clone(),
					center 		  = div.clone(),
					border 		  = div.clone(),
					box           = div.clone(),
					picture       = div.clone(),
					buttons       = div.clone(),
					
					buttonCancel  = button.clone(),
					buttonCrop    = button.clone();
					
					areaCrop      = img.clone(); 
				
				containerCrop
					.attr('id','containerCrop');
					
				tableCrop
					.attr('id','tableCrop');

				tableCellCrop
					.attr('id','tableCellCrop');

				center
					.attr('id','center');
					
				border
					.attr('id','border');
					
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
					
						jcrop_api.destroy();
							
						head.removeChild(bootstrapButtons);
						head.removeChild(JcropCss);
						head.removeChild(JcropJs);
						
						containerCrop.remove();
					});
					
				buttonCrop
					.text('Cortar')
					.addClass('btn')
					.addClass('btn-azul')
					.bind('click',function(){
						sendFile(file);
					});
				
					
				jQuery('body').append(
					containerCrop.append(
						tableCrop.append(
							tableCellCrop.append(
								center.append(
									border.append(
										box.append(picture).append(buttons)
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
	
				var reader = new FileReader();

				reader.onload = function(f) {				
					areaCrop
						.attr('src',f.target.result);
					imageOfUpload = f.target.result;
				}

				JcropJs.onload = function() {

					areaCrop
						//.attr('src',imageOfUpload)
						//.attr('src','images/sago.jpg')
						.attr('src','src')
						.Jcrop({
							bgOpacity: 0.4,
							aspectRatio : 1,
							onChange: function(c){
								cropCoordinates.x  = c.x  * aspectRatio;
								cropCoordinates.y  = c.y  * aspectRatio;
								cropCoordinates.x2 = c.x2 * aspectRatio;
								cropCoordinates.y2 = c.y2 * aspectRatio;
								cropCoordinates.w  = c.w  * aspectRatio;
								cropCoordinates.h  = c.h  * aspectRatio;

								updatePreview(c);
								
							},
							onSelect: function(c){
							
								updatePreview(c);
							}
						},function(){
						
							jcrop_api = this
							
							var imgOriginal = new Image();
							imgOriginal.src = areaCrop.attr('src');
							
							aspectRatio = imgOriginal.width / areaCrop.width();
							
							var bounds = this.getBounds();
								boundx = bounds[0];
								boundy = bounds[1];
							
						});

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


	    });

	 };
})(jQuery);

jQuery("#imageUpload")
	.imageUpload({
		uploadFolder : 'fotos/',
		imageDefault : 'images/anonymous.gif',
		maxFileSize  : 999999,
		fileTypes    : ["image/jpeg","image/png"],
		cropImage    : true
	});