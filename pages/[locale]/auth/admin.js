import { useState, useEffect } from 'react';
import { getStaticPaths, getI18nProps } from '../../../lib/getStatic';

import { Header } from '../../../components/Header';
import { GroupTable } from '../../../components/GroupTable';
import { UserTable } from '../../../components/UserTable';
import { WishesTable } from '../../../components/WishesTable';
import { QuestionsTable } from '../../../components/QuestionsTable';
import { userService } from '../../../services/user.service';
import { KPICard } from '../../../components/KPICard';
import { Footer } from '../../../components/Footer'

const AdminPanel = () => {
    const [activeTable, setActiveTable] = useState('users');
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [wishes, setWishes] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = () => {
        userService
            .getAllGroups()
            .then((data) => {
                setGroups(data);
            })
            .catch((error) => {
                console.error('Error fetching groups:', error);
            });

        userService
            .getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });

        userService
            .getAllWishes()
            .then((data) => {
                setWishes(data.wishes);
            })
            .catch((error) => {
                console.error('Error fetching wishes:', error);
            });

        userService
            .getAllQuestions()
            .then((data) => {
                setQuestions(data);
            })
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    };

    useEffect(() => {
        fetchData(); // Fetch data on initial load

        const intervalId = setInterval(() => {
            fetchData(); // Refresh data every 3 seconds
        }, 10000);

        return () => {
            clearInterval(intervalId); // Clear interval when the component is unmounted
        };
    }, []);

    const registeredUsers = users.filter(
        (user) => user.registrationStatus === 'Registered'
    ).length;

    const attendingUsers = users.filter(
        (user) => user.attendanceStatus === 'Attending'
    ).length;

    const brunchUsers = users.filter((user) => user.brunch).length;

    const campingUsers = users.filter((user) => user.camping).length;

    const handleClick = (table) => {
        setActiveTable(table);
    };

    const handleKPICardClick = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        const userGroup = groups.find(group => {
            return group._id === user.groupId;
        });
        const groupName = userGroup ? userGroup.name.toLowerCase() : '';

        const searchTermLowerCase = searchTerm.toLowerCase();

        if (searchTermLowerCase === 'admin') {
            return userGroup && userGroup.superGroup;
        }

        if (searchTerm.toLowerCase() === 'registered') {
            return user.registrationStatus === 'Registered';
        }

        if (searchTerm.toLowerCase() === 'attending') {
            return user.attendanceStatus === 'Attending';
        }

        if (searchTerm.toLowerCase() === 'brunch') {
            return user.brunch;
        }

        if (searchTerm.toLowerCase() === 'camping') {
            return user.camping;
        }

        if (searchTerm.toLowerCase() === 'vegan') {
            return user.dietaryRestrictions === 'Vegan';
        }

        if (searchTerm.toLowerCase() === 'vegetarian') {
            return user.dietaryRestrictions === 'Vegetarian';
        }

        if (searchTerm.toLowerCase() === 'none') {
            return user.dietaryRestrictions === 'None';
        }

        return (
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.songRequest && user.songRequest.toLowerCase().includes(searchTerm.toLowerCase())) ||
            groupName.includes(searchTerm.toLowerCase())
        );
    });


    const filteredGroups = groups.filter(group => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const groupNameLowerCase = group.name.toLowerCase();

        if (searchTermLowerCase === 'admin') {
            return group.superGroup;
        }

        return groupNameLowerCase.includes(searchTermLowerCase) || group.users.some(user => {
            const fullName = `${user.firstName} ${user.lastName}`;

            if (searchTermLowerCase === 'registered') {
                return user.registrationStatus === 'Registered';
            }

            if (searchTermLowerCase === 'attending') {
                return user.attendanceStatus === 'Attending';
            }

            if (searchTermLowerCase === 'brunch') {
                return user.brunch;
            }

            if (searchTermLowerCase === 'camping') {
                return user.camping;
            }

            return fullName.toLowerCase().includes(searchTermLowerCase);
        });
    });

    const filteredWishes = wishes.filter(wish => {
        const wishTextLowerCase = wish.title.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();

        return wishTextLowerCase.includes(searchTermLowerCase);
    });

    const totalMoneyMade = groups.reduce((acc, group) => {
        if (group.paid) {
            return acc + group.cart.reduce((groupTotal, item) => groupTotal + item.price * item.quantity, 0);
        }
        return acc;
    }, 0);

    const totalItemsSold = groups.reduce((acc, group) => {
        if (group.paid) {
            return acc + group.cart.reduce((groupTotal, item) => groupTotal + item.quantity, 0);
        }
        return acc;
    }, 0);
    const totalItemsLeft = wishes.reduce((acc, wish) => acc + wish.quantity, 0);
    const totalItems = wishes.reduce((acc, wish) => acc + wish.totalQuantity, 0);
    const progressPercentage = totalItems > 0 ? ((totalItemsSold / totalItems) * 100).toFixed(2) : 0;
    const groupsWithPurchase = groups.filter((group) => group.cart && group.cart.length > 0 && group.paid).length;
    const groupsWithReserved = groups.filter((group) => group.cart && group.cart.length > 0 && !group.paid).length;
    const totalGroupPurchases = groups.reduce((total, group) => {
        return group.paid ? total + group.cart.reduce((groupTotal, item) => groupTotal + item.price * item.quantity, 0) : total;
    }, 0);
    const averagePurchasePerGroup = groupsWithPurchase > 0 ? (totalGroupPurchases / groupsWithPurchase).toFixed(2) : 0;
    const totalItemsReserved = groups.reduce((acc, group) => {
        if (!group.paid) {
            return acc + group.cart.reduce((groupTotal, item) => groupTotal + item.quantity, 0);
        }
        return acc;
    }, 0);


    return (
        <>
            <Header title="Admin Panel" />
            <main className="relative min-h-screen">
                <div className="container mx-auto h-full">
                    <div className="m-4 text-center h-full">
                        {activeTable !== 'wishes' && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 md:gap-4">
                                <KPICard title="Guests" count={users.length} onClick={() => handleKPICardClick('')} />
                                <KPICard title="Registered" count={registeredUsers} onClick={() => handleKPICardClick('registered')} />
                                <KPICard title="Attending" count={attendingUsers} onClick={() => handleKPICardClick('attending')} />
                                <KPICard title="Brunch" count={brunchUsers} onClick={() => handleKPICardClick('brunch')} />
                                <KPICard title="Camping" count={campingUsers} onClick={() => handleKPICardClick('camping')} />
                            </div>
                        )}
                        {activeTable === 'wishes' && (
                            <>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 md:gap-4">
                                    <KPICard title="Total Gift Offered" count={`CHF ${totalMoneyMade}`} />
                                    <KPICard title="Total Items Offered" count={totalItemsSold} />
                                    <KPICard title="Total Items Left" count={totalItemsLeft} />
                                    <KPICard title="Groups with Purchase" count={groupsWithPurchase} />
                                    <KPICard title="Groups with Pending Order" count={groupsWithReserved} />
                                </div>
                                <div className="relative h-2 w-full bg-gray-200 mt-3 rounded">
                                    <div
                                        className="absolute h-full bg-green-600 rounded"
                                        style={{ width: `${progressPercentage}%` }}
                                    ></div>
                                    <div
                                        className="absolute h-full bg-green-200 rounded"
                                        style={{ width: `${(totalItemsReserved / totalItems) * 100}%`, left: `${progressPercentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-700 mt-1">
                                    <span>Sold Items: {totalItemsSold}</span>
                                    <span className="mx-auto">Reserved Items: {totalItemsReserved}</span>
                                    <span>Total Items: {totalItems}</span>
                                </div>
                            </>
                        )}

                        <div className="mt-6 md:flex md:items-center md:justify-between">
                            <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                                <button className={`px-5 py-2 text-xs font-medium ${activeTable === 'users' ? 'text-gray-600 bg-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'} transition-colors duration-200 sm:text-sm`} onClick={() => handleClick('users')}>
                                    Users
                                </button>
                                <button className={`px-5 py-2 text-xs font-medium ${activeTable === 'groups' ? 'text-gray-600 bg-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'} transition-colors duration-200 sm:text-sm`} onClick={() => handleClick('groups')}>
                                    Groups
                                </button>
                                <button className={`px-5 py-2 text-xs font-medium ${activeTable === 'wishes' ? 'text-gray-600 bg-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'} transition-colors duration-200 sm:text-sm`} onClick={() => handleClick('wishes')}>
                                    Wishes
                                </button>
                                <button className={`px-5 py-2 text-xs font-medium ${activeTable === 'questions' ? 'text-gray-600 bg-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'} transition-colors duration-200 sm:text-sm`} onClick={() => handleClick('questions')}>
                                    Questions
                                </button>
                            </div>
                            <div className="relative flex items-center mt-4 md:mt-0">
                                <span className="absolute">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </span>
                                <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex flex-col mt-6">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    
                                    {activeTable === 'groups' ? (
                                        <GroupTable groups={filteredGroups} />
                                    ) : activeTable === 'users' ? (
                                        <UserTable users={filteredUsers} groups={groups} />
                                    ) : activeTable === 'questions' ? (
                                        <QuestionsTable questions={questions} />
                                    ) : (
                                        <WishesTable wishes={filteredWishes} groups={groups} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );

};

export default AdminPanel;

export { getStaticPaths };
export const getStaticProps = async (ctx) => {
    return {
        props: {
            ...(await getI18nProps(ctx, ['common', 'footer'])),
        },
    };
};
