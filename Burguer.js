/** Classe que define o objeto Buguer */
class Burguer{
	/** Construtor do objeto Burguer
  * @param {numero} ground - define a posição y do solo.
  *
  * @property {booleano} burguer - valor booleano que define se há um pbjeto burguer an tela
  * @property {Image} spriteBurguer - Imagem do objeto Burguer
  * @property {Vetor} pool - Vetor que define a pilha de Burguer
  * @property {Numero} ground - recebe a posição Y do Solo
  * @property {Vetor} position - Define as coordenadas cartesianas do objeto
  * @property {booleano} itemFlag - define a existência do Item
  * @property {booleano} attackFlag - Define se o ataque está acontecendo
  * @property {Numero} attackPos - define a posição X do ataque
  * @property {Booleano} damageFlag - Define se ocorreu dano
  */
	constructor(ground){
    
    this.burguer = false; 
    this.spriteBurguer = loadImage('/sprites/Burguer/burguer.png');
    this.pool = [];
    this.ground = ground;
    this.position = createVector(width,this.ground);
    this.itemFlag = false;
    this.attackFlag = false;
    this.attackPos = 0;
    this.damageFlag = false;
    
  }
	/** Exibe o hamburguer no jogo
  * @return {booleano} a existencia ou não de hamburguer
  */
  showBurguer(){
    if(!(this.burguer)) {
      image(this.spriteBurguer,this.position.x,this.ground,32,32);
      this.itemFlag = true;
      return true;
    } else return false;
  }
	/** Identifica se o jogador pegou o item
  * @param {Numero} posX - define a posição X do jogador
  * @param {Numero} posT - define a posição T do jogador
  * @return {booleano} verdadeiro caso o jogador tenha pegado.
  */
  got(posX, posY){
  	if(posX+32 >= this.position.x && posX <= this.position.x+32 && this.position.y+32 >= posY){
      return true;
    }
  }
  /** Realiza o movimento do Burguer na tela
  * @param {booleano} mov - Identifica se o solo está está havendo movimento no jogo
  * @param {Numero} speed - define a velocidade do movimento do jogo
  * @return {booleano} falso se o hamburguer saiu da tela
  */
  move(mov, speed){
  
    if(mov)	this.position.x += speed ;
    if(this.position.x < 0){
    	this.position.x = width;
      this.burguer = false;
    }
    
  }
	/** Some o hamburguer da tela se o jogador pega o mesmo */
  vanishBurguer(){
    this.burguer = true;
    this.itemFlag = false;
  }
  
  /** Inverte o valor do atributo itemFlag */
  setItemFlag(){
  	this.itemFlag = !this.itemFlag;  
  }
  /** retorna o valor de itemFlag
  * @return {booleano} o valor de itemFlag
  */
  getItemFlag(){
  	return this.itemFlag;
  }
  /** Empilha 1 hamburguer na pilha de hamburguer*/
  feedPool(){
  	this.pool.push(true);
  }
  /** Exibe a pilha de hamburguer */
  showPool(){
  	for(var i = 0 ; i < this.pool.length ; i++){
      if(this.pool[i] == true){
        image(this.spriteBurguer,width - 50, height-(i*50)-100, 32,32)
      }
    }
  }
  /** inverte o valor do atributo damageFlag */
  setDamageFlag(){
  	this.damageFlag = !(this.damageFlag);
  }
  /** retorna o valor de damageFlag
  * @return {booleano} o valor de damageFlag
  */
  getDamageFlag(){
  	return this.damageFlag;
  }
  /** Realiza o ataque
  * @param {numero} bossX - Posição X do Boss
  * @param {numero} playerX - Posição X do Player
  */
  attack(bossX,playerX){
  	if(this.pool.length == 3){
    	this.pool.shift();
     	this.pool.shift();
      this.pool.shift();
      this.attackFlag = true;
      this.attackPos = playerX;
    }
    
    if(this.attackFlag){
    	image(this.spriteBurguer, this.attackPos, 200, 100,100);
      this.attackPos-=5;
      if(this.attackPos < bossX+250){
      	this.attackFlag = !(this.attackFlag);
        this.damageFlag = true;
      }
    }
  }

}