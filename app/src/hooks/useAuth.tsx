import { signOut, User } from "firebase/auth";
import { Context, createContext, ReactNode, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

interface AuthContext {
  loading: boolean;
  uid: string;
  userInfo: {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
  };
  user: User | null;
  isAuthorized: boolean;
  logout: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  loading: true,
  uid: "",
  isAuthorized: false,
  userInfo: {
    phoneNumber: "",
    email: "",
    photoURL: "",
    displayName: "",
  },
  user: null,
  logout: async () => void 0,
});

function useProvideAuth(): AuthContext {
  const [user, loading, errorAuth] = useAuthState(auth);
  const isAuthorized = !!user?.uid && !errorAuth;
  const userInfo = {
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    displayName: user?.displayName || "User",
    uid: user?.uid || "",
    phoneNumber: user?.phoneNumber || "",
    providerId: user?.providerId || "",
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return {
    isAuthorized,
    userInfo,
    uid: user?.uid || "",
    loading,
    logout,
    user: user || null,
  };
}

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useProvideAuth();
  const componentForShow = props.children;

  if (auth.loading) {
    return <></>;
  }

  return <authContext.Provider value={auth}>{componentForShow}</authContext.Provider>;
}

export const useAuth = (): AuthContext => useContext(authContext);
