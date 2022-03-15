import { signOut } from "firebase/auth";
import { Context, createContext, ReactNode, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { AuthPage } from "../views/Auth/AuthPage";

interface AuthContext {
  loading: boolean;
  uid?: string;
  userInfo: {
    email: string;
    photoURL: string;
    displayName: string;
  };
  isAuthorized: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}
const defaultAvatar = "";
const authContext: Context<AuthContext> = createContext<AuthContext>({
  loading: true,
  isAuthorized: false,
  userInfo: {
    email: "",
    photoURL: defaultAvatar,
    displayName: "",
  },
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
  };

  const signInWithGoogle = async (): Promise<void> => {
    // return authorization.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };
  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return { isAuthorized, userInfo, uid: user?.uid, loading, signInWithGoogle, logout };
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
