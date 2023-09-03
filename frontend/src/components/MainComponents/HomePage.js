import React from "react";
import image from "./gaming.jpeg"
const HomePage = () => {
    return (
        <div className="page">
            <div className="area">
                <img src={image} style={{width: 1850, height : 750}}/>
                <div className="starting movement opacity font paths"> Welcome to my humble gaming site</div>
            </div>
            <div className="d-flex flex-row justify-content-evenly">
                <div className="col-1 flex-fill">
                    <h1>About me</h1>
                </div>
                <div className="col-2 flex-fill">
                    I'm currently starting to "open my wings" as a full-stack developer, and this is one of my first projects.
                </div>
                <div className="">

                </div>
            </div>
        </div>
    )
}

export default HomePage;