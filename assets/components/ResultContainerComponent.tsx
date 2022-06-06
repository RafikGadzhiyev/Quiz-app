import Image from 'next/image';
import ApplicationFinishIcon from './../icons/undraw_winners_ao2o 2.svg';
import { StyledAgainButton, StyledResultContainer, StyledResultTitle, StyledScoreInfo, StyledScoreNumber, StyledScoreWrapper } from './StyledComponents';

interface IProps {
    generate: () => void,
    score: number
}

export const ResultContainer: React.FC<IProps> = (props) => {
    return (
        <StyledResultContainer>
            <StyledScoreWrapper>
                <Image
                    src={ApplicationFinishIcon}
                    alt='Application finish icon'
                    width='230'
                    height='230'
                />
                <StyledResultTitle>results</StyledResultTitle>
                <StyledScoreInfo>You got: <StyledScoreNumber>{props.score}</StyledScoreNumber> correct answer{props.score > 1 ? 's' : ''}</StyledScoreInfo>
            </StyledScoreWrapper>
            <StyledAgainButton onClick={() => props.generate()}>Try again</StyledAgainButton>
        </StyledResultContainer>
    )
}
