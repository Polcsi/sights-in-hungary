import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import React, { ReactElement, createContext, useContext } from "react";
import app from "../../firebase";

type ProviderParams = {
    children?: ReactElement[] | ReactElement | undefined;
};

type AuthContextType = {};

const useContextFunc = ({}: AuthContextType) => {
    const auth = getAuth(app);

    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    });

    return { currentUser, isLoading };
};

type UseAuthContextType = ReturnType<typeof useContextFunc>;

const initContextState: UseAuthContextType = {
    currentUser: null,
    isLoading: true,
};

const AuthContext = createContext<UseAuthContextType>(initContextState);

const AuthContextProvider = ({ children }: ProviderParams & AuthContextType) => {
    return <AuthContext.Provider value={useContextFunc({})}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthContextProvider };
