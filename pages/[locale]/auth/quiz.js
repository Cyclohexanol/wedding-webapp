import Link from '../../../components/Link';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useState, useEffect } from "react";
import { userService } from '../../../services/user.service';
import { useRouter } from 'next/router';
import { use } from '../../../node_modules/i18next/index';

const Quiz = () => {
    const { t } = useTranslation(['common']);
    const [memberData, setMemberData] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [userQuiz, setUserQuiz] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMemberData(userService.memberValue);
        if (memberData) {
            fetchData();
        }
    }, [memberData]);

    const fetchData = async () => {
        setIsLoading(true);
        const currentQuestion = await userService.getCurrentQuestion(memberData._id);
        console.log(currentQuestion);
        await updateComponentData(currentQuestion);
        setIsLoading(false);
        console.log("Fetched")
    };

    const getNextQuestion = async () => {
        console.log("next question");
        const nextQuestion = await userService.getNextQuestion(memberData._id);
        await updateComponentData(nextQuestion, true);
    };

    const submitAnswer = async (selectedAnswer) => {
        const response = await userService.postAnswer(memberData._id, question.id, selectedAnswer);
        await updateComponentData(question, false, response);
    }

    const updateComponentData = async (questionData, resetUserAnswer = false, newAnswer = null) => {
        setQuestion(questionData);
        questionData.correctOption && setAnswer(questionData.correctOption);

        const userQuizData = await userService.getUserQuiz(memberData._id);
        setUserQuiz(userQuizData);
        const currentQuestionAnswer = question ? userQuizData.userAnswers.find(answer => answer.question_id === question.id) : null;
        if (currentQuestionAnswer && !resetUserAnswer) {
            setUserAnswer(currentQuestionAnswer.answer);
        } else {
            setUserAnswer(null);
        }

        if (newAnswer) {
            setAnswer(newAnswer);
        }
    };

    const handleClickOption = (option) => {
        submitAnswer(option)
    }


    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="max-w-screen-sm mx-auto flex items-center flex-col">
                    <div className="flex justify-between items-center flex-row w-full">
                        <div className="w-16"></div>
                        <div className="text-2xl font-bold py-3">Quiz</div>
                        <div className="w-16 font-bold" >{userQuiz ? userQuiz.score + " pts": ""}</div>
                    </div>
                    
                    {question && question.id === 0 && (
                        <>
                            <div className="flex items-center text-sm justify-left m-2 px-6 py-2 border border-stone-500 bg-stone-200 rounded-lg">
                                {t('quiz-intro')}
                            </div>
                            <button className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                    shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                    focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mb-3"
                                onClick={getNextQuestion}>
                                {t('start-quiz')}
                            </button>
                        </>
                    )}
                    {question && question.id > 0 && (
                        <>
                            <div className="flex justify-around w-full">
                                <div className="text-xl font-bold">Question {userQuiz ? userQuiz.completedQuestions + (userAnswer ? 0 : 1) : ""}</div>
                                <div className="border border-stone-500 px-2 py-1 rounded">{t(question.difficulty.toLowerCase())}</div>
                            </div>
                            
                            <div className="flex items-center text-sm justify-left m-2 px-6 py-4 border border-stone-500 bg-stone-200 rounded-lg ">
                                {t("questions." + question.questionText)}
                            </div>
                            <div className="flex flex-col gap-2 my-3 w-3/4">
                                {['a', 'b', 'c', 'd'].map((option) => (
                                    <button
                                        key={option}
                                        className={`inline-block px-7 py-4 text-black font-medium text-m leading-tight rounded shadow-md bg-stone-100 w-full sm:w-auto mt-4 sm:mt-0
                                            ${userAnswer ? '' : 'hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'}
                                            ${option === answer && userAnswer && option !== userAnswer ? 'border-2 border-green-700' : ''}
                                            ${option !== answer && userAnswer && option === userAnswer ? 'border-2 border-red-700' : ''}
                                        `}
                                        onClick={() => {
                                            userAnswer ? null : handleClickOption(option)
                                        }}
                                    >
                                        {t("questions." + question[`option${option.toUpperCase()}`])}
                                    </button>
                                ))}

                                {userAnswer ?
                                    <button className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                    shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                    focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full my-3"
                                        onClick={() => getNextQuestion()}
                                    >
                                        { t("next") }
                                    </button>
                                    : null
                                }
                            </div>
                        </>
                    )}
                    {question && question.id < 0 && <div className="text-xl font-bold">Quiz is over</div>}
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Quiz;

export { getStaticPaths };
export const getStaticProps = async (ctx) => {
    return {
        props: {
            ...(await getI18nProps(ctx, ['common', 'footer'])),
        },
    };
};
