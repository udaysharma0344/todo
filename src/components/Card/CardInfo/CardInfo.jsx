import React, { useEffect, useState } from 'react'
import './CardInfo.css'
import Modal from '../../Modal/Modal'
import { Calendar, CheckSquare, List, Tag, Trash, Type, X } from 'react-feather'
import Eaditable from '../../Editable/Eaditable'
import Chip from '../../Chip/Chip'

const CardInfo = (props) => {
    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
    ];

    const [activeColor, setActiveColor] = useState("");

    //   const {title , labels, desc , date , tasks}= props.card;

    const [values, setValues] = useState({ ...props.card })

    const calculatePercent = () => {
        if (values.tasks?.length == 0) return "0"
        const completed = values.tasks?.filter(item => item.completed)?.length;

        return (completed / values.tasks?.length) * 100 + ""
    }


    const addLabels = (value, color) => {
        const index = values.labels?.findIndex(item => item.text === value)
        if (index > -1) return;

        const label = {
            text: value,
            color,
        }
        setValues({ ...values, labels: [...values.labels, label] })
        setActiveColor("");
    }


    const removeLable = (text) => {
        const index = values.labels?.findIndex(item => item.text === text)
        // if(index > -1) return;
        if (index < 0) return

        const tempLabels = values.labels?.filter(item => item.text !== text)
        setValues({ ...values, labels: tempLabels })
    }


    const addTask = (value) => {
        const task = {
            id: Date.now() + Math.random(),
            text: value,
            completed: false
        }
        const tempTask = [...values.tasks]
        tempTask.push(task)
        setValues({ ...values, tasks: [...tempTask] })
    }


    const removeTask = (id) => {
        const index = values.tasks?.findIndex(item => item.id === id)
        if (index < 0) return

        console.log(index)
        values.tasks?.splice(index, 1)
        setValues({ ...values })
    }


    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex(item => item.id === id)
        if (index < 0) return

        const tempTask = [...values.tasks]
        tempTask[index].completed = completed
        setValues({ ...values, tasks: tempTask })
    }
    useEffect(() => {
        props.UpdateCard(props.card.id, props.boardId, values)
    }, [values])

    return (
        <div>
            <Modal onClose={() => props.onClose()}>
                <div className='cardinfo'>
                    <div className='cardinfo_box'>
                        <div className='cardinfo_box_title'>
                            <Type /> Title
                        </div>

                        <div className='cardinfo_box_body'>
                            <Eaditable
                                text={values.title}
                                placeholder="Enter Title"
                                buttonText="Set Title"
                                onSubmit={(value) => setValues({ ...values, title: value })}
                            />
                        </div>

                        <div className='cardinfo_box'>
                            <div className='cardinfo_box_title'>
                                <List /> Description

                            </div>

                            <div className='cardinfo_box_body'>
                                <Eaditable
                                    text={values.desc || "Add Description"}
                                    placeholder="Enter Discription"
                                    buttonText="Set Discription"
                                    onSubmit={(value) => setValues({ ...values, desc: value })}
                                />
                            </div>
                        </div>


                        <div className='cardinfo_box'>
                            <div className='cardinfo_box_title'>
                                <Calendar /> Date
                            </div>

                            <div className='cardinfo_box_body'>
                                <input type='date' defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""} onChange={(e) => setValues({ ...values, date: e.target.value })} />
                            </div>
                        </div>


                        <div className='cardinfo_box'>
                            <div className='cardinfo_box_title'>
                                <Tag /> Lables
                            </div>
                            <div className='cardinfo_box_labels'>
                                {
                                    values.labels?.map((item, index) => <Chip
                                        close
                                        onClose={() => removeLable(item.text)}
                                        key={item.text + index}
                                        color={item.color}
                                        text={item.text} />)
                                }
                            </div>
                            <div className='cardinfo_box_colors'>
                                {
                                    colors.map((item) => <li style={{ backgroundColor: item }}
                                        className={item === activeColor ? "active" : ""}
                                        onClick={() => setActiveColor(item)}
                                    />)
                                }
                            </div>
                            <div className='cardinfo_box_body'>
                                <Eaditable
                                    text="Add Lable"
                                    placeholder="Enter Label"
                                    buttonText="Add"
                                    onSubmit={(value) => addLabels(value, activeColor)}
                                />
                            </div>
                        </div>



                        <div className='cardinfo_box'>
                            <div className='cardinfo_box_title'>
                                <CheckSquare /> Tasks
                            </div>
                            <div className='cardinfo_box_progress-bar'>
                                <div className='cardinfo_box_progress'
                                    style={{ width: calculatePercent() + "%", backgroundColor: calculatePercent() == "100" ? "limegreen" : "" }}

                                />
                            </div>

                            <div className='cardinfo_box_list'>
                                {values.tasks?.map((item) => (
                                    <div key={item.id} className='cardinfo_task'>
                                        <input
                                            type='checkbox'
                                            defaultChecked={item.completed}
                                            onChange={(event) => updateTask(item.id, event.target.checked)} />
                                        <p>{item.text}</p>
                                        <Trash onClick={() => removeTask(item.id)} />
                                    </div>
                                ))}

                                {/* <div className='cardinfo_task'>
                            <input type='checkbox'/>
                            <p>Task 2</p>
                            <Trash/>
                        </div> */}

                            </div>
                            <div className='cardinfo_box_body'>
                                <Eaditable
                                    text="Add new Task"
                                    placeholder="Enter Task"
                                    buttonText="Add Task"
                                    onSubmit={(value) => addTask(value)}
                                />
                            </div>
                        </div>


                                    <div className=' closeButton' onClick={() => props.onClose()}><X/></div>
                                


                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CardInfo