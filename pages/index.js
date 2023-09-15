import React from 'react';
import Link from 'next/link';
import styles from '../styles/SignIn.module.css'; 

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1>Home Page</h1>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="dash/admin/dashboard">Dashboard</Link>
      <Link href="/signin">Sign In</Link>
      <Link href="/signup">Sign Up</Link>
    </div>
  );
}

export default Home;
