import cn from 'classnames';
import styles from './Heading.module.css';
import { IHeadingProps } from './Heading.props';

export const Heading = ({ children, className, ...props }: IHeadingProps) => {
	return (
		<h1 {...props} className={cn(styles.h1, className)}>
			{children}
		</h1>
	);
};
