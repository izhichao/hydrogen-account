export default (time: number) => {
  setTimeout(() => {
    window.location.reload();
  }, time);
};