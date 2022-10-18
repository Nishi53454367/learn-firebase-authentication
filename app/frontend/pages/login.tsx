import Head from 'next/head'
import Link from 'next/link';
import React from 'react';
import styles from '../styles/Home.module.css';
import { login } from '../utils/firebase';

/** ログイン処理 */
const handleSubmit = async (event: any) => {
  event.preventDefault();
  const { email, password } = event.target.elements;
  // FireBaseへログイン
  const user = await login(String(email.value), String(password.value));
  console.log(user);
};

/** ログイン */
const Login = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>FireBase認証</title>
      </Head>
      <main className={styles.main}>
        <h2>ログイン</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <input type="email" name="email" placeholder="メールアドレスを入力してください" />
          </p>
          <p>
            <input type="password" name="password" placeholder="パスワードを入力してください" />
          </p>
          <p>
            <button type="submit">ログイン</button>
          </p>
        </form>
        <Link href="/signup">
          <a>ユーザ登録はこちら</a>
        </Link>
      </main>
    </div>
  );
}

export default Login;