import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const StyledNavBar = styled.nav`
	display: flex;
	position: fixed;
	top: 0;
	z-index: 5;
	width: 100%;
	height: ${({ theme }) => theme.navBarHeight};
	background-color: ${({ theme }) => theme.colors.card};
	padding: 0 1em;
	box-shadow: 0 0 4px rgb(0 0 0 / 0.4);
	justify-content: space-between;
	align-items: center;

	a {
		display: flex;
		align-items: center;
		gap: 1em;
		font-size: 1.3em;
		font-weight: 600;
	}

	a.active,
	a:hover {
		text-decoration: underline;
	}

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		img:hover {
			filter: brightness(1.15);
			transition: 500ms ease;
		}
	}
`;

export default function NavBar() {
	return (
		<StyledNavBar>
			<Link href='/'>
				<Image src='/logo.png' alt='Logo von Nairol Bus Check' width={40} height={40} />
			</Link>
			<h1>Nairol Bus Tracker</h1>
			<div />
		</StyledNavBar>
	);
}
