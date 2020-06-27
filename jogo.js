class Jogo extends React.Component {
    render() {
      return(
        <div className="jogo">
          <div className="jogo-tabuleiro">
            <Tabuleiro 
              quadrados={Array(9)
                .fill()
                .map((value,pos) => pos)}
              />
          </div>
             <div className="jogo-info">
                <ol>{"Movimentos"}</ol> 
            </div>
        </div>
      );
    }
  }
  
  class Tabuleiro extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        quadrados: Array(9).fill(null),
        xIsNext: true
      };
    }  
    render() {
      return (
        <div>
          <div className="linha">
            {this.renderizarQuadrado(0)}
            {this.renderizarQuadrado(1)}
            {this.renderizarQuadrado(2)}
          </div>
          <div className="linha">
            {this.renderizarQuadrado(3)}
            {this.renderizarQuadrado(4)}
            {this.renderizarQuadrado(5)}
          </div>
          <div className="linha">
            {this.renderizarQuadrado(6)}
            {this.renderizarQuadrado(7)}
            {this.renderizarQuadrado(8)}
        </div>
            <div className="linha">
              <button className="btnPlayAgain" onClick={() => this.reiniciarJogo()}>
                Reset game
              </button>
            </div>
              <div className="linha">
              <button className="btnPlayerOne" onClick={() => this.playerOneTurn()}>
                Player 1
              </button>
            </div>
            <div className="linha">
              <button className="btnBotMaster" onClick={() => this.BotMasterTurn()}>
                Bot Master
              </button>
            </div>
        </div>
  
      );   
    }
    renderizarQuadrado (i){
      return (
        <Quadrado
          value={this.state.quadrados[i]}
          onClick={() => this.handleClick(i)}       
          />
      );
    }
    handleClick (i){
      const quadrados = this.state.quadrados.slice();    
      let vencedor = Winner(quadrados);
      
      // Impede que um quadrado seja ocupado novamente
      if(quadrados[i]){
        alert("Esse quadrado já foi ocupado!");
        return;
      }
      
      if (vencedor){
        alert(vencedor + " ganhou!");
        return;
      }    
      quadrados[i] = this.state.xIsNext ? "X" : "O";    
      this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext});
    }
    
    
    // Método para reiniciar o jogo
    reiniciarJogo(){
      // Cria um array de quadrados
      const quadrados = this.state.quadrados.slice();
      for(let contador = 0; contador < quadrados.length; contador++){
        // esvazia cada um dos quadrados
        quadrados[contador] = null;
      }
      // Passa os quadrados zerados para o estado atual
      // Além disso, garante que o jogo vai ser reiniciado com 'X', como se tivesse realmente começado novamente
      this.setState({quadrados: quadrados, xIsNext: true});    
    }
    
    // Efetua uma jogada aleatória no tabuleiro
    playerOneTurn(){
      // Cria um array com os quadrados
      const quadrados = this.state.quadrados.slice();
      
      // Se a partida já tiver vencedor, não tem porque tentar fazer jogada
      let vencedor = Winner(quadrados);    
      if(vencedor){
        alert(vencedor + " ganhou!");
        return;
      }
      
      
      let isFieldFull = this.isFieldFull(quadrados);    
      if(isFieldFull){
        alert("Velhaaaaaa!");
        return;
      }
      
      var isNumberFound = false;
      
      do{
        var randomNumber = Math.floor(Math.random() * 9);
        if(quadrados[randomNumber] === null){

          quadrados[randomNumber] = this.state.xIsNext ? "X" : "O";
          this.setState({quadrados: quadrados, xIsNext: !this.state.xIsNext});
          isNumberFound = true;
        }
      }while(!isNumberFound);
    }
    

    isFieldFull(quadrados){
      for(var count = 0; count < quadrados.length; count++){
        if(quadrados[count] == null){
          return false;
        }
      }    
      return true;
    }
    
   BotMasterTurn(){
      const quadrados = this.state.quadrados.slice();
      let vencedor = Winner(quadrados);    
      if(vencedor){
        alert(vencedor + " ganhou!");
        return;
      }   
     let segurarOGame = counterPlay(quadrados, this.state.xIsNext ? "O" : "X");
     
     if(segurarOGame){
       quadrados[segurarOGame] = this.state.xIsNext ? "X" : "O";
       this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
     }
     else{
       this.playerOneTurn();
       return;
     }   
   } 
    
  }
  
  function  counterPlay(squares, tipo){
      const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
  
      // ver se tem um quadrado sobrando na linha ou coluna
      for (let count = 0; count < lines.length; count++) {
        const [a, b, c] = lines[count];
        if (squares[a] === tipo && squares[a] === squares[b] && squares[c] === null){
          return c;
        }        
        else if (squares[a] === tipo && squares[a] === squares[c] && squares[b] === null){
          return b;
        }        
        else if (squares[b] === tipo && squares[b] === squares[c] && squares[a] === null){
          return a;
        }
      }
      return null;
    }
  
  function Winner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    
    for (let i = 0; i < lines.length; i++){
      const[a,b,c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }      
    }
    return null;
  }
  
  
  class Quadrado extends React.Component {
    constructor(props) {
      super(props);
    }
    
    
    render(){
      return(
      <button className="quadrado" onClick={() => this.props.onClick()}>
          {this.props.value}     
        </button>
      );
    }
  }            
  ReactDOM.render(<Jogo />, document.getElementById("root"));
  