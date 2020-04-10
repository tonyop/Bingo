import React from 'react';
import PropTypes from 'prop-types';
import './Bingo.css';

import stampG1 from './stamps/green_1.png';
import stampG2 from './stamps/green_2.png';
import stampG3 from './stamps/green_3.png';
import stampG4 from './stamps/green_4.png';
import stampG5 from './stamps/green_5.png';
import stampB1 from './stamps/blue_1.png';
import stampB2 from './stamps/blue_2.png';
import stampB3 from './stamps/blue_3.png';
import stampB4 from './stamps/blue_4.png';
import stampB5 from './stamps/blue_5.png';
import stampP1 from './stamps/pink_1.png';
import stampP2 from './stamps/pink_2.png';
import stampP3 from './stamps/pink_3.png';
import stampP4 from './stamps/pink_4.png';
import stampP5 from './stamps/pink_5.png';

let stamps = [stampG1, stampG2, stampG3, stampG4, stampG5,
              stampB1, stampB2, stampB3, stampB4, stampB5,
              stampP1, stampP2, stampP3, stampP4, stampP5]



class BingoSquare extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      row: -1, col: -1, num: -1, beenCalled: false, 
      randomstamp: 0, heightNum: '77%', topNum:'50%',
      style: 'horizontal', color1: 'rgb(0,0,0)', color2:'rgb(255,255,255)',
      gridSize: 5
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    this.setState({row: this.props.row,
                    col: this.props.col,
                    num: this.props.num,
                    style: this.props.style,
                    color1: this.props.color1,
                    color2: this.props.color2,
                    gridSize: this.props.gridSize});
  }

  handleClick() {
    // e.preventDefault();
    const { row } = this.state;
    const { col } = this.state;
    const { num } = this.state;
    const { beenCalled } = this.state;

    this.setState((prevState) => ({
                    beenCalled: !prevState.beenCalled,
                    randomstamp: stamps[Math.floor(Math.random() * stamps.length)],
                    heightNum: (77+Math.floor(Math.random() * 12)).toString()+'%',
                    topNum: (50+Math.floor(Math.random() * 10)).toString()+'%',
                  }));
    this.props.onCalledChange({row:row, col:col, num:num, beenCalled:!beenCalled});   
  }


  render() {
    // const posts = postsData.map(
    //   (post) => <Post key={post.postid} url={post.url} postid={post.postid} />,
    // );
    const { row } = this.state;
    const { col } = this.state;
    const { num } = this.state;
    const { gridSize } = this.state;
    const { style } = this.state;
    const { color1 } = this.state;
    const { color2 } = this.state;
    const { randomstamp } = this.state;
    const { heightNum } = this.state;
    const { topNum } = this.state;
    const { beenCalled } = this.state;

    let stamp;
    if (beenCalled){
      stamp = <img src={randomstamp} alt="" style={{position:'absolute', height:heightNum, top:topNum, left:'50%', transform: 'translate(-50%, -50%)', zIndex:'100'}}/>
    }
    let card;
    if (num!==-1){
      card = <p style={{zIndex:'10'}}>{num}</p>;
    }
    else{
      card = <p style={{zIndex:'10', color:'rgb(150, 20, 20)'}}>&#9733;</p>;
    }

    let color;
    if (style==='horizontal'){
      if (row%2===0){
        color=color1;
      }
      else{
        color=color2;
      }
    }
    else if (style==='vertical'){
      if (col%2===0){
        color=color1;
      }
      else{
        color=color2;
      }
    }
    else if (style==='diagonal'){
      if ((row*gridSize+col)%2===0){
        color=color1;
      }
      else{
        color=color2;
      }
    }
    else{
      color = 'rgb(255,255,255)';
    }

    if (row===2 && col===2){
      color = 'rgb(255,255,255)';
    }

    return (
      <div className="column" onClick={this.handleClick} style={{backgroundColor:color}}>
          <div style={{ position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)' }}>
            <div >
              {card}
              {stamp}
            </div>
          </div>
      </div>
    );
  }
}

BingoSquare.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  num: PropTypes.number.isRequired,
};
export default BingoSquare;
