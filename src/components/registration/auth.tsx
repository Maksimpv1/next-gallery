import { useAppSelectorType } from "@/redux/store/store";

export const useAuth = ()=>{
    const { 
        email ,
        password ,
        token,
        uid } = useAppSelectorType((state) => state.auth.user);

    return{
        isAuth: Boolean(email),
        email,
        password,
        token,
        uid,
    }
}