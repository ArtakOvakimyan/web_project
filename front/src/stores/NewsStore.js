import {makeAutoObservable} from "mobx";

export default class NewsStore {
    #TODO
    constructor() {
        this._articles = [
            {id: 1, text: 'Юные уральцы из многодетных семей приглашены на Елку Главы Екатеринбурга', img: process.env.REACT_APP_API_URL + '/Glava.jpg'},
            {id: 2, text: 'Мы вместе - Гимназия 13 и УГИ УрФУ! ', img: process.env.REACT_APP_API_URL + '/Principle.jpg'},
            {id: 3, text: 'Посвящение в гимназисты', img: process.env.REACT_APP_API_URL + '/WW.jpg'},
            {id: 4, text: 'Итоги регионального конкурса «Читатель года» 2022', img: process.env.REACT_APP_API_URL + '/Student.jpg'}
        ];
        makeAutoObservable(this);
    }

    setArticles(articles) {
        this._articles = articles;
    }

    get articles() {
        return this._articles;
    }
}