/** Class representando o objeto do jogador. */

class Player{
  /**
  * Cria o objeto do jogador.
  * @param {numero} posx - Posição x do personagem
  * @param {numero} ground - Posição y do solo
  *
  * @property {Vetor} position - O vetor possui valores da posição de X e Y .
  * @property {numero} puloMax - Variável para definir a altura máxima do pulo.
  * @property {numero} puloForce - Variação de Y por frame durante o pulo.
  * @property {imagem} sprite1 - Imagem 1 do movimento para direita.
  * @property {imagem} sprite2 - Imagem 2 do movimento para direita.
  * @property {imagem} sprite1f - Imagem 1 do movimento para esquerda.
  * @property {imagem} sprite2f - Imagem 2 do movimento para esquerda. 
  * @property {Booleano} jumpFlag - Variavel booleana para saber se o pulo está acontecendo.
  * @property {Booleano} invuneravel - Variável booleanda para saber se o jogador está invunerável.
  * @property {numero} lifeMax - Define o máximo de vidas do jogador
  * @property {Vetor} life - define quantas vidas o jogador tem no momento

  */
	constructor(posx, ground){
    this.position = createVector(posx, ground);
    this.puloMax = ground-100;
    this.puloForce = 21;
		this.score = 0;
    this.deltaPos = 0;
    //--------------------
    this.sprite1 = loadImage('/sprites/boi1.png');
    this.sprite2 = loadImage('/sprites/boi2.png');
    this.sprite1f = loadImage('/sprites/boi1Flip.png');
    this.sprite2f = loadImage('/sprites/boi2Flip.png');
    this.lifeImg = loadImage('/sprites/life.png');
    //--------------------
    this.jumpFlag = false;
    this.invuneravel = false;
    //-------------------
    this.lifeMax = 3;
    this.life = [1, 1, 1];
    //-------------------
    
  }
  /** Testa a posição do BG 
  * @param {numero} posBG - Posição X do Background
  * @return {booleano} Um valor booleano.
  */  
  testePos(posBG){
    var x = posBG%2;
    if(x == 0) return true;
    else return false;
  }
  /** Exibe o sprite adequado na tela.
  * @param {Numero} posBG - a posição X do background.
  * @param {Numero} dir - a direção do movimento.
  */
  show(posBG, dir){    
    if(this.testePos(posBG) && dir == -1) image(this.sprite1,this.position.x,this.position.y);
    else if (!this.testePos(posBG) && dir == -1) image(this.sprite2,this.position.x,this.position.y);
    else if (this.testePos(posBG) && dir == 1) image(this.sprite1f,this.position.x,this.position.y);
    else if (!this.testePos(posBG) && dir == 1) image(this.sprite2f,this.position.x,this.position.y);
  }
  /** Testa se um pulo está ocorrendo.
  * @return {booleano} um valor booleano.
  */
  jumpTest(){
    if(this.position.y > this.puloMax && this.jumpFlag == true) {
      return true;
    }
    else {
      this.jumpFlag = false;
      return false;
    }
  }
  /** realiza o pulo */
  jump(){
    this.jumpFlag = true;
    if(this.jumpTest()){
    	this.position.y -= this.puloForce;
    }
  }
  /** Retorna a posição X do vetor de posições.
  * @return {number} a posição X do vetor de posições.
  */
  getPositionX(){
  	return this.position.x;
  }
  /** Retorna a posição Y do vetor de posições.
  * @return {number} a posição Y do vetor de posições.
  */
  getPositionY(){
  	return this.position.y;
  }
  /** Calcula e exibe a pontuação na tela.
  * @param {booleano} flag - Flag de dano ocorrido.
  */
  scoreShow(flag){
    
    this.score++;
		strokeWeight(1);
    stroke(0);
    fill(0, 102, 153, 51);
  	rect(10,10,200,50);
    fill(0);
    textSize(30);
    text('Score:',15,45);
    textSize(30);
    text(this.score,110,46);
    
    if(flag){
    	this.score+=250
    }
  }
  /** Empilha vidas na pilha de vidas
  * @return {booleano} um valor booleano.
  */
  lifeStack(){
    if(this.life.length == this.lifeMax) return false;
  	if(this.life.length < this.lifeMax) {
      this.life.push(1);
      return true;
    }
  }
  /** Desempilha vidas na pilha de vidas
  * @return {booleano} um valor booleano.
  */
  lifeDrop(){
  	if(this.life.length <= 0) return false;
  	if(this.life.length > 0 && !(this.invuneravel)) {
      this.life.shift();
      this.invuneravel = true;
    }
  }
  /** Exibe a pilha de vidas */
  lifeShow(){
  	for(var i = 0 ; i < this.life.length; i++){
      if(this.life[i] == 1){
    		image(this.lifeImg,250+(20*i),30);
      }
    }
  }
  /** Identifica se o jogador está invuneravel
  * @param {numero} deltaPos - Variação de frames.
  * @return {booleano} retorna um valor booleano
  */
  checkInvu(deltaPos){
  	if(this.invuneravel == true){
    	this.deltaPos += 15;
      if(this.deltaPos >= 100){
      	this.invuneravel = false;
        this.deltaPos = 0;
      }
    } 
  }
  /** Checa se o jogo acabou por falta de vidas */
  lifeCheck(){  
  	if(this.life.length == 0) {
      textSize(50);
      fill(255,0,0);
      stroke(0);
      strokeWeight(10);
      textStyle(BOLD);
      text("GAME OVER", 175, 175);
      noLoop();
    }
  
  }

  
}
