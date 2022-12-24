import {makeAutoObservable} from "mobx";

export default class ClassesStore {
    constructor() {
        this._classes = [];
        this._selected = '6378269af833af16a5b1043d';
        makeAutoObservable(this);
    }

    setClasses(classes) {
        this._classes = classes;
    }

    get classes() {
        return this._classes;
    }

    setSelectedClass(userClass) {
        this._selected = userClass;
    }

    get selectedClass() {
        return this._selected;
    }
}