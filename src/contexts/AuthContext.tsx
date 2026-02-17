import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";

interface User {
  id: string;
  email: string;
  name?: string;
  onboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore session on refresh
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        hydrateUser(data.session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        hydrateUser(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 📦 Load user profile from DB
  const hydrateUser = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        onboarded: data.onboarded,
      });
    }
  };

  // 🔐 LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, []);

  // ✍️ SIGNUP
  const signup = useCallback(
    async (email: string, password: string, name?: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error || !data.user) throw error;

      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        name,
        onboarded: false,
      });
    },
    []
  );

  // 🚪 LOGOUT
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  // ✅ COMPLETE ONBOARDING
  const completeOnboarding = useCallback(async () => {
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ onboarded: true })
      .eq("id", user.id);

    setUser({ ...user, onboarded: true });
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        completeOnboarding,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
