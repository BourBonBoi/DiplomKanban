import styled from "styled-components";
import {FaEyeSlash} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {hideSidebar} from "../features/sidebarSlice/sidebarSlice";

const HideButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(hideSidebar());
    }

    return (
        <Wrapper type='button' className='board-btn' onClick={handleClick}>
            <FaEyeSlash className='icon-img'/>
            <h4>Скрыть сайдбар</h4>
        </Wrapper>
    );
};

export default HideButton;

const Wrapper = styled.button`
  .board-btn:hover .icon-img {
    color: var(--Main-Purple);
  }
`;