import { useEffect, useState } from 'react';
import { Heading } from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export const Menu = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | undefined>(undefined);
	const getMenu = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);
	return (
		<>
			<div className={styles.head}>
				<Heading>Меню</Heading>
				<Search placeholder='Введите блюдо или состав' />
			</div>
			<div>
				{error && <p className={styles.error}>{error}</p>}
				{!isLoading && <MenuList products={products} />}
				{isLoading && <p>Загружаем продукты...</p>}
			</div>
		</>
	);
};

export default Menu;
