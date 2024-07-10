import React, { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board/Board'
import Eaditable from './components/Editable/Eaditable'

const App = () => {

  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("Boards")) || [])

  useEffect(() => {
    localStorage.setItem("Boards", JSON.stringify(boards));
  }, [boards])

  const [target, setTarget] = useState({ cid: "", bid: "", })

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",

    }

    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  }



  const removeCard = (cid, bid) => {

    const bIndex = boards.findIndex((item) => item.id === bid)
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random() * 2,
        title,
        cards: [],
      },
    ]);
  }

  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid)
    setBoards(tempBoards);
  }


  const handleDragEnd = (cid, bid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;

    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const tempCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, tempCard);
    setBoards(tempBoards)


    // setTargetCard({
    //   bid: "",
    //   cid: "",
    // });

  };


  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid
    })
  };

  const UpdateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((item) => item.id === bid)
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards[cIndex] = card;
    setBoards(tempBoards);
  }



  return (

    <div className='app'>

      {/* heading */}
      <div className='app_navbar'>
        <h1>Ticket System</h1>
      </div>

      <div className='app_outer'>

        <div className='app_boards'>
          {
            boards.map((item) => <Board
              key={item.id}
              board={item}
              addBoard={addBoard}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
              UpdateCard={UpdateCard}
            />)
          }
          <div className='app_boards_board'>
            <Eaditable
              text="Add Board"
              placeholder="Enter board title"
              displayClass="app_boards_board_add"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App