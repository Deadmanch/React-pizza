import { Heading } from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import styles from './Menu.module.css';

export const Menu = () => {
	const getMenu = async () => {
		const res = await fetch(`${PREFIX}/products`);
		if (!res.ok) throw new Error('Failed to fetch menu');

		const data = await res.json();
		
	};
	return (
		<>
			<div className={styles.head}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				<ProductCard
					title='Наслаждение'
					id={1}
					description='Салями, руккола, помидоры, оливки'
					price={300}
					rating={4.5}
					img='/product/product-01.png'
				/>
			</div>
		</>
	);
};
