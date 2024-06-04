import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Search.module.css';
import { ISearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, ISearchProps>(function Input({ className, isValid = true, ...props }, ref) {
	return (
		<div className={styles['input-wrapper']}>
			<input ref={ref} className={cn(styles.input, className, { [styles.invalid]: !isValid })} {...props} />
			<img className={styles.icon} src='/icons/search-icon.svg' alt='Иконка поиска' />
		</div>
	);
});

export default Search;
