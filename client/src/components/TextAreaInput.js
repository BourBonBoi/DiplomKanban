import styled from "styled-components";

const TextAreaInput = ({name, labelText, value, handleChange}) => {
    return (
        <Wrapper>
            <label htmlFor={name}>{labelText ? labelText : name}</label>

            <textarea rows='5' name={name} value={value} onChange={handleChange}
                      placeholder={`тут текст`}/>
        </Wrapper>
    );
};

export default TextAreaInput;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    font-size: var(--font-size-13);
    font-weight: var(--font-weight-5);
    color: var(--Main-Text-Color);
  }

  textarea {
    width: 100%;
    padding: 0.65rem 1rem;
    font-size: var(--font-size-13);
    background-color: var(--Form-Background-Color);
    color: var(--Main-Text-Color);
    border: none;
    outline: 1px solid var(--Border-Color);
    border-radius: var(--border-radius-4);
    cursor: pointer;
    resize: none;
    line-height: 1.5;
  }
  
  textarea::placeholder{
    line-height: 2;
  }

  textarea:hover {
    outline: 1px solid var(--Main-Purple);
  }

  textarea:focus {
    outline: 2px solid var(--Main-Text-Color);
  }
`;