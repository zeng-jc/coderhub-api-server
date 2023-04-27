const comments = [
  {
    id: 1,
    content: "坤坤打球很帅",
    commentId: null,
    createAt: "2023-04-25T05:06:43.000Z",
    user: {
      id: 2,
      nickname: "ikun",
    },
  },
  {
    id: 2,
    content: "坤坤打球很帅",
    commentId: null,
    createAt: "2023-04-25T05:08:02.000Z",
    user: {
      id: 2,
      nickname: "ikun",
    },
  },
  {
    id: 3,
    content: "坤坤打球很帅",
    commentId: null,
    createAt: "2023-04-25T05:12:46.000Z",
    user: {
      id: 2,
      nickname: "ikun",
    },
  },
  {
    id: 4,
    content: "坤坤打球很帅",
    commentId: null,
    createAt: "2023-04-25T09:06:39.000Z",
    user: {
      id: 2,
      nickname: "ikun",
    },
  },
  {
    id: 5,
    content: "坤坤",
    commentId: 2,
    createAt: "2023-04-25T09:38:10.000Z",
    user: {
      id: 2,
      nickname: "ikun",
    },
  },
];

comments.forEach((item1, index1) => {
  if (typeof item1.commentId === "number") {
    comments.forEach((item2, index) => {
      if (item2.id === item1.commentId) {
        comments[index].replies = [comments[index1]];
      }
    });
  }
});

console.log(comments);
