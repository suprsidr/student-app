/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AppHome {}
  interface AppRoot {}
  interface PopoverMenu {
    'dismissFunc': Function;
  }
  interface StudentDisplay {
    'student': any;
  }
  interface StudentImg {
    /**
    * This attribute defines the alternative text describing the image. Users will see this text displayed if the image URL is wrong, the image is not in one of the supported formats, or if the image is not yet downloaded.
    */
    'alt'?: string;
    'class'?: string;
    /**
    * The image URL. This attribute is mandatory for the `<img>` element.
    */
    'src'?: string;
  }
  interface StudentList {
    'students': any;
  }
  interface StudentRoot {}
}

declare global {


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLPopoverMenuElement extends Components.PopoverMenu, HTMLStencilElement {}
  var HTMLPopoverMenuElement: {
    prototype: HTMLPopoverMenuElement;
    new (): HTMLPopoverMenuElement;
  };

  interface HTMLStudentDisplayElement extends Components.StudentDisplay, HTMLStencilElement {}
  var HTMLStudentDisplayElement: {
    prototype: HTMLStudentDisplayElement;
    new (): HTMLStudentDisplayElement;
  };

  interface HTMLStudentImgElement extends Components.StudentImg, HTMLStencilElement {}
  var HTMLStudentImgElement: {
    prototype: HTMLStudentImgElement;
    new (): HTMLStudentImgElement;
  };

  interface HTMLStudentListElement extends Components.StudentList, HTMLStencilElement {}
  var HTMLStudentListElement: {
    prototype: HTMLStudentListElement;
    new (): HTMLStudentListElement;
  };

  interface HTMLStudentRootElement extends Components.StudentRoot, HTMLStencilElement {}
  var HTMLStudentRootElement: {
    prototype: HTMLStudentRootElement;
    new (): HTMLStudentRootElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-root': HTMLAppRootElement;
    'popover-menu': HTMLPopoverMenuElement;
    'student-display': HTMLStudentDisplayElement;
    'student-img': HTMLStudentImgElement;
    'student-list': HTMLStudentListElement;
    'student-root': HTMLStudentRootElement;
  }
}

declare namespace LocalJSX {
  interface AppHome {}
  interface AppRoot {}
  interface PopoverMenu {
    'dismissFunc'?: Function;
  }
  interface StudentDisplay {
    'onChangeEvent'?: (event: CustomEvent<any>) => void;
    'student'?: any;
  }
  interface StudentImg {
    /**
    * This attribute defines the alternative text describing the image. Users will see this text displayed if the image URL is wrong, the image is not in one of the supported formats, or if the image is not yet downloaded.
    */
    'alt'?: string;
    'class'?: string;
    /**
    * Emitted when the img fails to load
    */
    'onIonError'?: (event: CustomEvent<void>) => void;
    /**
    * Emitted when the image has finished loading
    */
    'onIonImgDidLoad'?: (event: CustomEvent<void>) => void;
    /**
    * Emitted when the img src has been set
    */
    'onIonImgWillLoad'?: (event: CustomEvent<void>) => void;
    /**
    * The image URL. This attribute is mandatory for the `<img>` element.
    */
    'src'?: string;
  }
  interface StudentList {
    'students'?: any;
  }
  interface StudentRoot {}

  interface IntrinsicElements {
    'app-home': AppHome;
    'app-root': AppRoot;
    'popover-menu': PopoverMenu;
    'student-display': StudentDisplay;
    'student-img': StudentImg;
    'student-list': StudentList;
    'student-root': StudentRoot;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-home': LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'popover-menu': LocalJSX.PopoverMenu & JSXBase.HTMLAttributes<HTMLPopoverMenuElement>;
      'student-display': LocalJSX.StudentDisplay & JSXBase.HTMLAttributes<HTMLStudentDisplayElement>;
      'student-img': LocalJSX.StudentImg & JSXBase.HTMLAttributes<HTMLStudentImgElement>;
      'student-list': LocalJSX.StudentList & JSXBase.HTMLAttributes<HTMLStudentListElement>;
      'student-root': LocalJSX.StudentRoot & JSXBase.HTMLAttributes<HTMLStudentRootElement>;
    }
  }
}


