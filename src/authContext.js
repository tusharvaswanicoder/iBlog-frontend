import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);
export const AuthTokenDispatchContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(
        localStorage.getItem("authToken")
    );
    useEffect(() => {
        if (!loading) {
            if (userDetails) {
                if (
                    pathname === "/" ||
                    pathname === "/login" ||
                    pathname === "/signup"
                )
                    navigate("/dashboard/");
            } else {
                if (pathname.startsWith("/dashboard")) navigate("/");
            }
        }
    }, [loading, userDetails, pathname, navigate]);
    useEffect(() => {
        if (!authToken) {
            localStorage.removeItem("authToken");
            setUserDetails(null);
            setLoading(false);
            return;
        }
        localStorage.setItem("authToken", authToken);
        const getUserDetails = async () => {
            setLoading(true);
            const resp = await fetch(
                `${process.env.REACT_APP_API_URL}users/userinfo`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (resp.status === 401) {
                setAuthToken(null);
                return;
            }
            const data = await resp.json();
            setUserDetails(data);
            setLoading(false);
        };
        getUserDetails();
    }, [authToken]);
    return (
        <AuthContext.Provider value={[userDetails, loading]}>
            <AuthTokenDispatchContext.Provider value={setAuthToken}>
                {children}
            </AuthTokenDispatchContext.Provider>
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
