import { useState } from "react";
import AppLayout from "components/AppLayout";
import Button from "components/Button";
import useUser from "hooks/useUser";

import { addArticle } from "/firebase";
import { useRouter } from "next/router";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

export default function ComposeArticle() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const user = useUser();
  const router = useRouter();

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    console.log("user to send is ", user);
    console.log("message to send is ", message);
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addArticle({
      avatar: user.avatar,
      content: message,
      userId: user.userId,
      userName: user.userName,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="Escribe tu pensamiento..."
            value={message}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Grabar!</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  );
}
