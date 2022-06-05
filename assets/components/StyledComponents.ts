import styled, { StyledComponent } from "styled-components";


export const StyledQuizContainer: StyledComponent<'div', any, {}> = styled.div`
    display: flex;
    flex-direction: column;
	width: 500px;
	min-height: 450px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform:translate(-50%, -50%)
`

export const StyledQuizHeader: StyledComponent<'header', any, {}> = styled.header`

`

export const StyledQuizMainContainer: StyledComponent<'main', any, {}> = styled.main`
    background-color: #fff;
	border-radius: 20px;
	padding: 3rem 1rem 2rem;
	color: #6066D0CC;
	min-height: inherit;
	height: 100%;
`

export const StyledQuizTitle: StyledComponent<'h1', any, {}> = styled.h1`
	font-family: "Poppins Bold";
	text-transform: uppercase;
	color: white;
	font-size: 2rem;
`

export const ImageContainer: StyledComponent<'div', any, {}> = styled.div`
	position: absolute;
	top: -10px;
	right:0;
`

export const StyledQuizContentContainer: StyledComponent<'div', any, {}> = styled.div`
	padding-inline: 1rem;
`

export const QuizQuestion: StyledComponent<'span', any, {}> = styled.span`
	font-family: "Poppins Bold";
	color: #2F527B;
	display: flex;
	align-items: center;
	gap: .3rem;
`

export const AnswersList: StyledComponent<'ul', any, {}> = styled.ul`
	list-style: none;
	margin-top: 1rem;
`

export const Answer: StyledComponent<'li', any, {}> = styled.li`
	width: 100%;

	&:not(:last-of-type){
		margin-bottom: 1rem;
	}
`

export const Answerbutton: StyledComponent<'button', any, {}> = styled.button`
	width 100%;
	padding: 0.25rem .5rem;
	border-radius: 10px;
	border: 1px solid #6066D0B2;
	transition: 300ms ease;
	display: flex;
	gap: 1rem;
	font-family: "Poppins Light";
	justify-content: space-between;
	position: relative;
	overflow: hidden;
	align-items: center;
	padding-right: 21px;

	&>i{
		position: absolute;
		right: .5rem;
		color: transparent;
		transition: 300ms ease;
		transform: translateY(-30px);
	}

	&:hover{
		background-color: #F9A826;
		border-color: #F9A826;
		color: #fff;
	}

	&.correct{
		background-color: #60BF88;
		color: #fff;
		border-color: #60BF88;

		&>.correct_icon{
			transform: translateY(0);
			color: #fff;
		}

	}

	&.incorrect{
		background-color: #EA8282;
		color: #fff;
		border-color: #EA8282;

		&>.incorrect_icon{
			transform: translateY(0);
			color: #fff
		}

	}

`;

export const AnswerContent: StyledComponent<'span', any, {}> = styled.span`
	width:100%;
`

export const NextButton: StyledComponent<"button", any, {}> = styled.button`
	all: unset;
	border-radius: 10px;
	color: #fff;
	background-color: #F9A826;
	padding: .5rem 1.5rem;
	margin-top: 1rem;
	margin-left: 100%;
	transform: translateX(-100%);
	cursor: pointer;

	&.disabled{
		display: none
	}

`