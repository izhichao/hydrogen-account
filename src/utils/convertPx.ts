export const convertPx = (size: number) => {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const px = (clientWidth / 375) * size;

  return px;
};

export default convertPx;