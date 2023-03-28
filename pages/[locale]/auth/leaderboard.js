import Link from '../../../components/Link';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useState, useEffect } from "react";
import { userService } from '../../../services/user.service';

const Leaderboard = () => {
    const { t } = useTranslation(['common']);
    const [players, setPlayers] = useState([])
    const [member, setMember] = useState(null)

    useEffect(() => {
        userService.getLeaderboard().then(res =>
        {
            setPlayers(res)
            console.log(res)
        })
    }, [])

    useEffect(() => {
        if (!member) {
            setMember(() => userService.memberValue)
        }
        }, []);

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="max-w-screen-sm mx-auto flex items-center flex-col my-3">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("rank")}
                                </th>
                                <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("name")}
                                </th>
                                <th className="px-3 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("score")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {players.map((player, index) => {
                                let bgColor;
                                if (index === 0) {
                                    bgColor = 'bg-yellow-500';
                                } else if (index === 1) {
                                    bgColor = 'bg-neutral-400';
                                } else if (index === 2) {
                                    bgColor = 'bg-amber-700';
                                } else {
                                    bgColor = 'bg-white';
                                }

                                return (
                                    <tr key={index} className={bgColor}>
                                        <td className={`px-3 py-3 whitespace-nowrap text-sm text-center ${member !== null && player.firstName === member.firstName && player.lastName === member.lastName ? 'font-bold' : 'text-gray-500'}`}>
                                            {index + 1}
                                        </td>
                                        <td className={`px-3 py-3 whitespace-nowrap text-sm text-center ${member !== null && player.firstName === member.firstName && player.lastName === member.lastName ? 'font-bold' : 'text-gray-500'}`}>
                                            {player.firstName} {player.lastName.charAt(0)}.
                                        </td>
                                        <td className={`px-3 py-3 whitespace-nowrap text-sm text-center ${member !== null && player.firstName === member.firstName && player.lastName === member.lastName ? 'font-bold' : 'text-gray-500'}`}>
                                            {player.score}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            </main>

            <Footer />
        </>
    );
};


export default Leaderboard;

export { getStaticPaths };
export const getStaticProps = async (ctx) => {
    return {
        props: {
            ...(await getI18nProps(ctx, ['common', 'footer'])),
        },
    };
};
