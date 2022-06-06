import React from 'react';
import { Answer, Answerbutton, AnswerContent, AnswersList } from "./StyledComponents"
import { v4 as uuid4 } from 'uuid'
import { IQuestion } from '../types';

interface IProps {
    questions: Array<IQuestion>,
    questionIndex: number,
    score: React.MutableRefObject<number>,
    NextButtonRef: React.MutableRefObject<HTMLButtonElement | null>
}

export const Answers: React.FC<IProps> = ({ questions, questionIndex, score, NextButtonRef }) => {
    const QUESTION_ANSWER_MARKS: React.MutableRefObject<string[]> = React.useRef(['A', 'B', 'C', 'D']);
    const ListRef: React.MutableRefObject<HTMLUListElement | null> = React.useRef(null);

    const ButtonsClickhandler = React.useCallback((e: React.SyntheticEvent) => {
        if (questions[questionIndex].answered) return;
        let element: HTMLElement | HTMLButtonElement | null = e.target as HTMLElement;
        if (element.tagName !== 'BUTTON') {
            element = element.closest('button');
        }

        if (element) {
            if (element.children[1].textContent === questions[questionIndex].correctAnswer + '') {
                element.classList.add('correct');
                score.current++;
            }
            else {
                if (ListRef.current) {
                    const children: Array<Element> = Array.from(ListRef.current.children);
                    children.forEach(child => {
                        let button: Element | null = child.children[0],
                            mainElement: Element | null = button.children[1],
                            text: string = '';
                        if (button && mainElement && mainElement.textContent) {
                            text = mainElement.textContent.trim();
                        }
                        if (text === questions[questionIndex].correctAnswer + '') {
                            button.classList.add('correct');
                        }
                    })
                    element.classList.add('incorrect');
                }

            }
            if (NextButtonRef.current) {
                NextButtonRef.current.classList.remove('disabled');
            }
            questions[questionIndex].answered = true;

        }
    }, [questionIndex, questions, NextButtonRef, score])

    return <AnswersList
        ref={ListRef}
        as={AnswersList}
    >
        {
            questions[questionIndex].answers.map((e, i) => <Answer
                initial={{
                    x: -500
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    delay: i * 0.1
                }}
                key={uuid4()}
            >
                <Answerbutton
                    onClick={(e: React.SyntheticEvent) => ButtonsClickhandler(e)}
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
}