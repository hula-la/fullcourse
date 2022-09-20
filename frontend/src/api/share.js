import client from './client';

export const getSharedFc = async () => {
  const res = await client.get('api/share/fullcourse', {
    params: { size: 3 },
  });
  console.log(res);
  return res;
};

export const getSharedFcDetail = async (data) => {
  const res = await client.get(`api/share/fullcourse/${data}`);
  console.log(res);
  return res;
};

export const postSharedFc = async (data) => {
  const res = await client.post('api/share/fullcourse', data);
  return res;
};

export const postSharedFcComment = async (data) => {
  const res = await client.post('api/share/comment', data);
  return res;
};

export const deleteSharedFcComment = async (sharedFcId, commentId) => {
  const res = await client.delete(
    `api/share/comment/${sharedFcId}/${commentId}`,
  );
  return res;
};
