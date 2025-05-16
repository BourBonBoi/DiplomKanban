import {FaUserAlt} from 'react-icons/fa';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {showUserModal} from "../features/user/userSlice";
import {closeSidebarModal} from "../features/sidebarSlice/sidebarSlice";

const UserButton = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(showUserModal());
        dispatch(closeSidebarModal());
    }

    return (
        <Wrapper type='button' className='board-btn' onClick={handleClick}>
            <FaUserAlt className='icon-img'/>
            <h4>Настройки пользователя</h4>
        </Wrapper>
    );
};

export default UserButton;

const Wrapper = styled.button`
  .board-btn:hover .icon-img {
    color: var(--Main-Purple);
  }
`;