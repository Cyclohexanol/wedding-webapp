import { useTranslation } from 'next-i18next'
import { useState } from "react";

export const RegisterForm = ({ member, ...rest }) => {

    const { t } = useTranslation('common')

    const [showForm, setShowForm] = useState(false)



    return (
        <div
            className="bg-stone-100 border border-green-900 hover:bg-stone-200 font-semibold text-block py-2 px-4 rounded
                    flex flex-col"
        >   <div className="flex justify-between">
                <div className="flex flex-col">
                    <p>{member.firstName} {member.lastName}</p>
                    <p className="text-xs italic">{member.registered ? t('registered') : t('not-registered')}</p>
                </div>
                <form>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" onClick={() => setShowForm(!showForm)} />
                        <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-700"></div>
                    </label>
                </form>
            </div>
            
            {showForm ? (
                <div className="py-2">
                    <div className="pt-2">
                        <label for="answer" class="block mb-2 text-sm font-medium text-stone-900 ">{t('will-you-join-us')}</label>
                        <select id="answer" class="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5">
                            <option selected>{t('select-option')}</option>
                            <option value="participate">{t('participate')}</option>
                            <option value="not-participate">{t('not-participate')}</option>
                            <option value="unkown">{t('unkown')}</option>
                        </select>
                    </div>
                    <div className="pt-4">
                        <label for="diet" class="block mb-2 text-sm font-medium text-stone-900 ">{t('dietary-restrictions')}</label>
                        <select id="diet" class="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5">
                            <option selected>{t('select-option')}</option>
                            <option value="participate">{t('none')}</option>
                            <option value="not-participate">{t('vegetarian')}</option>
                            <option value="unkown">{t('vegan')}</option>
                        </select>
                    </div>
                    <div className="pt-4">
                        <label for="allergies" class="block mb-2 text-sm font-medium text-stone-900 ">{t('allergies')}</label>
                        <input type="text" id="allergies" class="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5" placeholder={t('leave-blank')} />
                    </div>
                    <div className="pt-4">
                        <label for="song-request" class="block mb-2 text-sm font-medium text-stone-900 ">{t('song-request-text')}</label>
                        <input type="song-request" id="allergies" class="bg-stone-50 border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-green-900 focus:border-green-900 block w-full p-2.5" placeholder={t('song-request-placeholder')} />
                    </div>
                </div>
            ):
                 null
                
            }
        </div>
    )
}
