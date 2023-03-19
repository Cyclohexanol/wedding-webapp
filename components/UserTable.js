import React from 'react';
import EditSVG from '../public/images/pencil-edit-button.svg';

export const UserTable = ({ users }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        First Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registration Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Brunch
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Camping
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Diet
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Allergies
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Song Request
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Edit
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => {
                    return (
                        <tr key={user._id}>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">{user.firstName}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">{user.lastName}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                {user.registrationStatus === 'Not registered' ? (
                                    <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                                ) : (
                                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                {user.registrationStatus === 'Not registered' ? <span className="inline-block w-3 h-3 rounded-full border border-gray-500"></span>
 : user.attendanceStatus === 'Unknown' ? (
                                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                                ) : user.attendanceStatus === 'Attending' ? (
                                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>) :
                                    (<span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                                    )}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? <span className="inline-block w-3 h-3 rounded-full border border-gray-500"></span>
 : (user.brunch ? <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> : <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>)}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? <span className="inline-block w-3 h-3 rounded-full border border-gray-500"></span>
 : (user.camping ? <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> : <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>)}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? '' : user.dietaryRestrictions}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? '' : user.dietaryInfo ? user.dietaryInfo : '-'}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">{user.registrationStatus === 'Not registered' ? '' : user.songRequest ? user.songRequest : '-'}</td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                <button
                                    onClick={() => {
                                        console.log(`Edit user with ID: ${user._id}`);
                                    }}
                                    className="focus:outline-none"
                                >
                                    <EditSVG className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>



        </table>
    );
};
