import React from 'react';

export const GroupTable = ({ groups }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Group Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Members
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registered
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attending
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Brunch
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Camping
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cart Total
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {groups.map(group => {
                    const registeredMembers = group.users.filter(user => user.registrationStatus === "Registered").length;
                    const attendingMembers = group.users.filter(user => user.attendanceStatus === "Attending").length;
                    const brunchMembers = group.users.filter(user => user.brunch === true).length;
                    const campingMembers = group.users.filter(user => user.camping === true).length;
                    const cartTotal = group.paid ? group.cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;

                    return (
                        <tr key={group.name}>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{group.name}</td>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{group.users.length}</td>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{registeredMembers}</td>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{attendingMembers}</td>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{brunchMembers}</td>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>{campingMembers}</td>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${group.superGroup ? 'font-bold' : ''}`}>CHF {cartTotal.toFixed(2)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
