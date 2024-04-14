import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useCurrentUser} from "../../contexts/UserContext/UserContext";
import {LoginFormikValues} from "../../interfaces/formik/LoginFormikValues";
import Axios from "axios";
import {appendUrlSearchParams} from "../../utils/appendUrlSearchParams";
import {Formik} from "formik";
import * as yup from "yup";
import LoginForm from "../../forms/LoginForm";
import Footer from "../../components/Footer/Footer";
import Header from '../../components/Header/Header';
import MainWrapper from "../../components/Wrappers/MainWrapper";
import {toast} from "react-toastify";


const LoginFormikInitialValues: LoginFormikValues = {
    username: "",
    password: ""
}

const LoginFormValidationSchema = yup.object().shape({
    username: yup.string()
        .required(`Username cannot be empty`),
    password: yup.string()
        .required(`Password cannot be empty`)
});

const Login = () => {
    const {logout} = useParams<{ logout: string }>();
    const navigate = useNavigate();
    const {fetchUser, setIsPending} = useCurrentUser();

    const handleSignIn = async (values: LoginFormikValues) => {
        const loginParams = appendUrlSearchParams(values);
        try {
            setIsPending(true);
            const {headers} = await Axios.post('/auth/login', loginParams);

            const accessToken = headers.authorization;
            Axios.defaults.headers.common.Authorization = accessToken;
            localStorage.setItem("JWT_USER_TOKEN", accessToken);

            toast.success("Logged successfully");

            navigate('/');

            await fetchUser();

        } catch (e: any) {
            toast.error("Username or Password incorrect");
        }

    }

    return (
        <>
            <Header>
                {
                    logout
                        ? <>
                            <div>
                                <h3 className="text-light mb-0">Please Sign in Again to continue.</h3>
                            </div>
                            <h4 className="text-danger rounded-pill p-1 mb-0">You have been logout
                                successfully.</h4>
                        </>
                        : <div>
                            <h3 className="text-light mb-0">Please Sign in to continue.</h3>
                        </div>
                }
            </Header>

            <MainWrapper className="bg-light">
                <div className="d-flex flex-column container-fluid align-items-center justify-content-center rounded p-2">
                    <h4>Provide login data.</h4>

                    <Formik<LoginFormikValues>
                        initialValues={LoginFormikInitialValues}
                        onSubmit={handleSignIn}
                        validationSchema={LoginFormValidationSchema}
                    >
                        <LoginForm/>
                    </Formik>

                    <button onClick={() => navigate('/register')} className="btn-secondary mt-5 rounded-pill p-2">
                        Or sign up here, if you don't have an account .
                    </button>
                </div>
            </MainWrapper>

            <Footer/>
        </>
    );
}

export default Login;