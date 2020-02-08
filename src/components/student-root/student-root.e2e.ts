import { newE2EPage } from '@stencil/core/testing';

describe('student-root', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<student-root></student-root>');

    const element = await page.find('student-root');
    expect(element).toHaveClass('hydrated');
  });
});
