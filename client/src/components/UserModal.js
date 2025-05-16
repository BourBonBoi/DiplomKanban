import styled from "styled-components";
import {Alert, FormInputSmall} from "./index";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeUserModal, setAlertText} from "../features/user/userSlice";
import validator from "validator";
import {updateUser} from "../features/user/userSlice";

const inputErrors = {
    nameError: false,
    lastNameError: false,
    emailError: false,
}

const UserModal = () => {
    const [errors, setErrors] = useState(inputErrors);
    const {isLoading, user, isUserModalVisible, alertText} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        name: user?.name,
        lastName: user?.lastName,
        email: user?.email
    });


    useEffect(() => {
        const ID = setTimeout(() => {
            setErrors(inputErrors);
            dispatch(setAlertText(''));
        }, 3000);

        return () => {
            clearTimeout(ID);
        }
    }, [errors]);

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal')) {
            dispatch(closeUserModal());
            setTimeout(() => {
                setValues({
                    name: user?.name,
                    lastName: user?.lastName,
                    email: user?.email
                });
            }, 150);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, name, lastName} = values;

        if (!email || !name || !lastName) {
            dispatch(setAlertText('Please provide all values!'));

            if (!name) {
                setErrors((prevState) => {
                    return {...prevState, nameError: true}
                });
            }
            if (!lastName) {
                setErrors((prevState) => {
                    return {...prevState, lastNameError: true};
                });
            }
            if (!email) {
                setErrors((prevState) => {
                    return {...prevState, emailError: true}
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

        dispatch(updateUser(values));
    }

    return (
        <Wrapper className={isUserModalVisible ? 'modal show-modal' : 'modal'} onClick={handleModalClick}>
            <form className='form' onSubmit={handleSubmit} noValidate>

                <h2 className='small-header'>Изменить пользователя</h2>

                {alertText && <Alert text={alertText}/>}

                <FormInputSmall type='text' error={errors.nameError} name='name' value={values.name}
                                labelText='Имя' handleChange={handleChange} label={true}/>

                <FormInputSmall type='text' error={errors.lastNameError} name='lastName' value={values.lastName}
                                labelText='Фамилия' handleChange={handleChange} label={true}/>

                <FormInputSmall type='email' error={errors.emailError} name='email' value={values.email}
                                labelText='Почта' handleChange={handleChange} label={true}/>

                <button disabled={isLoading} type='submit' className='btn update-btn'>Изменить</button>
            </form>
        </Wrapper>
    );
};

export default UserModal;

const Wrapper = styled.div`

  .form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 25rem;
    background-color: var(--Sidebar-Background-Color);
    border-radius: var(--border-radius-6);
    padding: 2rem;
  }

  .small-header {
    text-align: left;
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-7);
    color: var(--Main-Text-Color);
    margin-bottom: 1.5rem;
  }

  .update-btn {
    background-color: var(--Main-Purple);
    color: var(--White);
    border: none;
    border-radius: var(--border-radius-24);
    width: 100%;
    margin-top: 0.5rem;
    cursor: pointer;
    font-size: var(--font-size-13);
    letter-spacing: 0;
    transition: background-color 0.3s linear;
  }

  .update-btn:hover {
    background-color: var(--Main-Purple-Hover-3);
  }

  .update-btn:disabled {
    background-color: var(--Main-Purple-Hover-2);
    cursor: auto;
  }
`;