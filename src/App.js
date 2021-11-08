import './App.css'
import { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
    {"src" : "img/helmet-1.png" , matched : false },
    {"src" : "img/potion-1.png" , matched : false},
    {"src" : "img/ring-1.png" , matched : false},
    {"src" : "img/scroll-1.png" , matched : false},
    {"src" : "img/shield-1.png" , matched : false},
    {"src" : "img/sword-1.png" , matched : false},
]

function App() {
  const [ cards, setCards ] = useState([]);
  const [ turns, setTurns ] = useState(0);
  const [ choiceOne , setChoiceOne ] = useState(null);
  const [ choiceTwo, setChoiceTwo ] = useState(null);
  const [ disabled , setDisabled ] = useState(false);

  // shuffle Card
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5 )
    .map((card)=> ({...card, id : Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0)
  }
  
  //Handle Choice
  const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare to selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards( presCard => {
          return presCard.map( card => {
            if(card.src === choiceOne.src ){
              return {...card, matched : true }
            }
            else{
              return card;
            }
          })
        });
        resetTurn();
      }
      else{
        setTimeout(()=>{ resetTurn(); }, 1000)
      }
    }
  }, [choiceOne, choiceTwo]);


  //Reset turn & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns( preTurn => preTurn + 1);
    setDisabled(false)
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        { cards.map( card => (
          <SingleCard 
          card={card} 
          handleChoice={handleChoice} 
          flipped={ card === choiceOne || card === choiceTwo || card.matched }
          key={card.id} 
          disabled={disabled}
          />
        ) )}
      </div>
      <p>Turns : { turns }</p>
    </div>
  );
}

export default App