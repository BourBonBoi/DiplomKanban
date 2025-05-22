import {Outlet} from "react-router-dom";
import styled from "styled-components";
import {Sidebar, Navbar} from '../../components';

const SharedLayout = () => {
    return (
        <Wrapper>
            <Navbar/>
            <div className='dashboard'>
                <Sidebar/>
                <Outlet/>
            </div>
        </Wrapper>
    );
};

export default SharedLayout;

const Wrapper = styled.main`
  .dashboard {
    display: grid;
    grid-template-columns:auto 1fr;
  }
`;