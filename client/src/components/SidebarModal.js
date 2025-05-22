import styled from "styled-components";
import {BoardsContainer, ToggleTheme, UserButton} from "./index";
import {useDispatch, useSelector} from "react-redux";
import {closeSidebarModal} from "../features/sidebarSlice/sidebarSlice";

const SidebarModal = () => {
    const {isSidebarModalVisible} = useSelector((state) => state.sidebar);
    const dispatch = useDispatch();

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeSidebarModal());
        }
    }

    return (
        <Wrapper className={isSidebarModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <section>
                <BoardsContainer/>
                <ToggleTheme/>
                <UserButton/>
            </section>
        </Wrapper>
    );
};

export default SidebarModal;

const Wrapper = styled.div`
  section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: var(--Sidebar-Width);
    background-color: var(--Sidebar-Background-Color);
    padding: 0.5rem 0;
    padding-right: 1.5rem;
    border-radius: var(--border-radius-6);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }
`;