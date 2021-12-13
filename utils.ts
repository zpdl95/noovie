export const makeImgPath = (img: string, width: string = "w780") =>
  `https://image.tmdb.org/t/p/${width}${img}`;
