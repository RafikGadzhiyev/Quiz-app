import { QuizMainContainer } from "./QuizContainer"
import { QuizHeader } from "./QuizHeaderComponent"
import { StyledQuizContainer } from "./StyledComponents"

export const QuizContainer: React.FC = () => {
    return (
        <StyledQuizContainer>
            <QuizHeader />
            <QuizMainContainer />
        </StyledQuizContainer>
    )
}