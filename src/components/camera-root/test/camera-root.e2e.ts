import { newE2EPage } from '@stencil/core/testing';

describe('camera-root', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<camera-root></camera-root>');

    const element = await page.find('camera-root');
    expect(element).toHaveClass('hydrated');
  });
});
