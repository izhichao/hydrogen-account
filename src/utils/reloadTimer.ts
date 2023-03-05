export const reloadTimer = (time: number) => {
  setTimeout(() => {
    window.location.reload();
  }, time);
};

export default reloadTimer;
