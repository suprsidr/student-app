import { newSpecPage } from '@stencil/core/testing';
import { CameraRoot } from '../camera-root';

describe('camera-root', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CameraRoot],
      html: `<camera-root></camera-root>`,
    });
    expect(page.root).toEqualHtml(`
      <camera-root>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </camera-root>
    `);
  });
});
