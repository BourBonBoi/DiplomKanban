import styled from "styled-components";
import {Logo} from '../components';
import {Link} from 'react-router-dom';
import image from '../assets/images/undraw_scrum_board_re_wk7v.svg';

const Landing = () => {
    return (
        <Wrapper>
            <div className='container'>
                <nav className='nav'>
                    <Logo/>
                </nav>
                <div className='content'>
                    <div className='info'>
                        <h1>Менеджер <span>Проектов</span></h1>
                        <p>ДИПЛОМНЫЙ ПРОЕКТ
                        тема: «Веб-платформа для управления проектами»
                        Специальность 09.02.07 Информационные системы и программирование
                        </p>
                        <Link to='/register' className='btn register-btn'>Войти/Зарегестрироваться</Link>
                    </div>
                    <div className='graphic'>
                        <img src={image} alt='kanban graphic'/>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Landing;

const Wrapper = styled.main`
  background-color: var(--Dark-Light-Mode-Switch-Background-Color);

  .container {
    width: 90vw;
    max-width: var(--application-width);
    margin: 0 auto;
  }

  .nav {
    height: 7rem;
    display: flex;
    align-items: center;
  }

  .content {
    height: calc(100vh - 7rem);
    margin-top: -3rem;
    display: grid;
    align-items: center;
  }

  .info {
    h1 {
      color: var(--Main-Text-Color);
      font-size: 3rem;
      margin-bottom: 2rem;
      letter-spacing: 2px;
    }

    span {
      color: var(--Main-Purple);
    }

    p {
      line-height: var(--line-height-30);
      letter-spacing: 1px;
      margin-bottom: 3rem;
    }
  }

  .register-btn {
    color: var(--White);
    background-color: var(--Main-Purple);
  }

  .register-btn:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .graphic {
    display: none;
  }

  @media (min-width: 992px) {
    .content {
      grid-template-columns: 1fr 1fr;
      column-gap: 5rem;
    }

    .graphic {
      display: block;
    }
  }
`;