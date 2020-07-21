import ReactDOM from "react-dom";
import React from "react";
import Home from "./pages/home";
import '../css/app.scss';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

const App = () => {
    return(
        <Home />
    )
}

const rootElement = document.querySelector("#app")
ReactDOM.render(<App />, rootElement);
