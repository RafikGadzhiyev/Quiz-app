import React from 'react';
import Image from 'next/image';
import {$countries, __INIT__ } from './../effector/store';
import { useStore, useEvent } from 'effector-react'
import { Answer, Answerbutton, AnswerContent, AnswersList, ImageContainer, QuizQuestion, StyledQuizContentContainer, StyledQuizMainContainer, NextButton } from "./StyledComponents"
import ApplicationStaticIcon from './../icons/undraw_adventure_4hum 1.svg';
import ApplicationFinishIcon from './../icons/undraw_winners_ao2o 2.svg';
import { CreateQuestion } from './../methods/functions';
import { v4 as uuid4 } from 'uuid';
import CircularProgress from '@mui/material/CircularProgress';

export const QuizMainContainer: React.FC = () => {
    const [questions, setQuestions] = React.useState([]); 
    const [questionIndex, setQuestionIndex] = React.useState<number>(0); 
    const score = React.useRef<number>(0); 

    const ListRef: React.MutableRefObject<HTMLUListElement | null> = React.useRef(null);
    const NextButtonRef: React.MutableRefObject<HTMLButtonElement | null> = React.useRef(null);

    const QUESTION_ANSWER_MARKS = React.useRef(['A', 'B', 'C', 'D']);
    const countries = useStore($countries);
    const isPending = useStore(__INIT__.pending);
    const once = React.useRef<number>(1);


    const ButtonsClickhandler = (e: React.SyntheticEvent) => {
        if (questions[questionIndex].answered) return;
        let element: HTMLElement | HTMLButtonElement | null = e.target as HTMLElement;
        if (element.tagName !== 'BUTTON') {
            element = element.closest('button');
        }

        if (element) {
            if (element.children[1].textContent === questions[questionIndex].correctAnswer + '') {
                element.classList.add('correct');
                score.current ++;
            }
            else {
                if(ListRef.current){
                    const children: Array<Element> = Array.from(ListRef.current.children);
                    children.forEach(child => {
                        let button = child.children[0],
                            text = button.children[1].textContent.trim();
                            if(text === questions[questionIndex].correctAnswer + ''){
                                button.classList.add('correct');
                            }
                    }) 
                    element.classList.add('incorrect');
                }
                
            }
        if(NextButtonRef.current){
            NextButtonRef.current.classList.remove('disabled');
        }
        questions[questionIndex].answered = true;

    }
}

    const nextQuestion = () => {
        setQuestionIndex(prev => prev + 1);
        if(NextButtonRef.current){
            NextButtonRef.current.classList.add('disabled');
        }
    }

    const generate = () => {
         const generatedQuestions = [];
            for(let i = 0; i < 20; ++i){
                 generatedQuestions.push(CreateQuestion(countries));
            }
            setQuestions(() => generatedQuestions);
            setQuestionIndex(() => 0);
            score.current = 0;
    }


    React.useEffect(() => {
        if(countries.length && once.current){
           generate();
            once.current--;
        }
    }, [countries]);

    return (
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
                <div
                    style = {{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: "column"
                    }}
                >
                    <Image
                        src={ApplicationFinishIcon}
                        alt='Application finish icon'
                        width = '250'
                        height = '250'
                    />
                    <span>Total: {score.current}</span>
                    <button  onClick = {() => generate()}>Try again</button>
                </div>
        }
            {
                !questions.length &&
                <CircularProgress
                    sx = {{
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
                        {
                            questions[questionIndex].question
                        }
                        {
                            questions[questionIndex].type === "NAME" &&
                            <Image
                                src = {questions[questionIndex].image + ''}
                                alt = 'Country flag icon'
                                width = '70'
                                height = '40' 
                                
                            />
                        }
                    </QuizQuestion>
                    <AnswersList
                        ref={ListRef}
                        as={AnswersList}
                    >
                        {
                            questions[questionIndex].answers.map((e, i) => <Answer
                                key={uuid4()}
                            >
                                <Answerbutton
                                    onClick={(e: React.SyntheticEvent) => ButtonsClickhandler(e, questionIndex)}
                                >
                                    <span>{QUESTION_ANSWER_MARKS.current[i]}</span>
                                    <AnswerContent>{e + ''}</AnswerContent>
                                    <i
                                        className="bi bi-check-circle correct_icon"
                                    ></i>
                                    <i className="bi bi-x-circle incorrect_icon"></i>
                                </Answerbutton>
                            </Answer>)
                        }
                    </AnswersList> 
                    <NextButton
                        as = {NextButton}
                        ref = {NextButtonRef}
                        onClick = {() => nextQuestion()}
                        className = "disabled"
                    >
                        Next
                    </NextButton>
                </StyledQuizContentContainer>
            }
        </StyledQuizMainContainer>
    )
}
