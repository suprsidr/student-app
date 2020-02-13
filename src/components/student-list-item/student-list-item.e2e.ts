import { newE2EPage } from '@stencil/core/testing';

describe('none-student-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<none-student-list-item></none-student-list-item>');

    const element = await page.find('none-student-list-item');
    expect(element).toHaveClass('hydrated');
  });
});
