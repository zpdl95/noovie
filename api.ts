const API_KEY = "9db5794f039ec550f11e71750544ca9e";
const BASE_URL = "https://api.themoviedb.org/3/";

export const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

export const upComing = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

export const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

/* react-query를 사용하기 위해 fetcher에 넘겨줄 fetch함수를 만듬 */
