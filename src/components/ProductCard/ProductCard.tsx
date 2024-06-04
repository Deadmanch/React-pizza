import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { IProductCardProps } from './ProductCard.props';

const ProductCard = (props: IProductCardProps) => {
	return (
		<Link to={`/product/${props.id}`}>
			<div className={styles.card}>
				<div className={styles.head} style={{ backgroundImage: `url(${props.img})` }}>
					<div className={styles.price}>
						{props.price}&nbsp;
						<span className={styles.currency}>₽</span>
					</div>
					<button className={styles['add-to-cart']}>
						<img src='/icons/cart-button-icon.svg' alt='Добавить в корзину' />
					</button>
					<div className={styles.rating}>
						{props.rating}&nbsp;
						<img src='/icons/star-icon.svg' alt='Рейтинг продукта' />
					</div>
				</div>
				<div className={styles.bottom}>
					<h3 className={styles.title}>{props.title}</h3>
					<p className={styles.description}>{props.description}</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
