export const makeImgPath = (img: string, width: string = "w780") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

/* img = "/5RuR7GhOI5fElADXZb0X2sr9w5n.jpg" */

export const loadMore = (hasNextPage, fetchNextPage) => {
  if (hasNextPage) {
    fetchNextPage();
  }
};

export const getNextPage = (currentPage) => {
  const nextPage = currentPage.page + 1;
  return nextPage > currentPage.total_pages ? null : nextPage;
};
