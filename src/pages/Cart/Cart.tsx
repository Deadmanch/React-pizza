import { Heading } from '../../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

export const Cart = () => {
	const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
	const dispatch = useDispatch<AppDispatch>();
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const total = items
		.map(i => {
			const product = cartProducts.find(p => p.id === i.id);
			if (!product) {
				return 0;
			}
			return product.price * i.count;
		})
		.reduce((acc, i) => (acc += i), 0);

	const checkout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		dispatch(cartActions.clean());
		navigate('/success');
	};

	const getItem = async (id: number) => {
		const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map(item => getItem(item.id)));
		setCartProducts(res);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Heading className={styles.title}>Корзина</Heading>
			{items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem count={i.count} key={i.id} {...product} />;
			})}

			<div className={styles.line}>
				<div className={styles.text}>Итог</div>
				<div className={styles.price}>
					{total}&nbsp;<span className={styles.currency}>&#8381;</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>Доставка</div>
				<div className={styles.price}>
					{DELIVERY_FEE} &nbsp;<span className={styles.currency}>&#8381;</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.line}>
				<div className={styles.text}>
					Итог <span className={styles.text_secondary}>({items.length})</span>
				</div>
				<div className={styles.price}>
					{total + DELIVERY_FEE}&nbsp;<span className={styles.currency}>&#8381;</span>
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.checkout}>
				<Button onClick={checkout} appearance='big'>
					Оформить
				</Button>
			</div>
		</>
	);
};

export default Cart;
