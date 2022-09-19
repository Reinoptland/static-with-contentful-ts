import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ILessonFields } from "../../src/@types/contentful";
import ContentService from "../../src/@types/util/content-service";
import styles from "../styles/Home.module.css";

interface Props {
  lesson: ILessonFields;
}

const LessonDetails: NextPage<Props> = (props) => {
  // return the page content
  // coming soon
  return (
    <div>
      <h1>{props.lesson.title}</h1>
    </div>
  );
};

export default LessonDetails;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  ctx
) => {
  const { slug } = ctx.params!;
  const lesson = await ContentService.instance.getLessonBySlug(slug);
  console.log(lesson);

  if (!lesson) {
    return { notFound: true };
  }
  return { props: { lesson: lesson.fields } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const lessons = await ContentService.instance.getEntriesByType<ILessonFields>(
    "lesson"
  );

  return {
    paths: lessons.map((lesson) => ({
      params: {
        slug: lesson.fields.slug,
      },
    })),
    fallback: false,
  };
};
