import { signOut } from "firebase/auth";
import { Context, createContext, ReactNode, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { AuthPage } from "../views/Auth/AuthPage";
import { User } from "firebase/auth";

interface AuthContext {
  loading: boolean;
  uid: string;
  userInfo: {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
  };
  isAuthorized: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}
const defaultAvatar = "";
const authContext: Context<AuthContext> = createContext<AuthContext>({
  loading: true,
  uid: "",
  isAuthorized: false,
  userInfo: {
    uid: "",
    phoneNumber: "",
    providerId: "",
    email: "",
    photoURL: defaultAvatar,
    displayName: "",
  },
  user: null,
  signInWithGoogle: async () => void 0,
  logout: async () => void 0,
});

function useProvideAuth(): AuthContext {
  const [user, loading, errorAuth] = useAuthState(auth);

  const isAuthorized = !!user?.uid && !errorAuth;
  const userInfo = {
    email: user?.email || "",
    photoURL: user?.photoURL || defaultAvatar,
    displayName: user?.displayName || "User",
    uid: user?.uid || "",
    phoneNumber: user?.phoneNumber || "",
    providerId: user?.providerId || "",
  };

  const signInWithGoogle = async (): Promise<void> => {
    // return authorization.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };
  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return {
    isAuthorized,
    userInfo,
    uid: user?.uid || "",
    loading,
    signInWithGoogle,
    logout,
    user: user || null,
  };
}

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useProvideAuth();

  let componentForShow = props.children;
  if (!auth.loading && !auth.isAuthorized) {
    componentForShow = <AuthPage />;
  }

  return <authContext.Provider value={auth}>{componentForShow}</authContext.Provider>;
}

export const useAuth = (): AuthContext => useContext(authContext);
