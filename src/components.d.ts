/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface CameraRoot {
        "dismissFunc": Function;
        "emitterFunc": Function;
        "student": IStudent;
    }
    interface StudentDisplay {
        "sid": string;
        "worker": Worker;
    }
    interface StudentImg {
        /**
          * This attribute defines the alternative text describing the image. Users will see this text displayed if the image URL is wrong, the image is not in one of the supported formats, or if the image is not yet downloaded.
         */
        "alt"?: string;
        "cssClass"?: string;
        /**
          * The image URL. This attribute is mandatory for the `<img>` element.
         */
        "src"?: string;
    }
    interface StudentList {
        "students": Array<IStudent>;
    }
    interface StudentListItem {
        "student": IStudent;
    }
    interface StudentNew {
        "worker": Worker;
    }
    interface StudentRoot {
        "worker": Worker;
    }
}
declare global {
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLCameraRootElement extends Components.CameraRoot, HTMLStencilElement {
    }
    var HTMLCameraRootElement: {
        prototype: HTMLCameraRootElement;
        new (): HTMLCameraRootElement;
    };
    interface HTMLStudentDisplayElement extends Components.StudentDisplay, HTMLStencilElement {
    }
    var HTMLStudentDisplayElement: {
        prototype: HTMLStudentDisplayElement;
        new (): HTMLStudentDisplayElement;
    };
    interface HTMLStudentImgElement extends Components.StudentImg, HTMLStencilElement {
    }
    var HTMLStudentImgElement: {
        prototype: HTMLStudentImgElement;
        new (): HTMLStudentImgElement;
    };
    interface HTMLStudentListElement extends Components.StudentList, HTMLStencilElement {
    }
    var HTMLStudentListElement: {
        prototype: HTMLStudentListElement;
        new (): HTMLStudentListElement;
    };
    interface HTMLStudentListItemElement extends Components.StudentListItem, HTMLStencilElement {
    }
    var HTMLStudentListItemElement: {
        prototype: HTMLStudentListItemElement;
        new (): HTMLStudentListItemElement;
    };
    interface HTMLStudentNewElement extends Components.StudentNew, HTMLStencilElement {
    }
    var HTMLStudentNewElement: {
        prototype: HTMLStudentNewElement;
        new (): HTMLStudentNewElement;
    };
    interface HTMLStudentRootElement extends Components.StudentRoot, HTMLStencilElement {
    }
    var HTMLStudentRootElement: {
        prototype: HTMLStudentRootElement;
        new (): HTMLStudentRootElement;
    };
    interface HTMLElementTagNameMap {
        "app-home": HTMLAppHomeElement;
        "app-root": HTMLAppRootElement;
        "camera-root": HTMLCameraRootElement;
        "student-display": HTMLStudentDisplayElement;
        "student-img": HTMLStudentImgElement;
        "student-list": HTMLStudentListElement;
        "student-list-item": HTMLStudentListItemElement;
        "student-new": HTMLStudentNewElement;
        "student-root": HTMLStudentRootElement;
    }
}
declare namespace LocalJSX {
    interface AppHome {
    }
    interface AppRoot {
    }
    interface CameraRoot {
        "dismissFunc"?: Function;
        "emitterFunc"?: Function;
        "student"?: IStudent;
    }
    interface StudentDisplay {
        "sid"?: string;
        "worker"?: Worker;
    }
    interface StudentImg {
        /**
          * This attribute defines the alternative text describing the image. Users will see this text displayed if the image URL is wrong, the image is not in one of the supported formats, or if the image is not yet downloaded.
         */
        "alt"?: string;
        "cssClass"?: string;
        /**
          * Emitted when the img fails to load
         */
        "onIonError"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when the image has finished loading
         */
        "onIonImgDidLoad"?: (event: CustomEvent<void>) => void;
        /**
          * Emitted when the img src has been set
         */
        "onIonImgWillLoad"?: (event: CustomEvent<void>) => void;
        /**
          * The image URL. This attribute is mandatory for the `<img>` element.
         */
        "src"?: string;
    }
    interface StudentList {
        "students"?: Array<IStudent>;
    }
    interface StudentListItem {
        "student"?: IStudent;
    }
    interface StudentNew {
        "worker"?: Worker;
    }
    interface StudentRoot {
        "worker"?: Worker;
    }
    interface IntrinsicElements {
        "app-home": AppHome;
        "app-root": AppRoot;
        "camera-root": CameraRoot;
        "student-display": StudentDisplay;
        "student-img": StudentImg;
        "student-list": StudentList;
        "student-list-item": StudentListItem;
        "student-new": StudentNew;
        "student-root": StudentRoot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "camera-root": LocalJSX.CameraRoot & JSXBase.HTMLAttributes<HTMLCameraRootElement>;
            "student-display": LocalJSX.StudentDisplay & JSXBase.HTMLAttributes<HTMLStudentDisplayElement>;
            "student-img": LocalJSX.StudentImg & JSXBase.HTMLAttributes<HTMLStudentImgElement>;
            "student-list": LocalJSX.StudentList & JSXBase.HTMLAttributes<HTMLStudentListElement>;
            "student-list-item": LocalJSX.StudentListItem & JSXBase.HTMLAttributes<HTMLStudentListItemElement>;
            "student-new": LocalJSX.StudentNew & JSXBase.HTMLAttributes<HTMLStudentNewElement>;
            "student-root": LocalJSX.StudentRoot & JSXBase.HTMLAttributes<HTMLStudentRootElement>;
        }
    }
}
