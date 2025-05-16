import styled from "styled-components";
import image from '../assets/images/undraw_page_not_found_re_e9o6.svg';
import {Link} from 'react-router-dom';

const Error = () => {
    return (
        <Wrapper className='center'>
            <div className='container'>
                <img src={image} alt='not-found'/>
                <h2>Страница не найдена</h2>
                <h4>Такой страницы нет '_' </h4>
                <Link to='/landing' className='link'>Назад</Link>
            </div>
        </Wrapper>
    );
};

export default Error;

const Wrapper = styled.main`
  padding: 2rem;
  min-height: 100vh;

  .container {
    max-width: 40rem;
  }

  .link {
    display: block;
    text-align: center;
    color: var(--Main-Text-Color);
  }

  img {
    margin-bottom: 4rem;
  }

  h2, h4 {
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: var(--Heading-XL);
    letter-spacing: 3px;
  }

  h4 {
    font-size: var(--Heading-M);
    letter-spacing: 1px;
  }
`;