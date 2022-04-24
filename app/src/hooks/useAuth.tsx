import { signOut, User } from "firebase/auth";
import { Context, createContext, ReactNode, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { isExtendedUrl } from "../utils/url.utils";

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
  redirectToSignIn: () => Promise<void>;
  redirectToSignUp: () => Promise<void>;
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
  redirectToSignIn: async () => void 0,
  redirectToSignUp: async () => void 0,
  logout: async () => void 0,
});

function useProvideAuth(): AuthContext {
  const [user, loading, errorAuth] = useAuthState(auth);
  const navigate = useNavigate();
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
    await redirectToSignIn();
  };

  const redirectToSignIn = async (): Promise<void> => {
    await navigate("/sign-in");
  };

  const redirectToSignUp = async (): Promise<void> => {
    await navigate("/sign-up");
  };

  return {
    isAuthorized,
    userInfo,
    uid: user?.uid || "",
    loading,
    redirectToSignIn,
    redirectToSignUp,
    logout,
    user: user || null,
  };
}

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useProvideAuth();
  const location = useLocation();
  const componentForShow = props.children;

  const staticPages = [
    "/contacts",
    "/examples",
    "/redirect",
    "/terms-of-service",
    "/privacy-policy",
  ];
  const authPages = [
    "/sign-in",
    "/sign-up",
    "/reset-password",
    "/confirm-company",
    "/accept-invite",
  ];

  const pathname = location.pathname;
  const isStaticPage = staticPages.find((path) => pathname.startsWith(path));
  const isAuthPage = authPages.find((path) => pathname.startsWith(path));
  const isDesignSystem = pathname.startsWith("/design");

  const needToRedirectToAuthPage = !isAuthPage && !isStaticPage && !isDesignSystem;

  useEffect(() => {
    if (!auth.loading && !auth.isAuthorized && needToRedirectToAuthPage) {
      setTimeout(() => {
        if (isExtendedUrl) {
          auth.redirectToSignIn();
        } else {
          auth.redirectToSignUp();
        }
      }, 0);
    }
  }, [isStaticPage, isAuthPage, auth.isAuthorized, auth.loading]);

  if (auth.loading) {
    return <></>;
  }

  return <authContext.Provider value={auth}>{componentForShow}</authContext.Provider>;
}

export const useAuth = (): AuthContext => useContext(authContext);
