import React from 'react';
import Image from 'next/image';
import { $countries, __INIT__ } from './../effector/store';
import { useStore } from 'effector-react'
import { ImageContainer, QuizQuestion, StyledQuizContentContainer, StyledQuizMainContainer, NextButton, QuizQuestionContent } from "./StyledComponents"
import ApplicationStaticIcon from './../icons/undraw_adventure_4hum 1.svg';
import { CreateQuestion } from './../methods/functions';
import CircularProgress from '@mui/material/CircularProgress';
import { ResultContainer } from './ResultContainerComponent';
import { AnimatePresence } from 'framer-motion';

import type { ICountry, IQuestion } from '../types';
import { Answers } from './AnswersComponent';

export const QuizMainContainer: React.FC = () => {
    const score: React.MutableRefObject<number> = React.useRef<number>(0);
    const once: React.MutableRefObject<number> = React.useRef<number>(1);

    const [questions, setQuestions]: [Array<IQuestion>, React.Dispatch<React.SetStateAction<Array<IQuestion>>>] = React.useState<Array<IQuestion>>([]);
    const [questionIndex, setQuestionIndex]: [number, React.Dispatch<React.SetStateAction<number>>] = React.useState<number>(0);

    const NextButtonRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);

    const countries: Array<ICountry> = useStore($countries);


    const nextQuestion = React.useCallback(() => {
        setQuestionIndex(prev => prev + 1);
        if (NextButtonRef.current) {
            NextButtonRef.current.classList.add('disabled');
        }
    }, [])

    const generate = React.useCallback(() => {
        const generatedQuestions: Array<IQuestion> = [];
        for (let i = 0; i < 20; ++i) {
            generatedQuestions.push(CreateQuestion(countries));
        }
        setQuestions(() => generatedQuestions);
        setQuestionIndex(() => 0);
        score.current = 0;
    }, [countries]);


    React.useEffect(() => {
        if (countries.length && once.current) {
            generate();
            once.current--;
        }
    }, [countries, generate]);

    return (
        <AnimatePresence>
            <StyledQuizMainContainer>
                {
                    questionIndex < questions.length &&
                    <ImageContainer>
                        <Image
                            src={ApplicationStaticIcon}
                            alt='Application static icon'
                        />
                    </ImageContainer>
                }
                {
                    questionIndex >= questions.length && !!questions.length &&
                    <ResultContainer
                        generate={generate}
                        score={score.current}
                    />
                }
                {
                    !questions.length &&
                    <CircularProgress
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(50%, -50%)"
                        }}
                    />
                }
                {
                    !!questions.length && questionIndex < questions.length &&
                    <StyledQuizContentContainer>
                        <QuizQuestion>
                            <QuizQuestionContent>
                                {
                                    questions[questionIndex].question
                                }
                            </QuizQuestionContent>
                            {
                                questions[questionIndex].type === "NAME" &&
                                <Image
                                    src={questions[questionIndex].image + ''}
                                    alt='Country flag icon'
                                    width='70'
                                    height='40'
                                />
                            }
                        </QuizQuestion>
                        <Answers
                            questions={questions}
                            questionIndex={questionIndex}
                            score={score}
                            NextButtonRef={NextButtonRef}
                        />
                        <NextButton
                            as={NextButton}
                            ref={NextButtonRef}
                            onClick={() => nextQuestion()}
                            className="disabled"
                        >
                            Next
                        </NextButton>
                    </StyledQuizContentContainer>
                }
            </StyledQuizMainContainer>

        </AnimatePresence>
    )
}
