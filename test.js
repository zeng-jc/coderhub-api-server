const comments = [
  {
    id: 1,
    content: "ikun",
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
    content: "确实很帅，可以去打nba",
    commentId: 2,
    createAt: "2023-04-25T09:38:10.000Z",
    user: {
      id: 2,
      nickname: "ikun",
    },
  },
  {
    id: 4,
    content: "我也觉得",
    commentId: 3,
    createAt: "2023-04-25T09:38:10.000Z",
    user: {
      id: 2,
      nickname: "ikun",
    },
  },
];

function commentListToTree(list, rootNode) {
  const arr = [];
  list.forEach(item => {
    if (item.commentId === rootNode) {
      arr.push(item);
      const replies = commentListToTree(list, item.id); //子节点
      return replies.length && (item.replies = item.replies);
    }
  });
  return arr;
}

function listToTree(list) {
  let info = list.reduce((map, node) => ((map[node.id] = node), (node.replies = []), map), {});
  return list.filter(node => {
    info[node.commentId] && info[node.commentId].replies.push(node);
    return !node.commentId;
  });
}

// console.log(commentListToTree(comments, null));
console.log(listToTree(comments));
