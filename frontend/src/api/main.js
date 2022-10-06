import client from './client';

export const getSharedFc = async () => {
  const res = await client.post(
    'api/share/fullcourse/search',
    {
      days: [],
      place: '',
      tags: [],
    },
    {
      params: { page: 0, size: 3, sort: 'likeCnt,desc' },
    },
  );
  return res;
};
