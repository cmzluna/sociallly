import AppLayout from "components/AppLayout";
import Article from "components/Article";
import { useEffect, useState } from "react";
import useUser from "hooks/useUser";
import { fetchLatestArticles } from "/firebase";

const Home = () => {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && fetchLatestArticles().then(setTimeline);
  }, [user]);

  return (
    <>
      <AppLayout>
        <header>
          <h2>inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ id, userName, avatar, content, userId, createdAt }) => (
              <Article
                avatar={avatar}
                id={id}
                content={content}
                userName={userName}
                userId={userId}
                createdAt={createdAt}
              />
            )
          )}
        </section>
        <nav>navbar here</nav>
        <style jsx>{`
          header {
            align-items: center;
            border-bottom: 1px solid #ccc;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            height: 49px;
            display: flex;
            position: sticky;
            top: 0;
            width: 100%;
          }
          article {
            display: flex;
            padding: 10px 15px;
            border: 1px solid lightblue;
            border-radius: 8px;
          }
          h2 {
            font-size: 21px;
            font-weight: 800;
          }
          section {
            padding-bottom: 100px;
            overflow-y: auto;
            height: 100%;
          }
          nav {
            bottom: 0;
            border-top: 1px solid #ccc;
            background-color: white;
            height: 49px;
            position: absolute;
            width: 100%;
          }
        `}</style>
      </AppLayout>
    </>
  );
};

export default Home;
