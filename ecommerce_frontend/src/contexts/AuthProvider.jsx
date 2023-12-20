import  {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [authenticatedUser,setAuthenticatedUser] = useState({});
    return(
        <AuthContext.Provider value={{authenticatedUser,setAuthenticatedUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
