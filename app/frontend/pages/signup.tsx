import Head from 'next/head'
import React from 'react';
import styles from '../styles/Home.module.css';
import { createUser } from '../utils/firebase';

/** 登録処理 */
const handleSubmit = async (event: any) => {
  event.preventDefault();
  const { email, password } = event.target.elements;
  // FireBaseへユーザ登録
  const user = await createUser(String(email.value), String(password.value));
  console.log(user);
};

/** ユーザ登録 */
const SignUp = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>FireBase認証</title>
      </Head>
      <main className={styles.main}>
        <h2>ユーザ登録</h2>
        <form onSubmit={handleSubmit}>
          <p>
            <input type="email" name="email" placeholder="メールアドレスを入力してください" />
          </p>
          <p>
            <input type="password" name="password" placeholder="パスワードを入力してください" />
          </p>
          <p>
            <button type="submit">登録</button>
          </p>
        </form>
      </main>
    </div>
  );
}

export default SignUp;