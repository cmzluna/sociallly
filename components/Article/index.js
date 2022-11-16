import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";

const Article = ({ createdAt, id, userName, avatar, content, userId }) => {
  const timeAgo = useTimeAgo(createdAt);

  return (
    <>
      <article key={id}>
        <Avatar alt={userName} src={avatar} text={userName} />

        <div>
          <date>{timeAgo}</date>
          <p>{content}</p>
        </div>
      </article>
      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border: 1px solid lightblue;
          border-radius: 8px;
        }
        div {
          padding-left: 10px;
        }
      `}</style>
    </>
  );
};

export default Article;
