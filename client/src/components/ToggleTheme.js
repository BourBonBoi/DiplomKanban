import styled from "styled-components";
import {BsSunFill, BsMoonStarsFill} from 'react-icons/bs';
import {useSelector, useDispatch} from "react-redux";
import {setTheme} from "../features/theme/themeSlice";
import {useEffect, useRef} from "react";

const ToggleTheme = () => {
    const {theme} = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const circle = useRef(null);

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light');
            circle.current.classList.add('move-circle');
        }
    }, []);

    const toggleTheme = (e) => {
        const circle = e.target.firstChild;
        circle.classList.toggle('move-circle');

        if (theme === 'dark') {
            dispatch(setTheme('light'));
            document.body.classList.add('light');
        } else {
            dispatch(setTheme('dark'))
            document.body.classList.remove('light');
        }
    }

    return (
        <Wrapper>
            <div className='toggle-container'>
                <BsSunFill className='toggle-icon'/>
                <div className='toggle-switch' onClick={toggleTheme}>
                    <div className='toggle-circle' ref={circle}></div>
                </div>
                <BsMoonStarsFill className='toggle-icon'/>
            </div>
        </Wrapper>
    );
};

export default ToggleTheme;

const Wrapper = styled.article`
  background-color: var(--Dark-Light-Mode-Switch-Background-Color);
  margin-left: 1.5rem;
  width: 15rem;
  border-radius: var(--border-radius-6);
  padding: 1rem;

  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toggle-switch {
    width: 2.5rem;
    height: 1.25rem;
    background-color: var(--Main-Purple);
    border-radius: var(--border-radius-24);
    margin: 0 1.5rem;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s linear;
  }

  .toggle-switch:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .move-circle {
    transform: translateX(-1.15rem);
  }

  .toggle-circle {
    position: absolute;
    right: 0.25rem;
    top: calc((1.25rem - 0.85rem) / 2);

    width: 0.85rem;
    height: 0.85rem;
    border-radius: var(--border-radius-24);
    background-color: var(--White);
    transition: transform 0.3s linear;
    pointer-events: none;
  }

  .toggle-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: var(--Medium-Grey);
  }
`;