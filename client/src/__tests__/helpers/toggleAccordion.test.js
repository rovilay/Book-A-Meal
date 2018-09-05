import toggleAccordion from '../../helpers/toggleAccordion';


describe('toggleAccordion helper', () => {
  it('should return all element if `filterBy` is `all`', (done) => {
    document.body.innerHTML =
    `<div>
      <p id="accordion" class="accordion-1" aria-hidden="true" />
    </div>`;

    toggleAccordion('.accordion-1', 'accordion-2', false)
    const element = document.getElementById('accordion')
    expect(element.className).toBe('accordion-2')
    done();
  });
});
