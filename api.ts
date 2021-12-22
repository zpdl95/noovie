const API_KEY = "9db5794f039ec550f11e71750544ca9e";
const BASE_URL = "https://api.themoviedb.org/3";

/* react-query를 사용하기 위해 fetcher에 넘겨줄 fetch함수를 만듬 */

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_page: number;
}

/* input data의 실제 이름을 작성 results이름의 데이터를 받기 때문에 이렇게 작성 */
export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

export const moviesApi = {
  trending: ({ pageParam }: { pageParam: any[] }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }&region=KR`
    ).then((res) => res.json()),
  /* fetcher의 첫번째 인자로 pageParam을 갖는다 */
  upcoming: ({ pageParam }: { pageParam: any[] }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }&region=KR`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko&page=1&region=KR`
    ).then((res) => res.json()),

  /* react-query의 fetcher들은 useQuery에서 주어진 값을 인풋값으로 사용할 수 있다. */
  search: ({ queryKey }: { queryKey: any[] }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&page=1&region=KR&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: { queryKey: any[] }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images&language=ko` /* 이 api는 &append_to_response를 사용해 비디오와 이미지를 같이 가져올 수 있다 */
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: ({ pageParam }: { pageParam: any[] }) =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }&region=KR`
    ).then((res) => res.json()),
  airingToday: ({ pageParam }: { pageParam: any[] }) =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }&region=KR`
    ).then((res) => res.json()),
  topRated: ({ pageParam }: { pageParam: any[] }) =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko&page=${
        pageParam ? pageParam : 1
      }&region=KR`
    ).then((res) => res.json()),
  search: ({ queryKey }: { queryKey: any[] }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko&page=1&region=KR&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }: { queryKey: any[] }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images&language=ko`
    ).then((res) => res.json());
  },
};
