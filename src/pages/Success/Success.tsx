import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './Success.module.css';

export const Success = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<img src='/success-img.png' alt='Иконка успеха' />
			<p className={styles.text}>
				Ваш заказ успешно <br /> оформлен
			</p>
			<Button appearance='big' onClick={() => navigate('/')}>
				Сделать новый
			</Button>
		</div>
	);
};
