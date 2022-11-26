import { useEffect, useState } from "react";
import AppLayout from "components/AppLayout";
import NavBar from "components/NavBar";
import Button from "components/Button";
import useUser from "hooks/useUser";
import { addArticle, uploadImage } from "/firebase";
import { useRouter } from "next/router";
import { getDownloadURL } from "firebase/storage";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAGGABLE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};

export default function ComposeArticle() {
  const user = useUser();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const [drag, setDrag] = useState(DRAGGABLE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING;

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot) => {
        const { bytesTransferred, totalBytes } = snapshot;
        var progress = Math.round((bytesTransferred / totalBytes) * 100);

        setProgresspercent(progress);
      };
      const onError = () => {};
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then(setImgUrl);
      };

      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(COMPOSE_STATES.LOADING);
    addArticle({
      avatar: user.avatar,
      content: message,
      userId: user.userId,
      userName: user.userName,
      img: imgUrl,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((err) => {
        console.error(err);
        setStatus(COMPOSE_STATES.ERROR);
      });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAGGABLE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAGGABLE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAGGABLE_STATES.NONE);
    const imgFile = e.dataTransfer.files[0];

    const task = uploadImage(imgFile);
    setTask(task);
  };

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <div className="wrapper">
            <textarea
              onChange={handleChange}
              placeholder="Write your thought..."
              value={message}
              onDragLeave={handleDragLeave}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
            />
            {task && (
              <div className="outerbar">
                <div
                  className="innerbar"
                  style={{ width: `${progresspercent}%` }}
                >
                  {progresspercent}%
                </div>
              </div>
            )}
          </div>

          <div>
            <Button disabled={isButtonDisabled}>Grabar!</Button>
          </div>
        </form>
        <NavBar />
      </AppLayout>
      <style jsx>{`
        .wrapper {
          position: relative;
          min-height: 180px;
          width: 100%;
          border-radius: 10px;
        }
        textarea {
          border: ${drag === DRAGGABLE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px transparent red "};
          font-size: 21px;
          border-radius: 10px;
          height: 100%;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
          position: absolute;
        }
        .outerbar {
          position: absolute;
          right: 2px;
          left: 2px;
          bottom: 2px;
        }
        .innerbar {
          background-color: lightblue;
          display: flex;
          justify-content: center;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
}
