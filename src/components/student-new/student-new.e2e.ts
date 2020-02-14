import { newE2EPage } from '@stencil/core/testing';

describe('none-student-new', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<none-student-new></none-student-new>');

    const element = await page.find('none-student-new');
    expect(element).toHaveClass('hydrated');
  });
});
