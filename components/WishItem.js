import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const WishItem = ({ wish }) => {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(0);

    const formik = useFormik({
        initialValues: {
            quantity: 0
        },
        validationSchema: Yup.object({
            quantity: Yup.number()
                .min(0, 'Quantity must be at least 0')
                .max(wish.quantity, 'Quantity must not be more than available quantity')
                .required('Quantity is required')
        }),
        onSubmit: values => {
            // Handle submission
            console.log('Submitted:', values);
        }
    });

    const increaseQuantity = () => {
        if (quantity < wish.quantity) {
            setQuantity(quantity + 1);
            formik.setFieldValue('quantity', quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            formik.setFieldValue('quantity', quantity - 1);
        }
    };

    return (
        <div className="bg-stone-100 border border-green-900 hover:bg-stone-200 text-block py-2 px-4 rounded flex flex-col">
            <div className="flex justify-between items-start">
                <div className="mr-5">
                    <h3 className="text-lg font-semibold">{t(wish.title)}</h3>
                    <p className="font-light">{t(wish.description)}</p>
                </div>

                <div className="flex flex-col items-end">
                    <div className="flex items-center">
                        <button type="button" onClick={decreaseQuantity} className="bg-stone-600 text-white w-8 h-8 rounded">-</button>
                        <input
                            className="mx-2 w-16 text-center border border-gray-300 rounded h-8"
                            type="number"
                            min="0"
                            max={wish.quantity}
                            {...formik.getFieldProps('quantity')}
                        />
                        <button type="button" onClick={increaseQuantity} className="bg-stone-600 text-white w-8 h-8 rounded">+</button>
                    </div>
                    <p className="italic whitespace-nowrap">Quantity remaining: {wish.quantity}</p>
                    <p className="italic">Price: {wish.price}</p>
                </div>
            </div>
            <img src={wish.pictureUrl} alt={wish.title} className="max-h-32 h-auto w-full object-contain mt-2" />
            <form onSubmit={formik.handleSubmit} className="mt-2">
                {formik.touched.quantity && formik.errors.quantity ? <div className="text-red-500">{formik.errors.quantity}</div> : null}
                {quantity > 0 && (
                    <button
                        type="submit"
                        className="text-center inline-block my-4 px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md bg-green-900 hover:bg-stone-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                    >
                        {t("add-to-cart")}
                    </button>
                )}

            </form>
        </div>
    );
};

export default WishItem;
