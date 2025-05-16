import styled from "styled-components";
import {MdLogout} from 'react-icons/md';
import {useDispatch} from "react-redux";
import {openModal} from "../features/logoutSlice/logoutSlice";

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal());
    }

    return (
        <Wrapper type='button' onClick={handleOpenModal}>
            <MdLogout className='logout'/>
        </Wrapper>
    );
};

export default LogoutButton;

const Wrapper = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: var(--Medium-Grey);

  &:hover {
    color: var(--Main-Purple);
  }

  .logout {
    width: 2rem;
    height: 2rem;
  }
`;