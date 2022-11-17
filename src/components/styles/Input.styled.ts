import styled from 'styled-components';

interface StyledInputProps {
	required: boolean;
}

export const StyledInput = styled.div<StyledInputProps>`
	label {
		font-size: 0.9em;
		color: ${({ theme }) => (theme.theme === 'dark' ? '#c1c2c5' : theme.colors.text)};

		&::after {
			display: ${({ required }) => !required && 'none'};
			content: ' *';
			color: ${({ theme }) => theme.colors.primary};
		}
	}

	input[type='text'],
	input[type='url'],
	input[type='number'] {
		width: 100%;
		padding: 0.75em 1em;
		margin: 0.25em 0;
		display: inline-block;
		border-radius: 4px;
		box-sizing: border-box;
		border: 1px solid #373a40;
		background-color: ${({ theme }) => theme.colors.background};
		color: ${({ theme }) => theme.colors.text};
	}

	input[type='checkbox'] {
		display: block;
		width: 1.5em;
		height: 1.5em;
	}

	span {
		font-size: 0.8em;
		color: red;
	}
`;
