(function(){
	//arrays que armazenam o estado do jogo e o de vitória, respectivamente
	var tiles = [],
		answer = [];
		
	//tela de start game
	var startScreen = document.querySelector("#startScreen");
		startScreen.addEventListener("click",startGame,false);
	var overScreen = document.querySelector("#overScreen");
		
	//função que inicializa os elementos do jogo
	function init(){
		//varre os elementos 'btn' adicionando a imagem e inserindo os elementos no array
		for(var i = 1; i < 9; i++){
			var tile = document.querySelector("#n"+i);
			tile.style.background = "url('img/n"+ i +".png')";
			tile.addEventListener("click",moveTile,false);
			tiles.push(tile);
		}
		//completa o array com um espaço nulo e o copia para a resposta, depois renderiza o tabuleiro
		tiles.push(null);
		answer = tiles;
		
		render();
	}
	
	//ajusta a exibição do tabuleiro em função do array tiles
	function render(){
		for(var i in tiles){
			var tile = tiles[i];
			if(tile){
				tile.style.left = (i%3) * 100 + 10 + "px";
				if(i<3){
					tile.style.top = "10px";
				} else 
				if(i<6){
					tile.style.top = "105px";
				} else {
					tile.style.top = "205px";
				}
			
			}
		}
	}
	
	//valida o array	
	function validGame(array){
		var inversions = 0;
		var len = array.length;
		for(var i = 0; i < len-1; i++){
			for(var j = i; j < len; j++){
				if(array[i] && array[j] && array[i].dataset.value > array[j].dataset.value){
					inversions++;
				}
			}
		}
		return inversions % 2 === 0;
	}
	
	//ordenação do array
	function randomSort(oldArray){
		var newArray = [];
		newArray.push(oldArray[0]);
		newArray.push(oldArray[2]);
		newArray.push(oldArray[4]);
		newArray.push(oldArray[3]);
		newArray.push(oldArray[5]);
		newArray.push(oldArray[7]);
		newArray.push(oldArray[6]);
		newArray.push(oldArray[1]);
		
		
		return newArray;
	}
	
	//função que inicia o jogo removendo a tela inicial e ordenando conforme fixado
	function startGame(){
		tiles = randomSort(tiles);
		this.removeEventListener("click",startGame,false);
		this.style.opacity = "0";
		this.style.zIndex = -1;
		render();
	}
	
	//mover as peças com verificação das bordas
	function moveTile(){
		var index = tiles.indexOf(this);
				
		if(index % 3 !== 0){
			//move a peça para a esquerda, caso o espaço esteja vazio
			if(!tiles[index-1]){
				tiles[index-1] = this;
				tiles[index] = null;
			}
		}
				
		if(index % 3 !== 2){
			//move a peça para a direita, caso o espaço esteja vazio
			if(!tiles[index+1]){
				tiles[index+1] = this;
				tiles[index] = null;
			}
		}
				
		if(index > 2){
			//move a peça para o topo, caso o espaço esteja vazio
			if(!tiles[index-3]){
				tiles[index-3] = this;
				tiles[index] = null;
			}
		}
				
		if(index < 6){
			//move a peça para baixo, caso o espaço esteja vazio
			if(!tiles[index+3]){
				tiles[index+3] = this;
				tiles[index] = null;
			}
		}
		
		render();
		
		//verificar a condição de vitória
		if(chkWin()){
			gameOver();
		}
		
		function chkWin(){
			for(var i in tiles){
				var a = tiles[i];
				var b = answer[i];
				if(a !== b){
					return false;
				}
			}
			return true;
		}
		
		function gameOver(){
			overScreen.style.zIndex = "1";
			overScreen.style.opacity = "1";
			setTimeout(function(){
				overScreen.addEventListener("click",startGame,false);
			},500);
		}
	}
	
	init();
}());
