import Layout,{ siteTitle } from "../components/Layout.js";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import profilePic from "../../public/images/profile.jpg"

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
       <Head>
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1618614145666142211/EM22F0FG_400x400.jpg" />
        <meta
          name="description"
          content={"A blog from " + siteTitle + " - " + postData.date }
        />
        <meta
          property="og:image"
          content={profilePic}
        />
        <meta name="og:title" content={postData.title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div>
          <p style={{color:"gray"}}>{postData.date}</p>
        </div>
        <div
          style={{ marginTop: "20px" }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}
