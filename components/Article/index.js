import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import Link from "next/link";
import { useRouter } from "next/router";

const Article = ({ createdAt, id, userName, avatar, content, userId, img }) => {
  const timeAgo = useTimeAgo(createdAt || 1669217473193);
  const router = useRouter();

  const handleOnClick = (e) => {
    e.preventDefault();
    router.push(`/status/${id}`);
  };
  // TODO:
  // check if img URL in Firebase exists in Storage service

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <article key={id} onClick={handleOnClick}>
        <Avatar alt={userName} src={avatar} text={userName} />

        <div>
          <Link href={`/api/articles/${id}`} passHref legacyBehavior>
            <a>{timeAgo}</a>
          </Link>
          <p>{content}</p>
          {img && <img src={img} />}
        </div>
      </article>
      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border: 1px solid lightblue;
          border-radius: 8px;
        }
        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }
        div {
          padding-left: 10px;
        }
        a {
          text-decoration: none;
          color: lightblue;
        }
        a:hover {
          text-decoration: underline;
          color: darkblue;
        }
        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Article;
