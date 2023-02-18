import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "./components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  let allPostData = allPostsData || [];

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <section className={utilStyles.headingMd}>
        <p className="mt-4">
          Founder and CEO at @TeamGlowit ✦ Am Self Taught Fullstack Web
          Developer ✦ Expert In MERN Stack ✦ Now working on
          <a className="text-[#]" href="https://visitasmart.com">
            {" "}
            visitasmart.com
          </a>
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={"mt-8 text-4xl font-semibold mb-6"}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link className="font-semibold" href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <p className=" mt-2 text-sm text-slate-400">{date}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
