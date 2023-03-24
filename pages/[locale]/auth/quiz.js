import Link from '../../../components/Link';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useState, useEffect } from "react";
import { userService } from '../../../services/user.service';
import { useRouter } from 'next/router';

const Quiz = () => {
    const { t } = useTranslation(['common']);
    const [memberData, setMemberData] = useState()
    const [question, setQuestion] = useState({ id: 0 });

    useEffect(() => {
        setMemberData(userService.memberValue);
        getCurrentQuestion(memberData._id);
    }, []);

    const getCurrentQuestion = async () => {
        const currentQuestion = await userService.getCurrentQuestion(memberData._id);
        setQuestion(currentQuestion);
    };

    const startQuiz = async () => {
        const nextQuestion = await userService.getNextQuestion(memberData._id);
        setQuestion(nextQuestion);
    };

    const handleClickOption = (option) => {
        console.log(option);
    };

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="max-w-screen-sm mx-auto flex items-center flex-col">
                    <div className="text-2xl font-bold">Quiz</div>
                    {question.id === 0 && (
                        <>
                            <div className="flex items-center text-sm justify-left m-2 px-6 py-2 border border-stone-500 bg-stone-200 rounded-lg">
                                {t('quiz-intro')}
                            </div>
                            <button className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                    shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                    focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mb-3"
                                onClick={startQuiz}>
                                {t('start-quiz')}
                            </button>
                        </>
                    )}
                    {question.id > 0 && (
                        <>
                            <div className="text-xl font-bold">Question {question.id}</div>
                            <div>{question.questionText}</div>
                            <div>
                                {['a', 'b', 'c', 'd'].map((option) => (
                                    <button
                                        key={option}
                                        className="btn btn-secondary m-2"
                                        onClick={() => handleClickOption(option)}
                                    >
                                        {question[`option${option.toUpperCase()}`]}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                    {question.id < 0 && <div className="text-xl font-bold">Quiz is over</div>}
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
