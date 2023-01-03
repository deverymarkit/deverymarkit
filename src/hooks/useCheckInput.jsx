import { useState } from "react";

function useCheckInput(initState) {

    const [username, setUserName] = useState(initState);
    const [accountname, setAccountName] = useState(initState)
    const [linkname, setLinkName] = useState(initState)

    const handleCheckInput = (event) => {
        // Input을 체크해서 state를 변경하는 함수.
        if (event.target.name === "username") setUserName(event.target.value); 
        else if (event.target.name === "accountname") setAccountName(event.target.value);
        else setLinkName(event.target.value);
        console.log("🚀 ~ file: useCheckInput.jsx:17 ~ useCheckInput ~ username, accountname", username, accountname)

    }

    return [username, accountname, linkname, handleCheckInput];
}

export default useCheckInput;