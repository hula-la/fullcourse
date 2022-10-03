import client from './client';

export const getWordCloud = async (placeName) => {
    const res = await client.get(`api/wordcloud/${placeName}`)
    return res
}