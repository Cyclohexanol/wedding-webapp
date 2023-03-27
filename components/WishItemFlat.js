import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const WishItem = ({ wish, selectedWish, updateCart }) => {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        formik.setFieldValue('quantity', selectedWish ? selectedWish.quantity : 0);
        selectedWish ? setQuantity(selectedWish.quantity) : null;
    }, [selectedWish])

    const formik = useFormik({
        initialValues: {
            quantity: 0,
        },
        validationSchema: Yup.object({
            quantity: Yup.number()
                .min(0, 'Quantity must be at least 0')
                // .max(wish.quantity, 'Quantity must not be more than available quantity')
                .required('Quantity is required')
        }),
        onSubmit: (values) => {
            updateCart({
                _id: wish._id,
                title: wish.title,
                price: wish.price,
                quantity: parseInt(values.quantity),
            });
        },

    });

    const increaseQuantity = () => {
        if (
            selectedWish
                ? quantity < wish.quantity + selectedWish.quantity
                : quantity < wish.quantity
        ) {
            setQuantity(quantity + 1);
            formik.setFieldValue('quantity', quantity + 1);
            updateCart({
                _id: wish._id,
                title: wish.title,
                price: wish.price,
                quantity: quantity + 1,
            });
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            formik.setFieldValue('quantity', quantity - 1);
            updateCart({
                _id: wish._id,
                title: wish.title,
                price: wish.price,
                quantity: quantity - 1,
            });
        }
    };

    return (
        <div className="py-2 px-4 bg-white bg-opacity-50 rounded flex">
            <div className="flex-none mr-4">
                <img
                    src={wish.pictureUrl}
                    alt={t(wish.title)}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md bg-stone-200"
                />
            </div>
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h2 className="text-sm font-semibold">{t(wish.title)}</h2>
                    <p className="text-xs text-gray-600 mb-2">{t(wish.description)}</p>
                </div>
                <div className="flex justify-between items-end">
                    <div>CHF {wish.price}</div>
                    <div className="flex flex-col items-end">
                        {selectedWish &&
                            selectedWish.quantity !== 0 &&
                            wish.quantity === 0 ? (
                            <span className="border border-stone-300 text-xs px-2 py-1 mb-1 rounded">
                                {t('stock-limit')}
                            </span>
                        ) : null}
                        <div className="flex items-center">
                            {wish.quantity === 0 && (!selectedWish || selectedWish.quantity === 0) ? (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                    {t('out-of-stock')}
                                </span>
                            ) : (

                                <div className="flex items-center">
                                    {quantity === 0 ? (
                                        <div className="w-7 h-7"></div>
                                    ) : (
                                        <button
                                            className="bg-stone-200 w-7 h-7 rounded flex items-center justify-center"
                                            onClick={decreaseQuantity}
                                        >
                                            <span>-</span>
                                        </button>
                                    )}
                                    <span className="mx-2 w-8 text-center">
                                        {selectedWish ? selectedWish.quantity : 0}
                                    </span>
                                    {selectedWish &&
                                        selectedWish.quantity !== 0 &&
                                        wish.quantity === 0 ? (
                                        <div className="w-7 h-7"></div>
                                    ) : (
                                        <button
                                            className="bg-stone-200 w-7 h-7 rounded flex items-center justify-center"
                                            onClick={increaseQuantity}
                                        >
                                            <span>+</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );





};

export default WishItem;
