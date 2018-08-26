import moveProgressBar from '../../helpers/moveProgressBar';


describe('moveProgressBar helper', () => {
  it('should call `moveProgressBar`', (done) => {
    document.body.innerHTML =
    '<div>' +
    `  <p type="checkbox" id="progressBar" checked=true></p>` +
    '</div>';

    const progressBar = document.getElementById('progressBar');
    moveProgressBar(2)
    expect([progressBar].length).toEqual(1)
    done();
  });
});
