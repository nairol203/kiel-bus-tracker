import styled from 'styled-components';

interface StyledModalWrapper {
	fullScreen?: boolean;
}

interface StyledModalProps {
	fullScreen?: boolean;
	centered?: boolean;
	width?: string;
}

interface StyledBackdropProps {
	variant?: 'transparent';
}

export const StyledModalRoot = styled.div`
	position: fixed;
	inset: 0;
	z-index: 200;
`;

export const StyledModalWrapper = styled.div<StyledModalWrapper>`
	display: flex;
	position: absolute;
	inset: 0;
	padding: ${({ fullScreen }) => (fullScreen ? '0em' : '3em 1em')};
	justify-content: center;
	align-items: flex-start;

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		/* top: 5%; */
		overflow-y: auto;
		padding: 3em 1em;
	}
`;

export const StyledModal = styled.div<StyledModalProps>`
	display: flex;
	flex-direction: column;
	gap: 1em;
	padding: 1.25em;
	z-index: 10;
	background-color: ${({ theme }) => theme.colors.card};
	height: ${({ fullScreen }) => (fullScreen ? '100%' : 'auto')};
	width: ${({ fullScreen }) => (fullScreen ? '100vw' : 'auto')};
	margin: ${({ centered }) => (centered ? 'auto 0' : '0')};

	@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
		border-radius: 0.25em;
		height: auto;
		width: 85vw;
		max-width: ${({ width }) => width};
	}

	header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;

		@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
			svg:hover {
				transition: all 250ms ease;
				opacity: 0.75;
			}
		}
	}

	animation: fade 250ms ease-in-out forwards;
	transform: translateY(10%);
	opacity: 0;

	@keyframes fade {
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.modal-content {
		@media screen and (max-width: ${({ theme }) => theme.mobile.threshold}) {
			overflow-y: auto;
		}
	}

	.modal-close-button {
		margin-top: auto;

		button {
			border-radius: 4px;
			width: 100%;
			height: 40px;
		}

		@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
			display: none;
		}
	}
`;

export const StyledBackdrop = styled.div<StyledBackdropProps>`
	position: fixed;
	inset: 0;
	z-index: 0;
	border-radius: 0px;
	backdrop-filter: ${({ variant }) => variant !== 'transparent' && 'blur(1.5px)'};
	background-color: ${({ variant }) => variant !== 'transparent' && 'rgba(0, 0, 0, 0.8)'};
`;
