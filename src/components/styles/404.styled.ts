import styled from 'styled-components';

export const StyledErrorPage = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
	padding-top: 1em;

	h1 {
		font-size: 2.5em;
	}

	span {
		text-align: center;
	}

	button {
		width: 12em;
	}

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		h1 {
			font-size: 3.5em;
		}
	}
`;
