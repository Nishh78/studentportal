import React, { useState, useContext } from 'react';
import {
    CircularProgress
} from "@mui/material";
const LoaderContext = React.createContext({
    loading: false,
    setLoading: null,
});

const Loaderstyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter : 'blur(2px)',
    zIndex: 100
}
const Loading = () => <div style={Loaderstyle}><CircularProgress /></div> ;

export function LoaderProvider(props) {

    const [loading, setLoading] = useState(false);
    const value = { loading, setLoading };
    if (loading) {
        window.scroll(0, 0);
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'scroll';
    }

    return (
        <LoaderContext.Provider value={value}>
            {loading && <Loading />}
            {props.children}
        </LoaderContext.Provider>
    );

}

export const useLoader = () => useContext(LoaderContext);