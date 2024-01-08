'use client'

import React, { useContext, useEffect } from "react"
import { TextField } from "@mui/material";
import { Formik,  } from "formik"
import * as yup from 'yup';

import styles from "../login/login.module.css"
import Link from "next/link";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { setUser } from "@/redux/reducers/authorisation";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";

interface IRegistration {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string,
}

export const Registration = () => {
    console.log(auth)

    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter();


    const handlerRegistration = (email:string, password:string , firstName:string , lastname:string )=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user })=>{
                console.log(user)
                const displayName = (firstName + ' ' + lastname) 
                dispatch(setUser({
                    email:user.email,
                    uid:user.uid,
                    token:user.refreshToken,
                    displayName: user.displayName,
                }))
                router.push('/Login')
            })
            .catch(console.error)
    }

    const ValidationsSchema = yup.object().shape({
        firstName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        lastName: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательное поле').min(8,'Min 8 symbols'),
        confirmPassword: yup.string().oneOf([yup.ref('password')],'Пароли не совпадают').required('Обязательное поле'),
        email: yup.string().email('Введите верный Email').required('Обязательное поле'),
    })
    
    return(
        <div className={styles.container}>
                <h2>Registration Form</h2>
                <Formik
                initialValues={{
                    firstName:'',
                    lastName:'',
                    password:'',
                    confirmPassword:'',
                    email:'',
                }}            
                validateOnBlur
                onSubmit ={(values:IRegistration) => {
                    handlerRegistration(values.email,values.password, values.firstName, values.lastName )
                    }}
                validationSchema={ValidationsSchema}
                >
        {({ values,errors,touched,handleChange, handleBlur,isValid,handleSubmit, dirty }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.info_input}>
                                        <TextField 
                                        id="outlined-basic" 
                                        label="First Name" 
                                        variant="outlined" 
                                        type={`text`}
                                        name={`firstName`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstName}
                                        />
                                        {touched.firstName && errors.firstName && 
                                        <p className={styles.error_text}>{errors.firstName}</p>}
                                    </div>
                                    
                                    <div className={styles.info_input}>
                                        <TextField 
                                        id="outlined-basic" 
                                        label="Last Name" 
                                        variant="outlined" 
                                        type={`text`}
                                        name={`lastName`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastName}
                                        />
                                        {touched.lastName && errors.lastName && 
                                        <p className={styles.error_text}>{errors.lastName}</p>}
                                    </div>
                                    
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
                                         <p className={styles.error_text}>{errors.email}</p>}
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
                                         <p className={styles.error_text}>{errors.password}</p>}
                                    </div >

                                    <div className={styles.info_input}>
                                        <TextField 
                                        id="outlined-basic" 
                                        label="Confirm password" 
                                        variant="outlined" 
                                        type={`password`}
                                        name={`confirmPassword`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        />
                                        {touched.confirmPassword && errors.confirmPassword && 
                                        <p className={styles.error_text}>{errors.confirmPassword}</p>} 
                                    </div> 
                                    <div className={styles.submit_container}>                                    
                                        <button 
                                            disabled={!isValid && !dirty}
                                            type="submit"
                                            className={styles.login_submit}
                                        >Submit</button>
                                        <Link href='/Login'>You have account?</Link>
                                     </div>
                                    </form>
                            )}
                </Formik>
        </div>
    )
}