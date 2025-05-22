import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {
    closeTaskModal,
    closeEditTaskModal,
    setIsEditing,
    showCreateTaskModal,
    showDeleteTaskModal
} from "../features/task/taskSlice";

const EditTaskModal = () => {
    const {isEditTaskModalVisible} = useSelector((state) => state.task);
    const dispatch = useDispatch();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeEditTaskModal());
            dispatch(closeTaskModal());
        }
    }

    const handleEdit = () => {
        dispatch(setIsEditing(true));
        dispatch(closeTaskModal());
        dispatch(closeEditTaskModal());
        dispatch(showCreateTaskModal());
    }

    const handleDelete = () => {
        dispatch(closeTaskModal());
        dispatch(closeEditTaskModal());
        dispatch(showDeleteTaskModal());
    }

    return (
        <Wrapper className={isEditTaskModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <div>
                <button type='button' className='edit' onClick={handleEdit}>Редактировать задачу</button>
                <button type='button' onClick={handleDelete}>Удалить задачу</button>
            </div>
        </Wrapper>
    );
};

export default EditTaskModal;

const Wrapper = styled.div`
  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--Dark-Light-Mode-Switch-Background-Color);
    border-radius: var(--border-radius-6);
    overflow: hidden;
    padding: 0.85rem 1.5rem;

    display: flex;
    flex-direction: column;
  }

  .edit {
    color: var(--Medium-Grey);
    margin-bottom: 0.85rem;
  }

  button {
    text-align: left;
    border: none;
    background-color: transparent;
    color: var(--Red);
    font-weight: var(--font-weight-5);
    font-size: var(--font-size-18);
    cursor: pointer;
    transition: transform 0.3s linear;
  }

  button:hover {
    transform: scale(1.1);
  }
`;