export const setUser=(data)=>{
    try {
        localStorage.setItem('auth',JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }
}

export const userLogout=async()=>{
    try {
        localStorage.removeItem('auth');
        return true;
    } catch (error) {
        console.log(error)
    }
}

export const getUser=()=>{
    try {
      const data=  localStorage.getItem('auth');
      return JSON.parse(data);
    } catch (error) {
        console.log(error)
        return;
    }
}