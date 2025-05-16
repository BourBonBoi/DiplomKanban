import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {closeDeleteModal, deleteBoard} from "../features/board/boardSlice";
import {useParams} from "react-router-dom";

const DeleteBoardModal = () => {
    const {isDeleteBoardModalVisible, activeBoard, isLoading, alertText} = useSelector((state) => state.board);
    const dispatch = useDispatch();
    const {id} = useParams();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeDeleteModal());
        }
    }

    const handleCancel = () => {
        dispatch(closeDeleteModal());
    }

    const handleDelete = () => {
        dispatch(deleteBoard(id));
    }

    return (
        <Wrapper className={isDeleteBoardModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <div>
                <h2>{alertText ? 'Unauthorized! Logging out...' : 'Удалить эту доску?'}</h2>
                <p>Вы уверены что хотите удалить доску "<span>{activeBoard?.name}</span>" ? это действие удалит
                    все.</p>
                <section>
                    <button disabled={isLoading} type='button' className='delete' onClick={handleDelete}>Удалить</button>
                    <button type='button' className='cancel' onClick={handleCancel}>Отмена</button>
                </section>
            </div>
        </Wrapper>
    );
};

export default DeleteBoardModal;

const Wrapper = styled.div`
  div {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90vw;
    max-width: 30rem;
    transform: translate(-50%, -50%);
    background-color: var(--Dark-Light-Mode-Switch-Background-Color);
    border-radius: var(--border-radius-6);
    padding: 1.5rem 2rem;
  }

  h2 {
    font-size: var(--font-size-20);
    margin-left: 0;
    color: var(--Red);
    margin-bottom: 2rem;
  }

  p {
    font-size: var(--font-size-13);
    line-height: var(--line-height-30);
    margin-bottom: 2rem;
  }

  span {
    text-transform: capitalize;
  }

  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  button {
    text-align: center;
    border: none;
    padding: 0.85rem 0;
    border-radius: var(--border-radius-24);
    font-weight: var(--font-weight-7);
    font-size: var(--font-size-15);
    cursor: pointer;
    transition: background-color 0.3s linear;
  }

  .delete {
    background-color: var(--Red);
    color: var(--White);
  }

  .delete:hover {
    background-color: var(--Red-Hover);
  }

  .cancel {
    background-color: var(--Light-Gray);
    color: var(--Main-Purple);
  }
`;