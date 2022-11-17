import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background: rgb(170, 170, 170);
    }

    ::-webkit-scrollbar-thumb:hover {
        border: 4px solid transparent;
        background: rgb(100, 100, 100);
    }
    *, *::before, *::after {
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif
    }

    html,
    body {
        margin: 0;
        padding: 0;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.6;
    }

    body {
        margin-top: ${({ theme }) => theme.navBarHeight};
        accent-color: ${({ theme }) => theme.colors.primary}
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
    }
    
    a {
        color: inherit;
        text-decoration: none;
    } 

    .loading-spinner {
        stroke: ${({ theme }) => theme.colors.text}
    }

    .skeleton-force-white::after {
        background-color: ${({ theme }) => theme.theme === 'dark' && '#646464'}
    }
`;

export default GlobalStyles;
