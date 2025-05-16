import styled from "styled-components";
import {Alert, FormInputSmall, TextAreaInput, SelectInput} from "./index";
import {
    closeCreateTaskModal, setAlertText, setIsEditing, setTitleError, setSubtaskErrors, resetSubtaskErrors,
    createTask, updateTask, handleTaskChange, handleSubtaskChange, addRow, removeRow, resetTask
} from "../features/task/taskSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {HiPlusSm} from 'react-icons/hi';
import {IoMdClose} from 'react-icons/io';

const CreateTaskModal = () => {
    const dispatch = useDispatch();
    const {
        isCreateTaskModalVisible, isLoading, isEditing, activeTask, alertText, title, titleError, description,
        status, subtasks, subtaskErrors
    } = useSelector((state) => state.task);
    const {activeBoard} = useSelector((state) => state.board);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            dispatch(setAlertText(''));
            dispatch(setTitleError(false));
            dispatch(resetSubtaskErrors());
        }, 3000);

        return () => {
            clearTimeout(timeoutID);
        }
    }, [titleError, subtaskErrors]);

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeCreateTaskModal());
            setTimeout(() => {
                dispatch(setIsEditing(false));
                dispatch(resetTask(activeBoard?.columns[0].column));
            }, 150);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleTaskChange({name, value}));
    }

    const handleRowChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleSubtaskChange({name, value}));
    }

    const handleAddNewColumn = () => {
        dispatch(addRow());
    }

    const handleRemoveColumn = (e) => {
        const id = e.currentTarget.dataset.id;
        dispatch(removeRow(id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let emptySubtask = false;
        const currentErrors = {...subtaskErrors};

        subtasks.forEach((item) => {
            const [id, value] = Object.entries(item)[0];
            if (!value) {
                currentErrors[id] = true;
                emptySubtask = true;
            }
        })

        if ((!title && emptySubtask) || !title) {
            dispatch(setTitleError(true));
            dispatch(setSubtaskErrors(currentErrors));
            dispatch(setAlertText('Please provide all values'));
            return;
        } else if (emptySubtask) {
            dispatch(setSubtaskErrors(currentErrors));
            dispatch(setAlertText('Please provide all values'));
            return;
        }

        if (isEditing) {
            dispatch(updateTask({_id: activeTask._id, title, description, subtasks, status, boardId: activeBoard._id}));
            return;
        }

        dispatch(createTask({title, description, subtasks, status, boardId: activeBoard._id}));
    }

    return (
        <Wrapper className={isCreateTaskModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='form-board' onSubmit={handleSubmit} noValidate>

                <h2 className='small-header'>{isEditing ? 'Редактировать задачу' : 'Добавить новую задачу'}</h2>

                {alertText && <Alert text={alertText}/>}

                <FormInputSmall type='text' name='title' value={title} labelText='Заголовок' handleChange={handleChange}
                                error={titleError} label={true} placeholder='задача'/>

                <TextAreaInput name='description' value={description} labelText='Описание'
                               handleChange={handleChange}/>

                <p>подзадача</p>
                <div className='columns-container'>

                    {subtasks.map((item) => {
                        const id = Object.keys(item)[0];
                        return (
                            <div key={id} className='column'>
                                <FormInputSmall type='text' name={id} value={item[id]}
                                                placeholder='подзадача'
                                                error={subtaskErrors[id]} labelText='Фамилия'
                                                handleChange={handleRowChange}/>

                                <button type='button' className='remove-btn' data-id={id} onClick={handleRemoveColumn}>
                                    <IoMdClose className='close-icon'/>
                                </button>
                            </div>
                        )
                    })}

                </div>

                <button disabled={isLoading} type='button' className='btn new-board-btn column-btn'
                        onClick={handleAddNewColumn}>
                    <HiPlusSm/> Добавить новую подзадачу
                </button>

                <SelectInput name='status' value={status} handleChange={handleChange} labelText='Статус'
                             options={activeBoard?.columns.map((item) => item.column)}/>

                <button disabled={isLoading} type='submit' className='btn new-board-btn create-board-btn'>
                    {isEditing ? 'Edit Task' : 'Create Task'}
                </button>
            </form>
        </Wrapper>
    );
};

export default CreateTaskModal;

const Wrapper = styled.div`

  .form-board {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 30rem;
    background-color: var(--Sidebar-Background-Color);
    border-radius: var(--border-radius-6);
    padding: 2rem;
  }

  .small-header {
    text-align: left;
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-7);
    color: var(--Main-Text-Color);
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 0.75rem;
    text-transform: capitalize;
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-5);
    color: var(--Main-Text-Color);
  }

  .column {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
    margin-bottom: 0.75rem;

    div {
      margin-bottom: 0;
    }
  }

  .remove-btn {
    background-color: transparent;
    border: none;
    color: var(--Medium-Grey);
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  .close-icon {
    width: 1.75rem;
    height: 1.75rem;
  }

  .column-btn {
    background-color: var(--Light-Grey-Light-BG);
    color: var(--Main-Purple);
    transition: color 0.3s linear;
    margin-bottom: 1rem;
  }

  .column-btn:hover {
    color: var(--Black);
  }

  .new-board-btn {
    border: none;
    border-radius: var(--border-radius-24);
    width: 100%;
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: var(--font-size-13);
    letter-spacing: 0;
    transition: background-color 0.3s linear;
  }

  .create-board-btn {
    background-color: var(--Main-Purple);
    color: var(--White);
  }

  .create-board-btn:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .create-board-btn:disabled {
    background-color: var(--Main-Purple-Hover-2);
    cursor: auto;
  }
`;