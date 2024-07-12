import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Heading } from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export type RegisterFormType = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

export const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}),
		[jwt, navigate];

	const submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterFormType;
		const { email, password, name } = target;
		dispatch(register({ email: email.value, password: password.value, name: name.value }));
	};

	return (
		<div className={styles.login}>
			<Heading>Регистрация</Heading>
			{registerErrorMessage && <div className={styles.error}>{registerErrorMessage}</div>}
			<form action='#' className={styles.form} onSubmit={submit}>
				<div className={styles.field}>
					<label htmlFor='email'>Ваш email</label>
					<Input name='email' id='email' type='email' placeholder='Email'></Input>
				</div>
				<div className={styles.field}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input name='password' id='password' type='password' placeholder='Пароль'></Input>
				</div>
				<div className={styles.field}>
					<label htmlFor='name'>Ваше имя</label>
					<Input name='name' id='name' placeholder='Имя'></Input>
				</div>
				<Button appearance='big' className='accent'>
					Зарегистрироваться
				</Button>
			</form>
			<div className={styles.links}>
				<div>Есть аккаунт?</div>
				<Link to='/auth/login'>Войти</Link>
			</div>
		</div>
	);
};
