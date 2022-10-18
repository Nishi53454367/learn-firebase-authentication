import { User } from 'firebase/auth';
import Head from 'next/head';
import { createContext, useContext } from 'react';
import { useMe } from '../utils/firebase';

type AuthState = {
  user: User | null;
}

const AuthContext = createContext<AuthState>({ user: null });

/** userコンテキスト */
export function useAuthContext() {
  return useContext(AuthContext);
}

/** 認証用プロバイダー */
export function AuthProvider({ children }: any) {
  const { user, loading } = useMe();
  if (loading) {
    return (
      <div>
        <Head>
          <title>読み込み中</title>
        </Head>
        <main>
          <div>読み込んでいます...</div>
        </main>
      </div>
    )
  };
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}