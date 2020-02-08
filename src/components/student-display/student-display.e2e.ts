import { newE2EPage } from '@stencil/core/testing';

describe('student-display', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<student-display></student-display>');

    const element = await page.find('student-display');
    expect(element).toHaveClass('hydrated');
  });
});
