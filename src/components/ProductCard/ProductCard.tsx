import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { IProductCardProps } from './ProductCard.props';

const ProductCard = (props: IProductCardProps) => {
	return (
		<Link to={`/product/${props.id}`}>
			<div className={styles.card}>
				<div
					className={styles.head}
					style={{
						backgroundImage: `url(${props.image})`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat'
					}}
				>
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
					<h3 className={styles.name}>{props.name}</h3>
					<p className={styles.ingredients}>{props.ingredients}</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
