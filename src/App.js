import React from 'react';
import Sky from 'react-sky';
import BingoBoard from './BingoBoard.js';
import './App.css';
import './Bingo.css';



const emojis = {0: 'https://image.flaticon.com/icons/svg/743/743247.svg',
                1: 'https://image.flaticon.com/icons/svg/743/743267.svg',
                2: 'https://image.flaticon.com/icons/svg/742/742923.svg',
                3: 'https://image.flaticon.com/icons/svg/742/742920.svg',
                4: 'https://image.flaticon.com/icons/svg/742/742836.svg',
                5: 'https://www.flaticon.com/premium-icon/icons/svg/2018/2018428.svg',
                6: 'https://image.flaticon.com/icons/svg/743/743199.svg',
                7: 'https://image.flaticon.com/icons/svg/743/743284.svg',
                8: 'https://image.flaticon.com/icons/svg/743/743206.svg',
                9: 'https://image.flaticon.com/icons/svg/743/743228.svg',
                10: 'https://image.flaticon.com/icons/svg/743/743279.svg',
              }

const spring = {0: 'https://www.flaticon.com/premium-icon/icons/svg/2469/2469990.svg',
                1: 'https://www.flaticon.com/premium-icon/icons/svg/2556/2556832.svg',
                2: 'https://www.flaticon.com/premium-icon/icons/svg/2582/2582652.svg',
                3: 'https://image.flaticon.com/icons/svg/2599/2599011.svg',
                4: 'https://image.flaticon.com/icons/svg/2598/2598973.svg',
                5: 'https://image.flaticon.com/icons/svg/2598/2598964.svg',
                6: 'https://image.flaticon.com/icons/svg/2675/2675263.svg',
                7: 'https://image.flaticon.com/icons/svg/2709/2709239.svg',
                8: 'https://www.flaticon.com/premium-icon/icons/svg/2652/2652012.svg',
                9: 'https://image.flaticon.com/icons/svg/1998/1998765.svg',
                10: 'https://image.flaticon.com/icons/svg/2521/2521202.svg',
              }

const emojis_sick = {0: 'https://www.flaticon.com/premium-icon/icons/svg/1791/1791340.svg',
                    1: 'https://image.flaticon.com/icons/svg/743/743269.svg',
                    2: 'https://image.flaticon.com/icons/svg/742/742792.svg',
                    3: 'https://image.flaticon.com/icons/svg/743/743207.svg',
                    4: 'https://www.flaticon.com/premium-icon/icons/svg/2749/2749421.svg',
                    5: 'https://image.flaticon.com/icons/svg/2585/2585191.svg',
                    6: 'https://image.flaticon.com/icons/svg/2663/2663780.svg',
                    7: 'https://image.flaticon.com/icons/svg/2741/2741111.svg',
                    8: 'https://image.flaticon.com/icons/svg/2760/2760616.svg',
                    9: 'https://www.flaticon.com/premium-icon/icons/svg/2018/2018207.svg',
                    10: 'https://image.flaticon.com/icons/svg/2473/2473084.svg',
                  }


const backgrounds = [emojis, spring, emojis_sick];
const probs = [0.45, 0.9, 1];


const draw = Math.random();
let background = backgrounds[0];
if (draw<probs[0]){
  background = backgrounds[0]
}
else if (draw<probs[1]) {
  background = backgrounds[1]
}
else {
  background = backgrounds[2]
}




function App() {
  

  return (
    <div>
      
      <BingoBoard gridSize={5}/>
      

      <div className="refresh">
          
      </div>

      <div style={{ zIndex: '1' }}>
        <Sky
            images={background}
            how={60} /* Pass the number of images Sky will render chosing randomly */
            time={200} /* time of animation */
            size={'15px'} /* size of the rendered images */
            background={'rgba(35, 27, 66, 0.9)'} /* color of background */
          />
          <Sky
            images={background}
            how={60} /* Pass the number of images Sky will render chosing randomly */
            time={200} /* time of animation */
            size={'30px'} /* size of the rendered images */
            background={'rgba(52, 52, 52, 0.7)'} /* color of background */
          />
          <Sky
            images={background}
            how={60} /* Pass the number of images Sky will render chosing randomly */
            time={200} /* time of animation */
            size={'50px'} /* size of the rendered images */
            background={'rgba(52, 52, 52, 0.5)'} /* color of background */
          />
          <Sky
            images={background}
            how={60} /* Pass the number of images Sky will render chosing randomly */
            time={200} /* time of animation */
            size={'100px'} /* size of the rendered images */
            background={'rgba(52, 52, 52, 0.4)'} /* color of background */
          />
      </div>
    </div>
  );
}

export default App;
