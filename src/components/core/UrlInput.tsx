import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import Input from './Input';

interface UrlInputProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type' | 'defaultChecked'> {
	label?: string;
}

export default function UrlInput(props: UrlInputProps) {
	return <Input type='url' {...props} />;
}
