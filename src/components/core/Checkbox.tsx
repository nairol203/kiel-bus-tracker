import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import Input from './Input';

interface CheckboxProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'defaultValue'> {
	label?: string;
}

export default function Checkbox(props: CheckboxProps) {
	return <Input type='checkbox' {...props} />;
}
