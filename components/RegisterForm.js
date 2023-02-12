import { useTranslation } from 'next-i18next'
import { useState } from "react";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


export const RegisterForm = ({ member, ...rest }) => {

    const { t } = useTranslation('common')

    const [showForm, setShowForm] = useState(false)

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Group name is required'),
        password: Yup.string().required('Access code is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);

    function onSubmit({ dietaryRestrictions, attendanceStatus, dietaryInfo, songRequest }) {
        console.log("HI")
        return userService.updateUser( member, dietaryRestrictions, attendanceStatus, dietaryInfo, songRequest)
            .catch(alertService.error);
    }

    return (
        <div className="bg-stone-100 border border-green-900 hover:bg-stone-200 font-semibold text-block py-2 px-4 rounded flex flex-col">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p>{member.firstName} {member.lastName}</p>
                    <p className={member.registrationStatus == "Registered" ? "text-green-900 text-xs italic" : "text-red-600 text-xs italic"}>{member.registrationStatus == "Registered" ? t('registered') : t('not-registered')}</p>
                </div>
                <form>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" onClick={() => setShowForm(!showForm)} />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                    </label>
                </form>
            </div>
            
            {showForm ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-2">
                        <div className="pt-2">
                            <label htmlFor="attendanceStatus" className="block mb-2 text-sm font-medium text-stone-900 ">{t('will-you-join-us')}</label>
                            <select id="attendanceStatus" className="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5">
                                <option defaultValue>{t('select-option')}</option>
                                <option value="Attending">{t('participate')}</option>
                                <option value="Not Attending">{t('not-participate')}</option>
                                <option value="Unknown">{t('unkown')}</option>
                            </select>
                        </div>
                        <div className="pt-4">
                            <label htmlFor="dietaryRestrictions" className="block mb-2 text-sm font-medium text-stone-900 ">{t('dietary-restrictions')}</label>
                            <select id="dietaryRestrictions" className="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5">
                                <option defaultValue>{t('select-option')}</option>
                                <option value="None">{t('none')}</option>
                                <option value="Vegetarian">{t('vegetarian')}</option>
                                <option value="Vegan">{t('vegan')}</option>
                            </select>
                        </div>
                        <div className="pt-4">
                            <label htmlFor="dietaryInfo" className="block mb-2 text-sm font-medium text-stone-900 ">{t('allergies')}</label>
                            <input type="text" id="dietaryInfo" className="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5" placeholder={t('leave-blank')} />
                        </div>
                        <div className="pt-4">
                            <label htmlFor="songRequest" className="block mb-2 text-sm font-medium text-stone-900 ">{t('song-request-text')}</label>
                            <input type="text" id="songRequest" className="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5" placeholder={t('song-request-placeholder')} />
                        </div>
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={formState.isSubmitting}
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                className="text-center inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded 
                                                                    shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none 
                                                                    focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            >
                                {t('save')}
                            </button>
                        </div>
                    </div>
                </form>
            ):
                 null
                
            }
        </div>
    )
}
