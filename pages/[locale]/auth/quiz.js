import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useState, useEffect } from "react";
import { userService } from '../../../services/user.service';
import { useRouter } from 'next/router'

const Quiz = () => {
    const { t } = useTranslation(['common']);
    let router= useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        memberData: null,
        question: null,
        answer: null,
        userQuiz: null,
        userAnswer: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const currentQuestion = await userService.getCurrentQuestion(data.memberData._id);
            setData(prevData => ({
                ...prevData,
                question: currentQuestion,
                answer: currentQuestion.correctOption ? currentQuestion.correctOption : null,
            }))
            // await fetchUserAnswer();
            // await updateComponentData(currentQuestion);
            setIsLoading(false);
        };
        if(data.memberData)
            fetchData();
    }, [data.memberData]);

    useEffect(() => {
        if(!data.memberData) {
            setData(prevData => (
                {
                    ...prevData,
                    memberData: userService.memberValue
                }
            ))
        }
    }, []);

    // OK
    const fetchUserAnswer = async () => {
        const userQuizData = await userService.getUserQuiz(data.memberData._id);
        const currentQuestionAnswer = userQuizData.userAnswers.find(answer => answer.question_id === data.question.id);
        setData(prevData => ({
            ...prevData,
            userQuiz: userQuizData,
            userAnswer: currentQuestionAnswer ? currentQuestionAnswer.answer : null
        }))
    };

    useEffect(() => {
        if (data.question) {
            fetchUserAnswer();
        }
    }, [data.question]);


    // OK
    const getNextQuestion = async () => {
        setIsLoading(true);
        const nextQuestion = await userService.getNextQuestion(data.memberData._id);
        setData(prevData => ({
            ...prevData,
            question: nextQuestion,
            answer: nextQuestion.correctOption ? nextQuestion.correctOption : null,
            userAnswer: null
        }))
        await fetchUserAnswer();
        setIsLoading(false);
    };


    const submitAnswer = async (selectedAnswer) => {
        setIsLoading(true);
        const response = await userService.postAnswer(data.memberData._id, data.question.id, selectedAnswer)
        setData(prevData => ({
            ...prevData,
            userAnswer: selectedAnswer,
            answer: response.correct_answer
        }))
        // await updateComponentData(data.question, false, response)
        setIsLoading(false);
    };

    // const updateComponentData = async (questionData, resetUserAnswer = false, newAnswer = null) => {
    //     console.log("Update component data")
    //     let tmpData = {...data, question: questionData};
    //     questionData.correctOption && (tmpData = {...tmpData, answer: questionData.correctOption}); // Tocheck in submitAnswer

    //     const userQuizData = await userService.getUserQuiz(data.memberData._id);
    //     tmpData = {...tmpData, userQuiz: userQuizData};
    //     const currentQuestionAnswer = tmpData.question ? userQuizData.userAnswers.find(answer => answer.question_id === tmpData.question.id) : null;
    //     if (currentQuestionAnswer && !resetUserAnswer) {
    //         tmpData = {...tmpData, userAnswer: currentQuestionAnswer.answer};
    //     } else {
    //         tmpData = {...tmpData, userAnswer: null}
    //     }
    //     if (newAnswer) {
    //         tmpData = {...tmpData, userAnswer: newAnswer.correct_answer};
    //     }
    //     setData(tmpData)
    //

    if (data.question && data.question.id < 0) {
        router.push('/auth/leaderboard')
    }

    return (
        <>
            {
                !isLoading && data.memberData ? (
                    <>
                        <main>
                            <Header title={t('title')} />
                            <div className="max-w-screen-sm mx-auto flex items-center flex-col">
                                <div className="flex justify-between items-center flex-row w-full">
                                    <div className="w-16"></div>
                                    <div className="text-2xl font-bold py-3">Quiz</div>
                                    <div className="w-16 font-bold" >{data.userQuiz ? data.userQuiz.score + " pts" : ""}</div>
                                </div>

                                {data.question && data.question.id === 0 && (
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
                                {data.question && data.question.id > 0 && (
                                    <>
                                        <div className="flex justify-around w-full">
                                            <div className="text-xl font-bold">Question {data.userQuiz ? data.userQuiz.completedQuestions + (data.userAnswer ? 0 : 1) : ""}</div>
                                            <div className="border border-stone-500 px-2 py-1 rounded">{t(data.question.difficulty.toLowerCase())}</div>
                                        </div>

                                        <div className="flex items-center text-sm justify-left m-2 px-6 py-4 border border-stone-500 bg-stone-200 rounded-lg ">
                                            {t("questions." + data.question.questionText)}
                                        </div>
                                        <div className="flex flex-col gap-2 my-3 w-3/4">
                                            {['a', 'b', 'c', 'd'].map((option) => (
                                                <button
                                                    key={option}
                                                    className={`inline-block px-7 py-4 text-black font-medium text-m leading-tight rounded shadow-md bg-stone-100 w-full sm:w-auto mt-4 sm:mt-0
                                            ${data.userAnswer ? '' : ' hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'}
                                            ${option === data.answer && data.userAnswer && option === data.userAnswer ? ' border-2 border-green-700' : ''}
                                            ${option === data.answer && data.userAnswer && option !== data.userAnswer ? ' border-2 border-green-700' : ''}
                                            ${option !== data.answer && data.userAnswer && option === data.userAnswer ? ' border-2 border-red-700' : ''}
                                        `}
                                                    onClick={() => {
                                                        data.userAnswer ? null : submitAnswer(option)
                                                    }}
                                                >
                                                    {t("questions." + data.question[`option${option.toUpperCase()}`])}
                                                </button>
                                            ))}

                                            {data.userAnswer ?
                                                <button className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                    shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                    focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full my-3"
                                                    onClick={() => getNextQuestion()}
                                                >
                                                    {t("next")}
                                                </button>
                                                : null
                                            }
                                        </div>
                                    </>
                                )}
                                {data.question && data.question.id < 0 && <div>
                            Quiz is over
                                    </div>
                                    
                                }
                            </div>
                        </main>

                        <Footer />
                    </>
                ) : (
                    <div>Loading...</div>
                )
            }
        </>
    )
    
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
