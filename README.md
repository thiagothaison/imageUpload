imageUpload
===========

imageUpload é um plugin que viza agilizar a maneira como é feita upload de imagens. Ele combina a facilidade de utilização do jQuery com a poderosa ferramente de corte de imagens Jcrop (https://github.com/tapmodo/Jcrop).

Compatibilidade
---------------

imageUpload foi testada e está homologada para os browsers:
* Firefox 23+
* Google Chrome 29+

Visão geral dos recursos
------------------------

* Suporte aos formatos mais conhecidos de imagem (jpg, png, gif, bmp);
* Definição da imagem padrão que será exibida quando a página for carregada;
* Definição do local de upload;
* Redimensionamento de Imagens durante o upload;
* Conversão de imagens durante o upload;
* Possibilidade de filtrar os tipos de imagens e tamanho permitidos;
* Suporte a drag and drop;
* Suporte a barra de progresso.



Como usar?
----------

Para usar imageUpload, basta instanciá-lo à algum elemento input[type='file']

    jQuery("#file").imageUpload();
  

Parâmetros
------

Para configurar o comportamento do plugins, algum parâmetros estão disponíveis:

* path;
* uploadFolder;
* uploadFile;
* imageDefault;
* maxFileSize;
* fileTypes;
* Jcrop;
* resizeTo;
* renameTo;
* convertTo.


### path
Define o local onde o plugin está localizado:

    jQuery("#file").imageUpload(
    	path : 'plugins/imageUpload/'
    );

### uploadFolder
Define o local para onde as imagens serão enviadas após o upload:

    jQuery("#file").imageUpload(
    	uploadFolder : 'images/user/'
    );

### uploadFile
Define o arquivo que será responsável por receber as e tratar as informações para o upload:

    jQuery("#file").imageUpload(
    	uploadFolder : 'imageUpload.php',
    );

### imageDefault
Informa ao plugin qual imagem deverá exibir quando a página for carregada:

    jQuery("#file").imageUpload(
    	imageDefault : 'images/user/default.jpg'
    );

ou

    jQuery("#file").imageUpload(
    	imageDefault : jQuery("imageUser").attr('src')
    );

### maxFileSize
Define qual o tamanho máximo permitido (em kb) para o upload:

    jQuery("#file").imageUpload(
    	maxFileSize : 1024
    );

### fileTypes
Um array informando os tipos de arquivos permitidos para o upload:

    jQuery("#file").imageUpload(
    	fileTypes : ["image/jpeg","image/png","application/pdf"]
    );

### Jcrop
Envia ao Jcrop os parâmetros que serão utilizados:

    jQuery("#file").imageUpload(
    	Jcrop : { 
    		bgColor     : 'black', 
    		bgOpacity   : 0.4, 
    		aspectRatio : 1
    	}
    );

### resizeTo
Define a altura e/ou largura da saída da imagem:

    jQuery("#file").imageUpload(
    	resizeTo : {
			width: 150,
			height: 150
		}
    );
	
É possível também passar apenas uma dimensão e a outra é calculada automaticamente, mantendo a proporção da imagem:

    jQuery("#file").imageUpload(
    	resizeTo : {
			width: 450
		}
    );
	
ou

    jQuery("#file").imageUpload(
    	resizeTo : {
			height: 370
		}
    );	

### renameTo
Define o nome da saída da imagem:

    jQuery("#file").imageUpload(
    	renameTo : 'nova_imagem'
    );

Caso `renameTo` não seja definido, o nome da saída será o mesmo da estrada.

### convertTo
Define o formato da saída da imagem:

    jQuery("#file").imageUpload(
    	convertTo : 'png'
    );

Caso `convertTo` não seja definido, o formato da saída será o mesmo da estrada.




Callbacks
---------
Algumas funções de callback estão disponíveis:

* onBeforeSend;
* onComplete;
* onError;
* onProgress;
* onDrag;
* onDrop.


### onBeforeSend

O evento `onBeforeSend` é disparado antes do envio da imagem:

    jQuery("#file").imageUpload(
    	onBeforeSend : function(){
    		jQuery("span.status").text('Aguarde');
    	}
    );
	
`onBeforeSend` pode também receber um parâmetro com as informações do arquivo:

    jQuery("#file").imageUpload(
    	onBeforeSend : function(file){
    		console.info('Última modificação : ' + file.lastModifiedDate );
			console.info('Nome : ' + file.name );
			console.info('Tamanho : ' + file.size + 'b' );
			console.info('Tipo : ' + file.type );
    	}
    );

### onComplete

O evento `onComplete` é disparado após o envio da imagem ser concluído com sucesso:

    jQuery("#file").imageUpload(
    	onComplete : function(){
    		jQuery("span.status").text('Enviado com sucesso');
    	}
    );


### onError

O evento `onError` é disparado quando ocorre algum erro durante o upload:

    jQuery("#file").imageUpload(
    	onError : function(){
    		jQuery("span.status").text('Opss...');
    	}
    );
    
`onError` pode também receber um parâmetro com a mensagem de erro:

    jQuery("#file").imageUpload(
    	onError : function(erro){
    		jQuery("span.status").text(erro);
    	}
    );

### onProgress
O evento `onProgress` é disparado durante o envio da imagem e recebe um parâmetro com as informações da transferência:

    jQuery("#file").imageUpload(
    	onProgress : function(p){		
			percent = p.loaded / p.total * 100 + '%';
			jQuery("progressBar").css('width',percent);
    	}
    );
	
### onDrag

O evento `onDrag` é disparado quando algo é arrastado para o navegador:

    jQuery("#file").imageUpload(
    	onDrag : function(){
    		console.inf('Novo arquivo para ser arrastado');
    	}
    );

### onDrop

O evento `onDrop` é disparado quando algo é solto no navegador:

    jQuery("#file").imageUpload(
    	onDrop : function(){
    		console.inf('Novo arquivo solto no navegador');
    	}
    );


Autor
-----

* Thiago Thaison (thiagothaison@gmail.com)
