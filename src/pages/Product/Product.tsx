import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { Heading } from '../../components/Heading/Heading';
import { Suspense } from 'react';

export const Product = () => {
	const data = useLoaderData() as { data: IProduct };
	return (
		<>
			<Suspense fallback={<div>Загрузка...</div>}>
				<Await resolve={data.data}>{({ data }) => <Heading>{data.name}</Heading>}</Await>
			</Suspense>
		</>
	);
};
