import got from "got";

const API_BASE_URL = 'https://animechan.vercel.app/api';

const client = got.extend({
    prefixUrl: API_BASE_URL,
    responseType: 'json',
});


export interface RandomQuote {
    anime: string,
    character: string,
    quote: string
}
export async function getRandomQuote() {
    const data = (await client.get<RandomQuote>('random')).body
    return data;
}
