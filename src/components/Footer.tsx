import Image from 'next/image';
import logo from '@public/logo.png';
import styled from 'styled-components';
import { Group } from './styles/Core.styled';

const StyledFooter = styled(Group)`
	background-color: ${({ theme }) => theme.colors.card};
	box-shadow: 0 0 4px rgb(0 0 0 / 0.4);
	height: ${({ theme }) => theme.footerHeight};

	a {
		font-size: 0.9em;
		color: darkgrey;
	}

	a:hover {
		text-decoration: underline;
	}
`;

export default function Footer() {
	return (
		<StyledFooter align='center' justify='center' gap='1em'>
			<Image src={logo} alt='Logo' width={30} height={30} />
			<a href='https://nairol.me' target='_blank' rel='noreferrer'>
				© 2022 nairol203
			</a>
		</StyledFooter>
	);
}
