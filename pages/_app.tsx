import type { AppProps } from 'next/app'
import { createGlobalStyle, DefaultTheme, GlobalStyleComponent } from 'styled-components';
import './../styles/font.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const GlobalStyles: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
	*{
		margin: 0;
		padding:0;
		box-sizing: inherit;
	}

	html,
	body{
		width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		font-size: 20px;
		font-family: "Poppins Medium";
	}

	body{
		background-color: #5256a1;
		overflow: hidden;

		&:after{
			width: 40%;
			aspect-ratio: 1/1;
			border-radius: 20px;
			background-color: #5c61c2;
			content: '';
			position: absolute;
			top: -55%;
			right:  -35%;
			transform: translate(-50%, 50%) rotate(-60deg);
			z-index: -100;
		}
		&:before{
			width: 50%;
			aspect-ratio: 1/1;
			border-radius: 20px;
			background-color: #5c61c2;
			content: '';
			position: absolute;
			bottom: -95%;
			left:  -35%;
			transform: translate(50%, -50%) rotate(-60deg);
			z-index: -100;
		}

	}

	button,
	a{
		all: unset;
		cursor: pointer;
		box-sizing: border-box;
	}
`

function MyApp({ Component, pageProps }: AppProps) {
	return <>
		<GlobalStyles />
		<Component {...pageProps} />
	</>
}

export default MyApp
