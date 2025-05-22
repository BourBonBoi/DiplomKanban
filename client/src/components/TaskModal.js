import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {
    closeTaskModal, handleTaskChange, handleSubtaskChange, setActiveTask, setStatus, updateTask, showEditTaskModal
} from "../features/task/taskSlice";
import {BsDot} from 'react-icons/bs';
import {countCompletedSubtasks} from "../utils/objectUtil";
import {SelectInput, CheckboxInput} from "./index";


const TaskModal = () => {
    const {activeBoard} = useSelector((state) => state.board);
    const {isTaskModalVisible, activeTask, status} = useSelector((state) => state.task);
    const dispatch = useDispatch();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeTaskModal());
            dispatch(setActiveTask(null));
            dispatch(setStatus(activeBoard?.columns[0].column));
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(handleTaskChange({name, value}));
    }

    const handleSubChange = (e) => {
        const name = e.currentTarget.dataset.name;
        const value = e.currentTarget.dataset.id;
        const checked = e.target.checked;
        dispatch(handleSubtaskChange({name, value, checked}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTask({...activeTask, status}));
    }

    return (
        <Wrapper className={isTaskModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='task-container' onSubmit={handleSubmit}>
                <section>
                    <h4 className='task-header'>{activeTask?.title}</h4>
                    <button type='button' className='btn-edit-task' onClick={() => dispatch(showEditTaskModal())}>
                        <BsDot className='dots-icon'/>
                        <BsDot className='dots-icon'/>
                        <BsDot className='dots-icon'/>
                    </button>
                </section>

                <p>{activeTask?.description}</p>
                <h4 className='task-summary'>Подзадачи
                    ({countCompletedSubtasks(activeTask?.subtasks)} из {activeTask?.subtasks?.length})</h4>

                <div className='checkbox-container'>
                    {activeTask?.subtasks.map((item) => {
                        const {_id} = item;
                        return <CheckboxInput key={_id} item={item} handleChange={handleSubChange}/>
                    })}
                </div>

                <SelectInput className='select' name='status' value={status} handleChange={handleChange}
                             labelText='Current Status' options={activeBoard?.columns.map((item) => item.column)}/>

                <button type='submit' className='btn-confirm'>Подтвердить</button>

            </form>
        </Wrapper>
    );
};

export default TaskModal;

const Wrapper = styled.div`
  .task-container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 90vw;
    max-width: 30rem;
    transform: translate(-50%, -50%);
    background-color: var(--Sidebar-Background-Color);
    border-radius: var(--border-radius-6);
    padding: 1.5rem 2rem;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .btn-edit-task {
    color: var(--Medium-Grey);
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: 2rem;
    width: 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .btn-edit-task:hover {
    color: var(--Main-Purple);
  }

  .task-header {
    font-size: var(--font-size-18);
    margin-bottom: 1.5rem;
  }

  p {
    font-size: var(--font-size-13);
    color: var(--Medium-Grey);
    line-height: var(--line-height-23);
    margin-bottom: 1.5rem;
  }

  .task-summary {
    font-size: var(--font-size-12);
    color: var(--Main-Text-Color);
    margin-bottom: 1rem;
  }

  .checkbox-container {
    margin-bottom: 1rem;
  }

  .btn-confirm {
    width: 100%;
    text-align: center;
    border: none;
    padding: 0.75rem 0;
    border-radius: var(--border-radius-24);
    font-weight: var(--font-weight-7);
    font-size: var(--font-size-13);
    cursor: pointer;
    transition: background-color 0.3s linear;
    background-color: var(--Main-Purple);
    color: var(--White);
  }

  .btn-confirm:hover {
    background-color: var(--Main-Purple-Hover-3);
  }
`;