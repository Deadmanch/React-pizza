import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { ICartItemProps } from './CartItem.props';
import { cartActions } from '../../store/cart.slice';
import styles from './CartItem.module.css';

const CartItem = (props: ICartItemProps) => {
	const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		dispatch(cartActions.add(props.id));
	};

	const decrease = () => {
		dispatch(cartActions.remove(props.id));
	};

	const remove = () => {
		dispatch(cartActions.delete(props.id));
	};

	return (
		<div className={styles.item}>
			<div
				className={styles.image}
				style={{
					backgroundImage: `url(${props.image})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat'
				}}
			></div>
			<div className={styles.description}>
				<div className={styles.name}>{props.name}</div>
				<div className={styles.currency}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles.actions}>
				<button className={styles.minus} onClick={decrease}>
					<img src='/icons/minus-icon.svg' alt='Уменьшить количество продукта' />
				</button>
				<div className={styles.count}>{props.count}</div>
				<button className={styles.plus} onClick={increase}>
					<img src='/icons/plus-icon.svg' alt='Увеличить количество продукта' />
				</button>
				<button className={styles.remove} onClick={remove}>
					<img src='/icons/delete-icon.svg' alt='Удалить из корзины' />
				</button>
			</div>
		</div>
	);
};

export default CartItem;
