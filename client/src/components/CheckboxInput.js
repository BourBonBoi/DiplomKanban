import styled from "styled-components";

const CheckboxInput = ({item, handleChange}) => {
    const {name, isCompleted, _id} = item;

    return (
        <Wrapper>
            <label className={isCompleted ? 'label-container checked' : 'label-container'}>{name}
                <input type='checkbox' name={name} checked={isCompleted} data-name='subtask' data-id={_id}
                       onChange={handleChange}/>
                <span className='checkmark'></span>
            </label>
        </Wrapper>
    );
};

export default CheckboxInput;

const Wrapper = styled.div`
  background-color: var(--Dark-Light-Mode-Switch-Background-Color);
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: var(--border-radius-6);

  .label-container {
    font-size: var(--font-size-12);
    font-weight: var(--font-weight-7);

    display: block;
    position: relative;
    padding-left: 1.75rem;
    user-select: none;
    cursor: pointer;
  }

  .checked {
    text-decoration: line-through;
    color: var(--Medium-Grey);
  }

  .label-container input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 1rem;
    width: 1rem;
    border-radius: 2px;
    background-color: var(--Task-Preview-Background-Color);
  }

  .label-container input:checked ~ .checkmark {
    background-color: var(--Main-Purple);
  }

  .label-container input:checked ~ .checkmark:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .checkmark::after {
    content: '';
    position: absolute;
    display: none;
  }

  .label-container input:checked ~ .checkmark::after {
    display: block;
  }

  .label-container .checkmark::after {
    left: 0.35rem;
    top: 0.1rem;
    width: 0.35rem;
    height: 0.7rem;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  &:hover {
    background-color: var(--Border-Color);
  }
`;