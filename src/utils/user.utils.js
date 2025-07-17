
export const getUser =() =>{
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export const getUserId = () =>{
    const user = getUser();
    return user?.id;
}

export const getUserName = ()=>{
    const user = getUser();
    return user?.name;
}