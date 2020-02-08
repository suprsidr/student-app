import { newE2EPage } from '@stencil/core/testing';

describe('crypto-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<student-list></student-list>');

    const element = await page.find('student-list');
    expect(element).toHaveClass('hydrated');
  });
});
