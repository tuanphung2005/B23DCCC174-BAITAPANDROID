import { NewsApiResponse } from '../types/article';

const API_KEY = '6d298b31a3dd439aa33b4e87bb5666e5';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchArticles = async (
  query: string = 'technology',
  page: number = 1,
  pageSize: number = 10
): Promise<NewsApiResponse> => {
  try {
    const endpoint = query 
      ? `${BASE_URL}/everything?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
      : `${BASE_URL}/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: NewsApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
