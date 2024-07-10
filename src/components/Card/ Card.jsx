import React, { useState } from 'react'
import './Card.css'
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Chip from '../Chip/Chip';
import Dropdown from '../Dropdown/Dropdown';
import CardInfo from './CardInfo/CardInfo';


const Card = (props) => {

  const {showModal} = props
  const {setShowModal} = props
  const [showDropdown, setShowDropdown] = useState(false);

  return (

    <>
      {showModal && <CardInfo 
                        card= {props.card} 
                        onClose={()=> setShowModal(false)}
                        UpdateCard={props.UpdateCard}
                        boardId={props.boardId}  
                        />}
      <div className='card'
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onClick={() => setShowModal(true)}
      >
        <div className='card_top'>
          <div className='card_top_labels'>
            {props.card?.labels?.map((item, index) => <Chip
              key={index}
              text={item.text}
              color={item.color}
            />)}

          </div>
          <div className='card_top_more' onClick={(e) => {setShowDropdown(true); 
                                                          e.stopPropagation()}} >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className='card_dropdown'>
                  <p onClick={() => props.removeCard(props.card.id, props.boardId)}>Delete Card</p>
                </div>
              </Dropdown>
            )}

          </div>
        </div>
        <div className='card_title'>{props?.card?.title} </div>
        <div className='card_footer'>
          {
            props.card.date &&
            <p><Clock />{props?.card?.date}</p>
          }

          {
            props.card?.tasks?.length>0 && 
            <p><CheckSquare />{props.card?.tasks?.filter(item=>item.completed).length}/{props.card?.tasks.length}</p>
          }
        </div>
      </div>
    </>
  )
}

export default Card