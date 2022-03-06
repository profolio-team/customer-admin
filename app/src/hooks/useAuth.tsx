import { signOut } from "firebase/auth";
import { Context, createContext, ReactNode, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { AuthPage } from "../views/Auth/AuthPage";

interface UserInfo {
  email: string;
}

interface AuthContext {
  loading: boolean;
  userInfo: UserInfo;
  isAuthorized: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  loading: true,
  isAuthorized: false,
  userInfo: {
    email: "",
  },
  signInWithGoogle: async () => void 0,
  logout: async () => void 0,
});

function useProvideAuth(): AuthContext {
  const [user, loading, errorAuth] = useAuthState(auth);

  const isAuthorized = !!user?.uid && !errorAuth;
  const userInfo = {
    email: user?.email || "",
  };

  const signInWithGoogle = async (): Promise<void> => {
    // return authorization.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };
  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  return { isAuthorized, userInfo, loading, signInWithGoogle, logout };
}

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useProvideAuth();

  const spinner = (
    <div>
      <h3>Loading...</h3>
    </div>
  );
  const loginPage = <AuthPage />;

  let componentForShow = props.children;
  if (auth.loading) {
    componentForShow = spinner;
  } else if (!auth.isAuthorized) {
    componentForShow = loginPage;
  }

  return <authContext.Provider value={auth}>{componentForShow}</authContext.Provider>;
}

export const useAuth = (): AuthContext => useContext(authContext);
