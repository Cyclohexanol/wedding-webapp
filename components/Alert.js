// components/Alert.js
import React from 'react';
import { alertService } from '../services/alert.service';

export const Alert = () => {
    const [alerts, setAlerts] = React.useState([]);

    React.useEffect(() => {
        const subscription = alertService.onAlert()
            .subscribe(alert => {
                if (!alert.message) {
                    setAlerts(alerts => alerts.filter(x => x.id === alert.id));
                    return;
                }
                setAlerts(alerts => [...alerts, alert]);
            });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="fixed top-0 right-0 z-50">
            {alerts.map((alert, index) => (
                <div key={index} className={`alert alert-${alert.type} p-4 mb-4 rounded`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <strong>{alert.type}: </strong>
                            <span>{alert.message}</span>
                        </div>
                        <button
                            className="text-black"
                            onClick={() => {
                                setAlerts(alerts => alerts.filter(x => x !== alert));
                                alertService.clear(alert.id);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
