import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {AddTaskButton, EditBoardButton, LogoutButton, Logo,} from "./index";
import {IoIosArrowDown} from 'react-icons/io';
import {showSidebarModal} from "../features/sidebarSlice/sidebarSlice";

const Navbar = () => {
    const {activeBoard} = useSelector((state) => state.board);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(showSidebarModal());
    }

    return (
        <Wrapper>
            <div className='logo-container'>
                <Logo/>
            </div>
            <div className='nav-container'>
                <h2 className='nav-header'>{activeBoard?.name}
                    <button className='arrow-btn' onClick={handleClick}>
                        <IoIosArrowDown className='arrow'/>
                    </button>
                </h2>
                <div className='nav-btn-container'>
                    <AddTaskButton/>
                    <EditBoardButton/>
                    <LogoutButton/>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;

const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  height: var(--Navbar-Height);
  background-color: var(--Navbar-Background-Color);
  display: flex;
  align-items: center;

  .logo-container {
    height: 100%;
    min-width: var(--Sidebar-Width);
    padding-left: 2rem;
    display: none;
  }

  .nav-container {
    height: 100%;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-header {
    text-transform: capitalize;
    margin-left: 1rem;
    color: var(--Main-Text-Color);
    font-size: var(--font-size-20);

    display: flex;
    align-items: center;
  }

  .arrow-btn {
    margin-left: 0.5rem;
    color: var(--Main-Purple);
    cursor: pointer;
    transition: var(--transition);
    background-color: transparent;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrow:hover {
    color: var(--Main-Purple-Hover-3);
  }

  .arrow {
    width: 1.5rem;
    height: 1.5rem;
  }

  .nav-btn-container {
    margin-right: 1rem;

    display: flex;
    align-items: center;
  }

  @media (min-width: 650px) {
    .logo-container {
      display: flex;
      align-items: center;
    }

    .nav-container {
      width: calc(100vw - var(--Sidebar-Width));
      border-left: 1px solid var(--Border-Color);
    }

    .nav-header {
      font-size: var(--font-size-24);
    }

    .arrow-btn {
      display: none;
    }
  }
`;