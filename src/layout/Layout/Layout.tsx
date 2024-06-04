import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

export const Layout = () => {
	return (
		<div className={styles.layout}>
			<div className={styles.sidebar}>
				<div className={styles.user}>
					<img className={styles.avatar} src='/user.png' alt='Иконка пользователя' />
					<div className={styles.name}>Данил Степанов</div>
					<div className={styles.email}>stepanov.d@mail.ru</div>
				</div>
				<div className={styles.menu}>
					<NavLink to='/' className={({ isActive }) => cn(styles.link, { [styles.active]: isActive })}>
						<img src='/icons/menu-icon.svg' alt='Иконка меню' />
						Меню
					</NavLink>
					<NavLink to='/cart' className={({ isActive }) => cn(styles.link, { [styles.active]: isActive })}>
						<img src='/icons/cart-icon.svg' alt='Иконка корзины' />
						Корзина
					</NavLink>
				</div>
				<Button className={styles.exit}>
					<img src='/icons/exit-icon.svg' alt='Иконка выхода' />
					Выйти
				</Button>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};
