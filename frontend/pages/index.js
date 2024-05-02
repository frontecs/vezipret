import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Topbar from "@/components/Topbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>vezipret</title>
        <meta
          name="description"
          content="Vezi istoricul preturilor produselor tale favorite!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />
      <div className={styles.container}>
        <h1 className={styles.title}>
          Instalează <Link href="/browser-extension">extensia</Link> pentru a
          vedea istoricul prețurilor produselor tale favorite!
        </h1>
      </div>
    </>
  );
}
