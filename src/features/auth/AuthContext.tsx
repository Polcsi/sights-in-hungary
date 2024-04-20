import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import React, { ReactElement, createContext, useContext } from "react";
import app from "../../firebase";

type ProviderParams = {
    children?: ReactElement[] | ReactElement | undefined;
};

const useContextFunc = () => {
    const auth = getAuth(app);

    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("%c USER CHANGED", "color: red;", user);
            setCurrentUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    });

    return { currentUser, setCurrentUser, isLoading };
};

type UseAuthContextType = ReturnType<typeof useContextFunc>;

const initContextState: UseAuthContextType = {
    currentUser: null,
    setCurrentUser: () => {},
    isLoading: true,
};

const AuthContext = createContext<UseAuthContextType>(initContextState);

const AuthContextProvider = ({ children }: ProviderParams) => {
    return <AuthContext.Provider value={useContextFunc()}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthContextProvider };
