import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import Input from './Input';

interface NumberInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'defaultChecked'> {
	label?: string;
}

export default function NumberInput(props: NumberInputProps) {
	return <Input type='number' {...props} />;
}
