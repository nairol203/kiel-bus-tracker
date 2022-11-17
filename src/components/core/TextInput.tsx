import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import Input from './Input';

interface TextInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'defaultChecked'> {
	label?: string;
}

export default function TextInput(props: TextInputProps) {
	return <Input type='text' {...props} />;
}
