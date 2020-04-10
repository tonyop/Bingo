import React from 'react';
import PropTypes from 'prop-types';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import BingoSquare from './BingoSquare.js';
import './Bingo.css';




import logoB from './logo/B.png';
import logoI from './logo/I.png';
import logoN from './logo/N.png';
import logoG from './logo/G.png';
import logoO from './logo/O.png';

let colors = [['rgb(255, 230, 168)', 'rgb(255, 117, 209)'],
              ['rgb(184, 255, 143)','rgb(255, 117, 142)'],
              ['rgb(143, 244, 255)','rgb(255, 255, 255)']];


const Confefe = () => {
  const { wid, hgt } = useWindowSize();
  return <Confetti height={hgt} width={wid}/>;
}



class BingoBoard extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);

    let boardStyle;
    let boardColor1;
    let boardColor2;
    let drawstyle = Math.random();
    let drawcolor = Math.random();
    let draworder = Math.random();

    if (drawstyle<0.33) {
      boardStyle = 'vertical';
    }
    else if (drawstyle<0.66){
      boardStyle = 'horizontal';
    }
    else{
      boardStyle = 'diagonal';
    }

    if (drawcolor<0.33) {
      if (draworder<0.5) {
        boardColor1 = colors[0][0];
        boardColor2 = colors[0][1];
      }
      else {
        boardColor1 = colors[0][1];
        boardColor2 = colors[0][0];
      }
    }
    else if (drawcolor<0.66){
      if (draworder<0.5) {
        boardColor1 = colors[1][0];
        boardColor2 = colors[1][1];
      }
      else {
        boardColor1 = colors[1][1];
        boardColor2 = colors[1][0];
      }
    }
    else{
      if (draworder<0.5) {
        boardColor1 = colors[2][0];
        boardColor2 = colors[2][1];
      }
      else {
        boardColor1 = colors[2][1];
        boardColor2 = colors[2][0];
      }
    }

    this.state = {
      board: [], boardState: [], foundBingo: false, gridSize: 0,
      boardStyle: boardStyle, boardColor1: boardColor1, boardColor2: boardColor2,
    };

    this.handleSquareChange = this.handleSquareChange.bind(this);
  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    
    let brd = [];
    let brdState = [];
    for (let r=0; r<this.props.gridSize; r++){
      brd.push([]);
      brdState.push([]);
      for (let c=0; c<this.props.gridSize; c++){
        let found = false;
        let randomNumber;
        while (!found){
          randomNumber = 1+(15*c)+Math.floor(Math.random() * 15);
          found = true;
          for (let rt=0; rt<r; rt++){
            if(randomNumber===brd[rt][c].num){
              found = false;
              break;
            }
          }
        }
        if (r===2 && c===2){
          randomNumber = -1;
        }
        brd[r].push({row:r, col:c, num:randomNumber});
        brdState[r].push(false);
      }
    }

    this.setState({gridSize: this.props.gridSize,
                    board: brd, boardState: brdState});

  }

  handleSquareChange(data) {
    const { row } = data;
    const { col } = data;
    //const { num } = data.num;
    const { beenCalled } = data;

    const { boardState } = this.state;
    boardState[row][col] = beenCalled;

    

    let found = false;
    for (let r=0; r<this.props.gridSize; r++){
      let row_true = true;
      for (let c=0; c<this.props.gridSize; c++){
        row_true = row_true && boardState[r][c];
      }
      if (row_true){
        found = true;
        break;
      }
    }

    

    for (let c=0; c<this.props.gridSize; c++){
      let col_true = true;
      for (let r=0; r<this.props.gridSize; r++){
        col_true = col_true && boardState[r][c];
      }
      if (col_true){
        found = true;
        break;
      }
    }

    let diag_true = true;
    let gaid_true = true;
    for (let cr=0; cr<this.props.gridSize; cr++){
      diag_true = diag_true && boardState[cr][cr];
      gaid_true = gaid_true && boardState[cr][this.props.gridSize-cr-1];
    }
    if (diag_true || gaid_true){
      found = true;
    }

    this.setState({boardState: boardState, foundBingo:found});
  }


  render() {
    const { board } = this.state;
    const { gridSize } = this.state;
    const { boardStyle } = this.state;
    const { boardColor1 } = this.state;
    const { boardColor2 } = this.state;
    const { foundBingo } = this.state;

    let conf;
    if (foundBingo){
      conf = <Confefe />;
    }
    
    const title = ["B", "I", "N", "G", "O"];
    const title_files = [logoB, logoI, logoN, logoG, logoO]
    return (
      <div>
        <div style={{position:'absolute', zIndex:'200'}}>
        {conf}
        </div>
        <div className="board" style={{ zIndex: '2' }}>
          
          <div style={{ marginTop:'1%', height: '100%', width: '100%' }}>
            <div className="rowLetter" style={{ marginBottom: '2%'}}>
                {title.map((elm, index) => (
                  <div key={'letter_'+index.toString()} className="column" style={{backgroundColor: 'white'}}>
                    <div style={{ position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)' }}>
                      <img className="bingoLetter" src={title_files[index]} alt="loading..." />
                    </div>
                  </div>
                ))}
            </div>

            {board.map((row, rindex) => (
              <div key={'bingrow_'+rindex.toString()} className="row">
                {row.map((elm, cindex) => (
                  <BingoSquare key={'bingo_'+rindex.toString()+'_'+cindex.toString()} onCalledChange={this.handleSquareChange} 
                                row={elm.row} 
                                col={elm.col} 
                                num={elm.num} 
                                style={boardStyle} 
                                color1={boardColor1} 
                                color2={boardColor2} 
                                gridSize={gridSize}/>
                  ))}
              </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

BingoBoard.propTypes = {
  gridSize: PropTypes.number.isRequired,
};
export default BingoBoard;