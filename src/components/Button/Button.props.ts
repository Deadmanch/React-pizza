import { ReactNode } from 'react';
export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}
