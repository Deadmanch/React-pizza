import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export type LoginFormType = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}),
		[jwt, navigate];

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginFormType;
		const { email, password } = target;
		sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));
	};
	return (
		<div className={styles.login}>
			<Heading>Вход</Heading>
			{loginErrorMessage && <div className={styles.error}>{loginErrorMessage}</div>}
			<form action='#' className={styles.form} onSubmit={submit}>
				<div className={styles.field}>
					<label htmlFor='email'>Ваш email</label>
					<Input name='email' id='email' type='email' placeholder='Email'></Input>
				</div>
				<div className={styles.field}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input name='password' id='password' type='password' placeholder='Пароль'></Input>
				</div>
				<Button appearance='big' className='accent'>
					Вход
				</Button>
			</form>
			<div className={styles.links}>
				<div>Нет акканута?</div>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
		</div>
	);
};
