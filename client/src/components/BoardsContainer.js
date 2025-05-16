import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {BoardListItem, CreateBoardButton} from "./index";
import {useEffect} from "react";
import {getBoards, setActiveBoard} from "../features/board/boardSlice";
import {handleTaskChange, getTasks} from "../features/task/taskSlice";
import {useNavigate} from "react-router-dom";

const BoardsContainer = () => {
    const {boards, activeBoard} = useSelector((state) => state.board);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBoards());
    }, []);

    useEffect(() => {
        if (!activeBoard && boards.length > 0) {
            const {_id: id} = boards[0];
            dispatch(setActiveBoard(id));
            dispatch(handleTaskChange({name: 'status', value: boards[0]?.columns?.[0]?.column}));
            dispatch(getTasks(id));
            navigate(`/${id}`);
        } else if (!activeBoard && boards.length === 0) {
            navigate('/');
        }
    }, [boards]);

    useEffect(() => {
        if (activeBoard !== null) {
            const {_id: id} = activeBoard;
            dispatch(getTasks(id));
        }
    }, [activeBoard]);

    return (
        <Wrapper>
            <h4 className='boards-header'>Все доски ({boards.length})</h4>
            {boards.map((item, index) => {
                const {name, _id: id} = item;
                return <BoardListItem key={index} id={id} title={name}/>
            })}
            <CreateBoardButton/>
        </Wrapper>
    );
};

export default BoardsContainer;

const Wrapper = styled.div`
  width: 100%;

  .boards-header {
    text-transform: uppercase;
    font-size: var(--font-size-13);
    letter-spacing: 3px;
    padding: 0.75rem;
    padding-left: 2rem;
    margin-bottom: 0.5rem;
    color: var(--Medium-Grey);
  }
`;