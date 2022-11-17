import styled from 'styled-components';

interface ButtonProps {
	variant?: 'primary' | 'secondary';
	size?: 'normal' | 'big';
}

interface CardProps {
	maxWidth?: string;
}

interface TextProps {
	size?: string;
	align?: 'center';
}

interface GroupProps {
	justify?: 'space-between' | 'flex-start' | 'center' | 'space-around';
	align?: 'space-between' | 'flex-start' | 'center';
	direction?: 'column' | 'row' | 'column-reverse';
	gap?: string;
	nowrap?: boolean;
	clickable?: boolean;
}

interface ChipProps {
	variant?: 'primary' | 'secondary';
	clickable?: boolean;
	withIcon?: boolean;
}

interface PlaceholderProps {
	height: string;
}

export const Button = styled.button<ButtonProps>`
	color: ${({ variant, theme }) => (!variant || variant === 'primary' ? '#fff' : theme.colors.text)};
	background-color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.tertiary : theme.colors.primary)};
	min-height: 2.3em;
	padding: 0.5em 1em;
	border-radius: 5em;
	border: none;
	cursor: pointer;
	transition: all 500ms ease;
	box-shadow: 0 0 0.1em rgb(0 0 0 / 0.5);

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		width: ${({ size }) => size === 'big' && '9em'};

		&:hover {
			color: ${({ variant, theme }) => (variant === 'secondary' ? theme.colors.text : '#000')};
			background-color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.buttonHover : theme.colors.secondary)};
		}
	}

	&:disabled {
		color: ${({ variant, theme }) => (variant === 'secondary' ? theme.colors.text : '#000')};
		background-color: ${({ theme }) => theme.colors.tertiary};
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const Text = styled.span<TextProps>`
	font-size: ${({ size }) => size};
	text-align: ${({ align }) => align};
`;

export const Group = styled.div<GroupProps>`
	display: flex;
	flex-direction: ${({ direction }) => direction};
	flex-wrap: ${({ nowrap }) => (nowrap ? 'nowrap' : 'wrap')};
	gap: ${({ gap }) => gap || '.5em'};
	justify-content: ${({ justify }) => justify};
	align-items: ${({ align }) => align};
	cursor: ${({ clickable }) => clickable && 'pointer'};

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
	}
`;

export const Card = styled.div<CardProps>`
	display: flex;
	flex-direction: column;
	gap: 1em;
	background-color: ${({ theme }) => theme.colors.card};
	padding: 1.5em;
	border-radius: 0.5em;
	box-shadow: 0 0 0.1em rgb(0 0 0 / 0.5);
	max-width: ${({ maxWidth }) => maxWidth};

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		align-items: flex-start;
	}
`;

export const Chip = styled.a<ChipProps>`
	color: ${({ variant, theme }) => (!variant || variant === 'primary' ? '#fff' : theme.colors.text)};
	background-color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.tertiary : theme.colors.primary)};
	padding: 0.2em 0.5em 0.2em 0.5em;
	border-radius: 0.25em;
	box-shadow: 0 0 0.1em rgb(0 0 0 / 0.5);
	cursor: ${({ clickable }) => clickable && 'pointer'};
	height: 2em;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 500ms ease;

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		&:hover {
			color: ${({ variant, theme, clickable }) => clickable && (variant === 'secondary' ? theme.colors.text : '#000')};
			background-color: ${({ theme, variant, clickable }) => clickable && (variant === 'secondary' ? theme.colors.buttonHover : theme.colors.secondary)};
		}
	}
`;

export const Placeholder = styled.div<PlaceholderProps>`
	height: ${({ height }) => height};
`;

export const Grid = styled.div`
	display: grid;
	gap: 1em;
	grid-template-columns: repeat(1, 1fr);

	@media screen and (min-width: ${({ theme }) => theme.mobile.threshold}) {
		grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
	}
`;

export const Heading = styled.header`
	display: flex;
	flex-direction: column;
	padding: 1em 0;

	h1 {
		font-size: 2em;
	}

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		transition: all 0.2s ease;
		justify-content: start;
		max-width: 800px;

		h1 {
			font-size: 3.5em;
		}
	}
`;

export const Main = styled.main`
	margin: 0 1em;

	@media (min-width: 1800px) {
		max-width: 1920px;
		margin: 0 auto;
	}
`;

export const Seperator = styled.div`
	width: 100%;
	height: 1px;
	margin: 10px 0 10px 0;
	background-color: #474b50;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5em;
	width: 100%;
`;
