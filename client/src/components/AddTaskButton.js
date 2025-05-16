import styled from "styled-components";
import {HiPlusSm} from 'react-icons/hi';
import {useDispatch, useSelector} from "react-redux";
import {showCreateTaskModal} from "../features/task/taskSlice";

const AddTaskButton = () => {
    const {activeBoard} = useSelector((state) => state.board);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (activeBoard?.columns.length > 0) {
            dispatch(showCreateTaskModal());
        }
    }

    return (
        <Wrapper type='button' onClick={handleClick}>
            <HiPlusSm className='plus-icon'/> <span>Добавить новую задачу</span>
        </Wrapper>
    );
};

export default AddTaskButton;

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 0.85rem;
  background-color: var(--Main-Purple);
  color: var(--White);
  border: none;
  border-radius: 50%;
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-7);
  letter-spacing: 1px;
  cursor: pointer;
  transition: var(--transition);
  margin-right: 1rem;

  &:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  span {
    display: none;
  }

  .plus-icon {
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
  }

  @media (min-width: 650px) {
    padding: 0.85rem 1.5rem;
    border-radius: var(--border-radius-24);
    span {
      margin-left: 0.3rem;
      display: inline;
    }
  }
`;