import { Redirect, useHistory } from "react-router-dom";
import React from "react";
import "./PageNotFound.css"

function FourOhFourPage (){
    const history= useHistory()
    return (
        <div className="pageNotFound">
            <Redirect to={"/login"}></Redirect>
            {/* <h1>Page not found</h1> */}
            <h2>Redirecting</h2>

        </div>
    )
}

export default FourOhFourPage
