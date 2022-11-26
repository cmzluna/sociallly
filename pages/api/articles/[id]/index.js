import { firestore } from "/firebase/admin";
import { doc, getDoc } from "firebase/firestore";

export default async (req, res) => {
  const { id } = req.query;

  const docRef = doc(firestore, "articles", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const id = docSnap.id;
    const { createdAt = "" } = data;
    const newDate = createdAt.toDate();

    res.status(200).send({
      ...data,
      id,
      createdAt: +newDate,
    });
    return;
  }

  res.status(404).end();
  // doc.data() will be undefined in this case
};
