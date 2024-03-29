import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css';
import { useAuthContext } from '../components/AuthContext';
import Login from '../components/Login';
import { googleLogin, logout } from '../utils/firebase';
import { get, getAuth, getNotices, getShop } from '../utils/api';

/** FireBase認証 */
const Home = () => {
  const { user } = useAuthContext();
  if (!user) {
    return <Login />;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>FireBase認証</title>
      </Head>
      <main className={styles.main}>
        {user && (<div>{`${user.email}でログインしています。`}</div>)}
        <p>
          <button type="button" onClick={async () => await googleLogin()}>Googleアカウントと紐付け</button>
        </p>
        <p>
          <button type="button" onClick={async () => await get()}>API実行(認証なし)</button>
        </p>
        <p>
          <button type="button" onClick={async () => await getShop(await user.getIdToken())}>ショップ情報取得(APIGatewayお試し)</button>
        </p>
        <p>
          <button type="button" onClick={async () => await getNotices(await user.getIdToken())}>お知らせ情報取得(APIGatewayお試し)</button>
        </p>
        <p>
          <button onClick={() => logout()}>ログアウト</button>
        </p>
      </main>
    </div>
  );
}

export default Home;