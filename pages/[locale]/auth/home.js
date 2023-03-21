import { useTranslation } from 'next-i18next'
import {
    getStaticPaths /*, makeStaticProps*/,
    getI18nProps,
} from '../../../lib/getStatic'

import { useEffect, useState } from "react";
import { userService } from "../../../services/user.service";

import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { MenuIcon } from '../../../components/MenuIcon'

import GiftSVG from "../../../public/images/gift-green.svg";
import RegisterSVG from "../../../public/images/clipboard-green.svg";
import InformationSVG from "../../../public/images/info-green.svg";
import QuizzSVG from "../../../public/images/quizz-green.svg";
import BabyPicSVG from "../../../public/images/camera-green.svg";
import ChairSVG from "../../../public/images/chair-green.svg";
import AdminSVG from '../../../public/images/admin-green.svg';

const Home = () => {
    const { t } = useTranslation(["common"]);

    const [unregisteredMembers, setUnregisteredMembers] = useState(0);
    const [isAdminGroup, setIsAdminGroup] = useState(false); 

    useEffect(() => {
        const fetchUnregisteredMembers = async () => {
            const response = await userService.updateSelfInfo();
            const unregisteredCount = response.group.users.filter(
                (member) => member.registrationStatus !== "Registered"
            ).length;
            setUnregisteredMembers(unregisteredCount);
            setIsAdminGroup(response.group.superGroup);
        };
        fetchUnregisteredMembers();
    }, []);

    return (
        <>
            <main>
                <Header title={t('title')} />
                <div className="container mx-auto">
                    <div className="m-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <MenuIcon
                            linkref="/auth/register"
                            notification={unregisteredMembers > 0 ? unregisteredMembers : null}
                        >
                            <RegisterSVG className="w-12 h-12 m-2 hover:stroke-white" />
                            <p>{t('register')}</p>
                        </MenuIcon>
                        <MenuIcon linkref="/auth/gift">
                            <GiftSVG className="w-12 h-12 m-2 hover:stroke-white" />
                            <p>{t('wish-list')}</p>
                        </MenuIcon>
                        <MenuIcon linkref="/auth/info">
                            <InformationSVG className="w-12 h-12 m-2 hover:stroke-white" />
                            <p>{t('useful-info')}</p>
                        </MenuIcon>
                        <MenuIcon linkref="/auth/quizz">
                            <QuizzSVG className="w-12 h-12 m-2 hover:stroke-white" />
                            <p>{t('quizz')}</p>
                        </MenuIcon>
                        <MenuIcon linkref="/auth/pic-collector">
                            <BabyPicSVG className="w-12 h-12 m-2 hover:stroke-white" />
                            <p>{t('baby-pic-collector')}</p>
                        </MenuIcon>
                        <MenuIcon linkref="/auth/seating">
                            <ChairSVG className="w-12 h-12 m-2 hover:stroke-white" />
                            <p>{t('table-seating')}</p>
                        </MenuIcon>
                        {isAdminGroup && (
                            <MenuIcon linkref="/auth/admin">
                                <AdminSVG className="w-12 h-12 m-2 hover:stroke-white" />
                                <p>{t('admin-panel')}</p>
                            </MenuIcon>
                        )}
                        <div className="m-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Home


// const getStaticProps = makeStaticProps(['second-page', 'common', 'footer'])
// export { getStaticPaths, getStaticProps }

// or if you want to merge the i18n props with other props...
export { getStaticPaths }
export const getStaticProps = async ctx => {
    // some data fetched from anywhere...
    //const someOtherData = 'hello world'
    return {
        props: {
            ...(await getI18nProps(ctx, [
                'common',
                'footer',
            ])),
            // someOtherData,
        },
    }
}
