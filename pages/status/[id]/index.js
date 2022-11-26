import Article from "components/Article";
import { firestore } from "/firebase/admin";
import { fetchLatestArticles } from "/firebase";

const ArticlePage = (props) => {
  return (
    <>
      <Article {...props} />{" "}
    </>
  );
};

export async function getStaticPaths() {
  const articles = await fetchLatestArticles();

  const paths = articles.map((article) => ({
    params: {
      id: article.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;
  const docRef = firestore.collection("articles").doc(id);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    const data = docSnap.data();
    const { id } = docSnap;
    const { createdAt = "" } = data;
    const newDate = createdAt.toDate();
    const props = {
      ...data,
      id,
      createdAt: +newDate,
    };

    return { props };
  }

  return { props: {} };
}

export default ArticlePage;
