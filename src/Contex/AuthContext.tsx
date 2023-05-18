import { createContext } from "react";
const AuthContext = createContext<boolean>(false);
export const UserContext = createContext<{fullName:string}>({fullName:''});
export default AuthContext;
