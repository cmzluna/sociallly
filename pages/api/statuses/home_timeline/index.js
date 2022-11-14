const timeline = [
  {
    id: "0",
    avatar: "https://randomuser.me/api/portraits/med/women/60.jpg",
    username: "wongmjane",
    message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem maxime vel deserunt eius perspiciatis amet esse assumenda consequatur dolores eligendi. Dolor laboriosam ut repellat temporibus nisi velit officia cumque asperiores!`,
  },
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/med/women/61.jpg",
    username: "cmzdev",
    message:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cumque?🦉",
    name: "Claudio Mazzoli",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://randomuser.me/api/portraits/med/men/63.jpg",
    message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cumque?`,
  },
  {
    id: "0",
    avatar: "https://randomuser.me/api/portraits/med/women/60.jpg",
    username: "wongmjane",
    message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cumque?`,
  },
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/med/women/61.jpg",
    username: "cmzdev",
    message:
      "WLorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cumque?",
    name: "Claudio Mazzoli",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://randomuser.me/api/portraits/med/men/65.jpg",
    message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cumque?`,
  },
  {
    id: "0",
    avatar: "https://randomuser.me/api/portraits/med/women/60.jpg",
    username: "wongmjane",
    message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cumque?`,
  },
  {
    id: "1",
    avatar: "https://randomuser.me/api/portraits/med/women/61.jpg",
    username: "cmzdev",
    message:
      "orem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cu🦉",
    name: "Claudio Mazzoli",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar: "https://randomuser.me/api/portraits/med/men/64.jpg",
    message: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam reprehenderit quasi libero a dolore voluptates soluta molestiae expedita debitis labore quod iusto, tenetur, aliquam esse enim nostrum. Necessitatibus, quibusdam cumque?`,
  },
];

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(timeline));
};
