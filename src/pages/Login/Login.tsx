import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { ILoginResponse } from '../../interfaces/auth.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import userSlice, { userActions } from '../../store/user.slice';

export type LoginFormType = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export const Login = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginFormType;
		const { email, password } = target;
		sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<ILoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password
			});
			console.log(data);
			localStorage.setItem('jwt', data.access_token);
			dispatch(userActions.addJwt(data.access_token));
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.message);
			}
		}
	};
	return (
		<div className={styles.login}>
			<Heading>Вход</Heading>
			{error && <div className={styles.error}>{error}</div>}
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
