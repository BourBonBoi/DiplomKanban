import styled from "styled-components";
import {TbLayoutBoardSplit} from 'react-icons/tb';
import {HiPlusSm} from 'react-icons/hi';
import {useDispatch} from "react-redux";
import {showCreateModal} from "../features/board/boardSlice";
import {closeSidebarModal} from "../features/sidebarSlice/sidebarSlice";

const CreateBoardButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(showCreateModal());
        dispatch(closeSidebarModal());
    }

    return (
        <Wrapper className='board-btn' onClick={handleClick}>
            <TbLayoutBoardSplit className='icon-img'/>
            <h4><HiPlusSm className='plus-icon'/> Создать новую доску</h4>
        </Wrapper>
    );
};

export default CreateBoardButton;

const Wrapper = styled.button`
  color: var(--Main-Purple);

  .plus-icon {
    stroke-width: 1;
    margin-right: 0.25rem;
  }

  h4 {
    display: flex;
    align-items: center;
  }
`;