import styled from "styled-components";
import {useDispatch} from "react-redux";
import {showTaskModal, setActiveTask, setStatus} from "../features/task/taskSlice";
import {countCompletedSubtasks} from "../utils/objectUtil";

const Task = ({item}) => {
    const {title, subtasks} = item;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setActiveTask(item));
        dispatch(showTaskModal());
        dispatch(setStatus(item.status))
    }

    return (
        <Wrapper onClick={handleClick}>
            <h3>{title}</h3>
            <h4>{countCompletedSubtasks(subtasks)} | {subtasks?.length} подзадачи</h4>
        </Wrapper>
    );
};

export default Task;

const Wrapper = styled.article`
  background-color: var(--Sidebar-Background-Color);
  padding: 1rem;
  border-radius: var(--border-radius-6);
  cursor: pointer;

  h3 {
    font-size: var(--font-size-13);
    color: var(--Main-Text-Color);
    text-transform: none;
    letter-spacing: 1px;
  }

  h4 {
    font-size: var(--font-size-12);
    color: var(--Medium-Grey);
  }

  &:hover h3 {
    color: var(--Main-Purple);
  }
`;