import styled from "styled-components";
import {getColor} from "../utils/columnColors";
import {Task} from "./index";

const Column = ({index, column, tasks}) => {
    return (
        <Wrapper>
            <h3><span style={{backgroundColor: getColor(index)}}></span>{column} ({tasks?.length || 0})</h3>

            {tasks?.length > 0 && tasks.map((item, index) => {
                return <Task key={index} item={item}/>
            })}
        </Wrapper>
    );
};

export default Column;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  h3 {
    text-transform: uppercase;
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-7);
    color: var(--Medium-Grey);
    letter-spacing: 3px;
    margin-bottom: 0.5rem;
  }

  span {
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    margin-right: 0.75rem;
  }
`;