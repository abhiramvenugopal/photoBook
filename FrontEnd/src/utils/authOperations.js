function getToken(){
    if(window.localStorage){
        return window.localStorage.getItem("Token")
    }
    return ""
}

function isAuthenticated(){
    if(window.localStorage){
        const token=window.localStorage.getItem("Token");
        return Boolean(token);
    }
    return false;
}

export {isAuthenticated,getToken}