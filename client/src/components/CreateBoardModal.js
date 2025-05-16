import styled from "styled-components";
import {Alert, FormInputSmall} from "./index";
import {
    closeCreateModal, createBoard, setIsEditing, editBoard, setAlertText, setNameError, setColumnErrors,
    resetColumnErrors, handleBoardChange, handleColumnChange, addRow, removeRow, resetBoard
} from "../features/board/boardSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {HiPlusSm} from 'react-icons/hi';
import {IoMdClose} from 'react-icons/io';

const CreateBoardModal = () => {
    const dispatch = useDispatch();
    const {
        isCreateBoardModalVisible, isLoading, isEditing, activeBoard, alertText, name, nameError,
        columns, columnErrors
    } = useSelector((state) => state.board);


    useEffect(() => {
        const timeoutID = setTimeout(() => {
            dispatch(setAlertText(''));
            dispatch(setNameError(false));
            dispatch(resetColumnErrors());
        }, 3000);

        return () => {
            clearTimeout(timeoutID);
        }
    }, [nameError, columnErrors]);

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeCreateModal());
            setTimeout(() => {
                dispatch(setIsEditing(false));
                dispatch(resetBoard());
            }, 150);
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleBoardChange({name, value}));
    }

    const handleRowChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleColumnChange({name, value}));
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
        let emptyColumns = false;
        const currentErrors = {...columnErrors};

        columns.forEach((item) => {
            const [id, value] = Object.entries(item)[0];
            if (!value) {
                currentErrors[id] = true;
                emptyColumns = true;
            }
        });

        if ((!name && emptyColumns) || !name) {
            dispatch(setNameError(true));
            dispatch(setColumnErrors(currentErrors));
            dispatch(setAlertText('Пожалуйста, укажите все значения'));
            return;
        } else if (emptyColumns) {
            dispatch(setColumnErrors(currentErrors));
            dispatch(setAlertText('Пожалуйста, укажите все значения'));
            return;
        }

        if (isEditing) {
            dispatch(editBoard({name, columns, id: activeBoard._id}));
            return;
        }

        dispatch(createBoard({name, columns}));
    }

    return (
        <Wrapper className={isCreateBoardModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='form-board' onSubmit={handleSubmit} noValidate>

                <h2 className='small-header'>{isEditing ? 'Edit Board' : 'Создать новую доску'}</h2>

                {alertText && <Alert text={alertText}/>}

                <FormInputSmall type='text' name='name' value={name} labelText='Название' handleChange={handleChange}
                                error={nameError} label={true} placeholder='имя доски'/>

                <p>Колонки</p>
                <div className='columns-container'>

                    {columns.map((item) => {
                        const id = Object.keys(item)[0];
                        return (
                            <div key={id} className='column'>
                                <FormInputSmall type='text' name={id} value={item[id]} placeholder='важно'
                                                error={columnErrors[id]} labelText='Фамилия'
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
                    <HiPlusSm/> Добавить новую колонку
                </button>
                <button disabled={isLoading} type='submit' className='btn new-board-btn create-board-btn'>
                    {isEditing ? 'Edit Board' : 'Создать новую доску'}
                </button>
            </form>
        </Wrapper>
    );
};

export default CreateBoardModal;

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