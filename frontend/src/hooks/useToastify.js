import React, { useState } from 'react';
import SnackComponent from 'src/components/SnackComponent';

const ToastifyContext = React.createContext();

export function ToastifyProvider({ children }) {

    const initialState = {
        open: false,
        message: '',
        severity: ''
    }

    const [alert, setAlert] = useState(initialState)
    const showAlert = (alert) => setAlert(alert);
    const hideAlert = () => setAlert(initialState);
    const value = React.useMemo(
        () => ({ alert, showAlert, hideAlert }),
        [alert, showAlert, hideAlert]
    );

    return (
        <ToastifyContext.Provider value={value}>
            {children}
            <SnackComponent {...value} />
        </ToastifyContext.Provider>
    );
}

export const useToastify = () => React.useContext(ToastifyContext);