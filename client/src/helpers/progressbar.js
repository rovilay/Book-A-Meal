const moveProgressBar = (id, stop) => {
  const bar = document.getElementById(id);
  let width = 1;
  setInterval(() => {
    if (width >= 100) {
      return clearInterval();
    }

    if (stop) {
      bar.style.width = '100%';
      bar.innerHTML = '100%';
    } else {
      width++;
      bar.style.width = `${width}%`;
      bar.innerHTML = `${width}%`;
    }
  }, 100);
};

export default moveProgressBar;
