import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./stores/UserStore";
import NewsStore from "./stores/NewsStore";
import GradesStore from "./stores/GradesStore";
import ClassesStore from "./stores/ClassesStore";
//import reportWebVitals from './reportWebVitals';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        news: new NewsStore(),
        grades: new GradesStore(),
        classes: new ClassesStore()
    }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>
);
// reportWebVitals();
