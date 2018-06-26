/**
 * moves progress bar to show image upload progress
 * @param {number} progress - the upload progress status
 */
const moveProgressBar = (progress) => {
  const bar = document.getElementById('progressBar');
  let width = 0;
  width = progress;
  bar.style.width = `${width}%`;
  bar.innerHTML = `${width}%`;
};

export default moveProgressBar;
