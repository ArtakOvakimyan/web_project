import {makeAutoObservable} from "mobx";

export default class GradesStore {
    constructor() {
        this._grades = [];
        makeAutoObservable(this);
    }

    setGrades(grades) {
        this._grades = grades;
    }
    get grades() {
        return this._grades;
    }
}