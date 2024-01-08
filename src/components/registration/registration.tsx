'use client'

import React, { useContext, useEffect } from "react"
import { TextField } from "@mui/material";
import { Formik,  } from "formik"
import * as yup from 'yup';

import styles from "../login/login.module.css"

interface IRegistration {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string,
}

export const Registration = () => {

    const handlerRegistration = (email:string, password:string , firstName:string , lastname:string )=>{
            console.log(`email: ${email} password: ${password} firstName: ${ firstName} lastname: ${lastname}`)
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
                                     </div>
                                    </form>
                            )}
                </Formik>
        </div>
    )
}