import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import Input from './Input';

interface RadioButtonProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'defaultValue'> {
	label?: string;
}

export default function RadioButton(props: RadioButtonProps) {
	return <Input type='radio' {...props} />;
}
