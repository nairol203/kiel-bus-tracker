import { StyledInput } from '@components/styles/Input.styled';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label?: string;
}

export default function Input({ type, label, ...props }: InputProps) {
	return label ? (
		<StyledInput required={!!props.required}>
			<label>{label}</label>
			<input type={type} {...props} />
		</StyledInput>
	) : (
		<input type={type} {...props} />
	);
}
