import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ILessonFields } from "../src/@types/contentful";
import ContentService from "../src/@types/util/content-service";
import styles from "../styles/Home.module.css";

// The props for our page component
interface Props {
  lessons: ILessonFields[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const lessons = (
    await ContentService.instance.getEntriesByType<ILessonFields>("lesson")
  ).map((entry) => entry.fields);

  return {
    props: {
      lessons,
    },
  };
};

const Home: NextPage<Props> = ({ lessons }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="A site for my caravan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>The Willerby in the Woods</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          {lessons.map((lesson) => {
            console.log(lesson);
            return (
              <a
                key={lesson.slug}
                href={`./lessons/${lesson.slug}`}
                className={styles.card}
              >
                <h2>{lesson.title}</h2>
              </a>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
