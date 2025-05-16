import styled from "styled-components";

const SelectInput = ({name, labelText, value, handleChange, options}) => {
    return (
        <Wrapper>
            <label htmlFor={name}>{labelText ? labelText : name}</label>

            <select name={name} value={value} onChange={handleChange}>
                {options?.map((itemValue, index) => {
                    return <option key={index} value={itemValue}>{itemValue}</option>
                })}
            </select>
        </Wrapper>
    );
};

export default SelectInput;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
  margin-top: 0.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-5);
    color: var(--Main-Text-Color);
  }

  select {
    width: 100%;
    padding: 0.65rem 1rem;
    font-size: var(--font-size-13);
    background-color: var(--Form-Background-Color);
    color: var(--Main-Text-Color);
    border: none;
    outline: 1px solid var(--Border-Color);
    border-radius: var(--border-radius-4);
    cursor: pointer;
    text-transform: capitalize;
  }

  select:hover {
    outline: 1px solid var(--Main-Purple);
  }

  select:focus {
    outline: 2px solid var(--Main-Text-Color);
  }
`;