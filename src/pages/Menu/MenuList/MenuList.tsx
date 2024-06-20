import ProductCard from '../../../components/ProductCard/ProductCard';
import { IMenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

export const MenuList = ({ products }: IMenuListProps) => {
	return (
		<div className={styles.list}>
			{products.map(product => (
				<ProductCard
					key={product.id}
					ingredients={product.ingredients.join(', ')}
					name={product.name}
					image={product.image}
					price={product.price}
					rating={product.rating}
					id={product.id}
				/>
			))}
		</div>
	);
};
