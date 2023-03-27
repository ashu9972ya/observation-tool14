// import {  useSelector } from "react-redux";

// console.log(currentUser)
// const API_URL = 'http://206.189.143.201:7000/api/observationVideo'

// const fetchData = async (url) =>{
//     // const { user: currentUser } = useSelector((state) => state.auth);

//     const response = await fetch(url,{
//         offset,
//         limit,
//         userId,
//     });
//     const data = await response.json();
//     // console.log(data)
//     return data;
// }
// export const fetchProducts = (param = "all" ) => {
//     if(param === "all") return fetchData(API_URL);
//     return fetchData(`${API_URL} ${param}`);
// }