import styled from 'styled-components';

interface StyledDropdownProps {
	align?: 'left' | 'right';
}

export const StyledDropdown = styled.div<StyledDropdownProps>`
	display: flex;
	z-index: 1;

	@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
		position: relative;
	}

	ul {
		position: fixed;
		list-style-type: none;
		background-color: ${({ theme }) => theme.colors.tertiary};
		box-shadow: 0 0 0.1em rgb(0 0 0 / 0.5);
		margin: 0;
		padding: 0.75em;
		inset: 0;
		top: unset;
		width: 100%;
		border-radius: 1em 1em 0 0;

		animation: fade 250ms ease-in-out forwards;
		transform: translateY(50%);
		opacity: 0;

		@keyframes fade {
			100% {
				transform: translateY(0);
				opacity: 1;
			}
		}

		@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
			position: absolute;
			margin: 0.5em 0;
			border-radius: 0.25em;
			width: 10em;
			padding: 0.5em;
			bottom: initial;
			left: initial;
			right: initial;
			top: 100%;
			animation: initial;
			transform: initial;
			opacity: initial;
		}
	}

	ul > li {
		border-radius: 0.25em;
		padding: 0.5em;

		@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
			padding: 0.3em;
		}
	}

	ul > div {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0.25em 0 0.5em 0;

		@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
			display: none;
		}
	}

	ul > div > div {
		width: 30%;
		height: 0.25em;
		background-color: ${({ theme }) => theme.colors.card};
		border-radius: 2em;
	}
`;
