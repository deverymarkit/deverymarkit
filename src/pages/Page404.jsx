import React from "react";
import BlankComponent from "../components/common/blankComponent/BlankComponent";

export default function Page404({errorMsg}) {
    console.log(errorMsg);

    return (
        <>
            <BlankComponent type="page404" errorMsg={errorMsg}/>
        </>
    );
}
