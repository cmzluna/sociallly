import AppLayout from "components/AppLayout";
import Article from "components/Article";
import { useEffect, useState } from "react";
import useUser from "hooks/useUser";
import { fetchLatestArticles } from "/firebase";
import Link from "next/link";
import Home from "components/Icons/Home";
import Search from "components/Icons/Search";
import Create from "components/Icons/Create";
import { colors } from "styles/theme";

const HomePage = () => {
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
        <nav>
          <div>
            <Link href="/home">
              <Home width={32} height={32} stroke="#09f" />
            </Link>
          </div>
          <div>
            <Link href="/home">
              <Home width={32} height={32} stroke="#09f" />
            </Link>
          </div>
        </nav>

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
            display: flex;
            position: absolute;
            width: 100%;
          }
          nav div {
            align-items: center;
            display: flex;
            flex: 1 1 auto;
            height: 100%;
            justify-content: center;
          }
          nav div:hover {
            background: radial-gradient(#0099ff22 16%, transparent 20%);
            background-size: 180px 180px;
            background-position: center;
          }
          nav span:hover > :global(svg) {
            stroke: ${colors.primary};
          }
        `}</style>
      </AppLayout>
    </>
  );
};

export default HomePage;
