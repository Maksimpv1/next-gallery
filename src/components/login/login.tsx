'use client'

import { TextField } from "@mui/material";
import { ErrorMessage, Formik } from "formik"
import Link from "next/link";
import * as yup from 'yup';

import styles from './login.module.css'
import { AppDispatch, useAppSelectorType } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginStateSwitch, setUser } from "@/redux/reducers/authorisation";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";

interface ILoginForm {
    password:string,
    email:string,
}

export const LoginForm = () => {

    console.log(auth)
    
    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();

    const handlerLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            dispatch(
              setUser({
                email: user.email,
                uid: user.uid, 
                token: user.refreshToken,
              })
            );
            dispatch(loginStateSwitch({ LogStateBol: true }));            
            router.push('/Profile')
          })
          .catch(() => alert('Неверный пользователь'));
      };


    const loginState = useAppSelectorType((state) => state.auth.logState)

    const ValidationsSchema = yup.object().shape({
        password: yup.string().typeError('Должно быть строкой').required('Обязательное поле').min(8,'Min 8 symbols'),
        email: yup.string().email('Введите верный Email').required('Обязательное поле'),
    })
    return  (
        <div className={styles.container}>  
            <h2 >Login form</h2>
            <Formik
            initialValues = {{
                email:'',
                password:'',
            }}
            validateOnBlur
                onSubmit ={(values:ILoginForm) => {
                    handlerLogin(values.email,values.password)
                    }}
                validationSchema={ValidationsSchema}            
            >
                {({ values,errors,touched,handleChange, handleBlur,isValid,handleSubmit, dirty }) => (
                            <form onSubmit={handleSubmit}>
                                <div className={styles.info_input}>
                                    <TextField 
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                    type={`email`}
                                    name={`email`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    />
                                    {touched.email && errors.email && 
                                    <ErrorMessage name="email" >
                                    {(msg) => <div className={styles.error_text}>{msg}</div>}
                                    </ErrorMessage>}
                                </div>
                                <div className={styles.info_input}>
                                    <TextField 
                                    id="outlined-basic" 
                                    label="Password" 
                                    variant="outlined" 
                                    type={`password`}
                                    name={`password`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    />
                                    {touched.password && errors.password && 
                                    <ErrorMessage name="password" >
                                    {(msg) => <div className={styles.error_text}>{msg}</div>}
                                    </ErrorMessage>}
                                </div>
                                <div className={styles.submit_container}>
                                <button type="submit" disabled={!isValid && !dirty} className={styles.login_submit}>
                                Login
                                </button>
                                
                                <Link href="/Registration">Dont have an account?</Link>
                                </div> 
                            </form>
                        )}  
            </Formik>
        </div>
    ) 
}