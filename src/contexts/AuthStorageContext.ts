import { createContext } from "react";
import AuthStorage from "../utils/authStorage";

const AuthStorageContext = createContext<AuthStorage | undefined>(undefined);

export default AuthStorageContext;
