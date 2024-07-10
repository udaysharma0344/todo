import React, {useState} from 'react'
import './Board.css'
import {MoreHorizontal} from 'react-feather'
import Card from '../Card/ Card'
import Eaditable from '../Editable/Eaditable'
import Dropdown from '../Dropdown/Dropdown'

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);


  return (
    <div className='board'>
      <div className='board_top'>
        <p className='board_top_tittle'>
        {props.board?.title } 
        { props.board?.cards?.length > 0 && <span>({props.board?.cards?.length})</span> }
        </p>
        <div className='board_top_more' onClick={()=>setShowDropdown(true)} >
          <MoreHorizontal/>
          {showDropdown && (
            <Dropdown onClose={ ()=>setShowDropdown(false) }>
            <div className='board_dropdown'>
              <p onClick={()=>{props.removeBoard(props.board?.id)}}>Delete Board</p>
            </div>
          </Dropdown>
          )}

        </div>
      </div>

      <div className='board_cards custom-scroll'>
        {
          props.board?.cards?.map((item)=><Card 
                                            key={item.id} 
                                            card ={item} 
                                            removeCard={props.removeCard} 
                                            boardId= {props.board?.id}
                                            handleDragEnd={props.handleDragEnd}
                                            handleDragEnter={props.handleDragEnter}
                                            UpdateCard={props.UpdateCard}
                                            showModal = {showModal}
                                            setShowModal={setShowModal}
                                            />)
        }
        <Eaditable
          displayClass = "board_cards_add"
          text= "add Card"
          placeholder="Enter Card Title"
          onSubmit = {(value)=> {props.addCard(value, props.board?.id); setShowModal(true)}}
        />
      </div>

    </div>
  )}

export default Board
