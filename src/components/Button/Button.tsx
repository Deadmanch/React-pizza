import cn from 'classnames';
import styles from './Button.module.css';
import { IButtonProps } from './Button.props';

const Button = ({ children, className, appearance = 'small', ...props }: IButtonProps) => {
	return (
		<button
			className={cn(styles.button, styles.accent, className, {
				[styles.big]: appearance === 'big',
				[styles.small]: appearance === 'small'
			})}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
