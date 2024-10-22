// import { CourseType } from "../types/courses";

export function errorMessage(errMessage: string) {
    let result = errMessage;
    if (errMessage.includes("auth/email-already-in-use")) {
        result = "Данный email уже занят";
    } else if (errMessage.includes("auth/email-already-exists")) {
        result = "Данный emailуже используется";
    } else if (errMessage.includes("auth/user-not-found")) {
        result = "Пользователь не найден";
    } else if (errMessage.includes("auth/invalid-email")) {
        result = "Введите корректный email"
    } else if (errMessage.includes("auth/invalid-credential")) {
        result = "Неверный email или пароль";
    } 
    return result;
  }

//   export function sortByOrder(a: CourseType, b: CourseType) {
//     if (a.order < b.order){
//         return -1;
//     }
//     if (a.order > b.order){
//         return 1;
//     }
//     return 0;
// }
