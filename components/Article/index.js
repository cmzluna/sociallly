import Avatar from "components/Avatar";

const Article = ({ createdAt, id, userName, avatar, content, userId }) => {
  console.log("====================================");
  console.log(createdAt);
  console.log("====================================");
  return (
    <>
      <article key={id}>
        <Avatar alt={userName} src={avatar} text={userName} />

        <div>
          <p>{content}</p>
        </div>
        <div>
          {" "}
          <p>{createdAt}</p>
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
