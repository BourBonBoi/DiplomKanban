import {TbLayoutBoardSplit} from 'react-icons/tb';
import {useDispatch, useSelector} from "react-redux";
import {setActiveBoard} from "../features/board/boardSlice";
import {closeSidebarModal} from '../features/sidebarSlice/sidebarSlice';
import {getTasks, handleTaskChange} from "../features/task/taskSlice";
import {NavLink} from "react-router-dom";
import {useEffect} from "react";

const BoardListItem = ({title, id}) => {
    const dispatch = useDispatch();
    const {activeBoard} = useSelector((state) => state.board);

    useEffect(() => {
        dispatch(handleTaskChange({name: 'status', value: activeBoard?.columns?.[0]?.column}));
    }, [activeBoard]);

    const handleClick = () => {
        dispatch(setActiveBoard(id));
        dispatch(getTasks(id));
        dispatch(closeSidebarModal());
    }

    return (
        <NavLink to={`/${id}`} className={({isActive}) => {
            return isActive ? 'board-btn active' : 'board-btn'
        }} onClick={handleClick}>
            <TbLayoutBoardSplit className='icon-img'/>
            <h4>{title}</h4>
        </NavLink>
    );
};

export default BoardListItem;