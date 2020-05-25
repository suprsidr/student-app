import { Component, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'camera-root',
  styleUrl: 'camera-root.css',
  shadow: false
})
export class CameraRoot {

  @Prop() worker: Worker;

  @State() hasPhoto: boolean = false;

  student: IStudent;
  inputElement: HTMLInputElement;
  canvasWrapper: HTMLElement;
  cropElement: HTMLElement;

  componentWillLoad(): void {
    this.worker.onmessage = ({ data: { student } }) => {
      console.log(student);
      this.student = student;
    };
    this.worker.postMessage({ action: 'fetchStudent', args: {
      student: {
        sid: '40eda845-dbf6-45c4-af81-08b64732a87e'
      }
     } });
  }

  activateCropper(): void {
    const el: HTMLElement = this.cropElement;
    const bounds: DOMRect = this.canvasWrapper.getBoundingClientRect();

    el.style.display = 'block';

    let isResizing: boolean = false;

    const mousedown = (e: MouseEvent | TouchEvent): void => {

      const mousemove = (e: MouseEvent | TouchEvent): void => {
        if (!isResizing) {
          let newX: number;
          let newY: number;
          if (e instanceof TouchEvent) {
            newX = e.changedTouches[0].clientX;
            newY = e.changedTouches[0].clientY;
          }
          if (e instanceof MouseEvent) {
            newX = e.clientX;
            newY = e.clientY;
          }

          let newLeft: number = (newX - bounds.left - offsetX) > 0 ? (newX - bounds.left - offsetX) : 0;
          newLeft = newLeft + rect.width > bounds.width ? bounds.width - rect.width : newLeft;

          let newTop: number = (newY - bounds.top - offsetY) > 0 ? (newY - bounds.top - offsetY) : 0;
          newTop = newTop + rect.height < bounds.height - 3 ? newTop : bounds.height - rect.height - 3;

          el.style.left = `${newLeft}px`;
          el.style.top = `${newTop}px`;
        }
      }

      const mouseup = (): void => {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        window.removeEventListener("touchmove", mousemove);
        window.removeEventListener("touchend", mouseup);
      }

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
      window.addEventListener("touchmove", mousemove);
      window.addEventListener("touchend", mouseup);

      const rect: DOMRect = el.getBoundingClientRect();
      let offsetX: number;
      let offsetY: number;
      if (e instanceof TouchEvent) {
        offsetX = e.changedTouches[0].clientX - rect.left;
        offsetY = e.changedTouches[0].clientY - rect.top;
      }
      if (e instanceof MouseEvent) {
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      }
    }

    el.addEventListener("mousedown", mousedown);
    el.addEventListener("touchstart", mousedown);

    const resizerMousedown = () => {

      isResizing = true;

      const mousemove = (e: MouseEvent | TouchEvent) => {
        let currentX;

        if (e instanceof TouchEvent) {
          currentX = e.changedTouches[0].clientX;
        }
        if (e instanceof MouseEvent) {
          currentX = e.clientX;
        }

        const rect = el.getBoundingClientRect();
        el.style.width = `${currentX - rect.x}px`;
        el.style.height = `${currentX - rect.x}px`;

      }

      const mouseup = () => {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        window.removeEventListener("touchmove", mousemove);
        window.removeEventListener("touchend", mouseup);
        isResizing = false;
      }

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
      window.addEventListener("touchmove", mousemove);
      window.addEventListener("touchend", mouseup);


    }

    const resizer = el.querySelector(".resize-handle")
    resizer.addEventListener("mousedown", resizerMousedown);
    resizer.addEventListener("touchstart", resizerMousedown);
  }

  handleChange({ target }): void {
    const parent: HTMLElement = this.canvasWrapper;
    const ce = document.createElement('canvas');
    parent.append(ce);
    const ctx = ce.getContext('2d');
    const img = new Image;
    img.onload = (): void => {
      this.hasPhoto = true;
      const { naturalHeight, naturalWidth } = img;
      const aspect = naturalHeight / naturalWidth;
      const ancestor = ce.parentElement.parentElement;
      ce.height = ancestor.offsetWidth * aspect;
      ce.width = ancestor.offsetWidth;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      this.activateCropper();
    };
    img.src = URL.createObjectURL(target.files[0]);
    target.value = null;
    target.files = null;
  }

  proxyClick(): void {
    this.inputElement.click();
  }

  resetClick(): void {
    this.inputElement.value = null;
    this.inputElement.files = null;
    this.cropElement.style.display = 'none';
    this.hasPhoto = false;
    const parent: HTMLElement = this.canvasWrapper;
    const ce = parent.querySelector('canvas');
    ce.remove();
  }

  cropImage(): void {
    const parent: HTMLElement = this.canvasWrapper;
    const bounds: DOMRect = parent.getBoundingClientRect();
    const ce = parent.querySelector('canvas');
    const rect: DOMRect = this.cropElement.getBoundingClientRect();
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(ce, rect.x - bounds.x, rect.y - bounds.y, rect.width, rect.height, 0, 0, 200, 200);
    this.cropElement.style.display = 'none';
    ce.remove();
    parent.append(canvas);

    // close modal and pass dataUri
    this.student.picture.large = canvas.toDataURL('image/jpeg', 1.0);
    this.worker.postMessage({ action: 'updateStudent', args: { student: this.student } });
  }

  render() {
    return (
      <ion-content class="ion-padding">
        <div class="grid-box">
          <div ref={el => this.canvasWrapper = el as HTMLElement} class="canvas-wrapper">
            <div ref={el => this.cropElement = el as HTMLElement} class="moveable">
              <div class="resize-handle">
                <ion-icon name="filter-outline" class="gripper"></ion-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-box controls">
          {!this.hasPhoto &&
          <ion-button onClick={() => this.proxyClick()}>
            <ion-icon slot="icon-only" name="camera"></ion-icon>
          </ion-button>}
          {this.hasPhoto &&
          <div>
            <ion-button onClick={() => this.cropImage()}>
              <span>Crop </span>
              <ion-icon name="crop-outline"></ion-icon>
            </ion-button>
            <ion-button onClick={() => this.resetClick()}>
              <span>Cancel</span>
            </ion-button>
          </div>}
          <input type="file" ref={el => this.inputElement = el as HTMLInputElement} onChange={(e) => this.handleChange(e)} capture="user" accept="image/*" />
        </div>
      </ion-content>
    );
  }

}
