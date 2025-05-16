import styled from "styled-components";
import {Logo, FormInput, Alert} from "../components";
import {useSelector, useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import validator from "validator";
import {registerUser, loginUser, setAlertText} from "../features/user/userSlice";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false
}

const inputErrors = {
    nameError: false,
    emailError: false,
    passwordError: false
}

const Register = () => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(inputErrors);
    const dispatch = useDispatch();
    const {isLoading, user, alertText} = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const ID = setTimeout(() => {
            dispatch(setAlertText(''));
            setErrors(inputErrors);
        }, 3000);

        return () => {
            clearTimeout(ID);
        }
    }, [errors]);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const toggleMember = () => {
        setValues({...initialState, isMember: !values.isMember});
        dispatch(setAlertText(''));
        setErrors(inputErrors);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password, isMember, name} = values;

        if (!email || !password || (!isMember && !name)) {
            dispatch(setAlertText('Please provide all values!'));

            if (!name) {
                setErrors((prevState) => {
                    return {...prevState, nameError: true}
                });
            }
            if (!email) {
                setErrors((prevState) => {
                    return {...prevState, emailError: true}
                });
            }
            if (!password) {
                setErrors((prevState) => {
                    return {...prevState, passwordError: true}
                });
            }
            return;
        }

        if (!validator.isEmail(email)) {
            dispatch(setAlertText('Please provide valid email!'))
            setErrors((prevState) => {
                return {...prevState, emailError: true}
            });
            return;
        }

        const currentUser = {name, email, password};
        if (isMember) {
            dispatch(loginUser(currentUser));
        } else {
            dispatch(registerUser(currentUser));
        }
    }

    return (
        <Wrapper className='center'>
            <form className='form' onSubmit={handleSubmit} noValidate>
                <div className='logo'>
                    <Logo/>
                </div>

                <h2 className='header'>{values.isMember ? 'Login' : 'Register'}</h2>

                {alertText && <Alert text={alertText}/>}

                {!values.isMember &&
                    <FormInput type='text' error={errors.nameError} name='name' value={values.name}
                               handleChange={handleChange}/>
                }
                <FormInput type='email' error={errors.emailError} name='email' value={values.email}
                           handleChange={handleChange}/>
                <FormInput type='password' error={errors.passwordError} name='password' value={values.password}
                           handleChange={handleChange}/>

                <button disabled={isLoading} type='submit' className='btn submit-btn'>Подтвердить</button>

                <div className='swap'>
                    <p>{values.isMember ? 'Нет аккаунта?' : 'Есть аккаунт?'}</p>
                    <button type='button' className='swap-form' onClick={toggleMember}>
                        {values.isMember ? 'Зарегестрироваться' : 'Войти'}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default Register;

const Wrapper = styled.main`
  background-color: var(--Dark-Light-Mode-Switch-Background-Color);
  height: 100vh;

  .form {
    width: 90vw;
    max-width: 25rem;
    background-color: var(--Form-Background-Color);
    border-radius: var(--border-radius-6);
    padding: 2rem;
  }

  .header {
    text-align: center;
    font-size: 2.2rem;
    font-weight: var(--font-weight-5);
    letter-spacing: 2px;
    color: var(--Main-Purple);
    margin-bottom: 2rem;
  }

  .logo {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .submit-btn {
    background-color: var(--Main-Purple);
    color: var(--White);
    border: none;
    border-radius: var(--border-radius-4);
    width: 100%;
    margin-top: 0.5rem;
    cursor: pointer;
    letter-spacing: 2px;
  }

  .submit-btn:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .submit-btn:disabled {
    background-color: var(--Main-Purple-Hover-2);
    cursor: auto;
  }

  .swap {
    margin-top: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: var(--font-size-13);
      letter-spacing: 1px;
      margin-right: 0.5rem;
    }
  }

  .swap-form {
    background-color: transparent;
    border: none;
    font-size: var(--font-size-15);
    font-weight: var(--font-weight-7);
    color: var(--Main-Purple);
    letter-spacing: 2px;
    cursor: pointer;
  }
`;




















