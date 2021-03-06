/** Classe que representa o objeto do Background*/

class BG{
	/** Constrói o objeto do BG
  * @param {numero} canvasWidth - Largura do Canvas
  * @param {numero} canvasHeight - Altura do Canvas
  *
  * @property {Imagem} BG1 - Imagem do solo.
  * @property {Imagem} BG2 - Imagem do solo.
  * @property {Imagem} backBG1 - Imagem do plano de fundo
  * @property Imagem{} backBG2 - Imagem do plano de fundo
  * @property {Numero} canvasWidth - Largura do Canvas
  * @property {Numero} canvasHeight - Altura do Canvas
  * @property {Vetor} positionBack1 - posição do primeiro plano de fundo
  * @property {Vetor} positionBack2 - posição do segundo plano de fundo
  * @property {Vetor} position1 - posição do primeiro solo
  * @property {Vetor} position2 - posição do segundo solo
  * @property {Numero} speed - velocidade de deslocamento 

  */
	constructor(canvasWidth,canvasHeight){
    this.BG1 = loadImage('/sprites/BG.png');
    this.BG2 = loadImage('/sprites/BG.png');
    this.backBG1 = loadImage('/sprites/cityBG.gif');
    this.backBG2 = loadImage('/sprites/cityBG.gif');
  	this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.positionBack1 = createVector(0,0);
    this.positionBack2 = createVector(this.canvasWidth,this.positionBack1.y);
    this.position1 = createVector(0,0);
    this.position2 = createVector(this.position1.x+630,this.position1.y);
    this.speed = 15;
  	
  }
  /** Define a posição do Background */
  setBG(){    
  	image((this.backBG1), this.positionBack1.x, this.positionBack1.y);
    image((this.backBG2), this.positionBack2.x, this.positionBack2.y);
    image((this.BG1), this.position1.x, this.position1.y);
    image((this.BG2), this.position2.x, this.position2.y);
  }
  /** Define o carrossel de imagens do fundo */
  setCarrosel(){
  
	  if(this.position1.x <= -this.canvasWidth+10){ //O +10 É SOMENTE UMA CORREÇÃO DO TAMANHO DO SOLO
      this.position1.x = 0;
      this.position2.x += this.position1.x+this.canvasWidth-10
    }
    if(this.positionBack1.x <= -this.canvasWidth+10){ //O +10 É SOMENTE UMA CORREÇÃO DO TAMANHO DO SOLO
      this.positionBack1.x = 0;
      this.positionBack2.x += this.positionBack1.x+this.canvasWidth-10
    }
  }
  
  /** Desloca o BG para sensação de movimento do player 
  * @param {Numero} dir - Direção do movimento.
  */
  setPosition(dir){
  	this.position1.x += this.speed*dir;
    this.position2.x += this.speed*dir;
    this.positionBack1.x += (this.speed/5)*dir;
    this.positionBack2.x += (this.speed/5)*dir;
  }
  /** Retorna a posição X do BG 
  * @return {Numero} Posição x do BG.
  */
  getPositionX(){
  	return this.position1.x;
  }
  /** Retorna a velocidade de deslocamento do BG
  * @return {Numero} a velocidade do deslocamento.
  */
  getSpeed(){
  	return this.speed*dir;
  }
 
}