/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { loginApi, registerApi } from "../../actions/action";
import { images } from "../../assets/images";
import { cookieKeys, localStorageKeys } from "../../constants/constants";
import { onLogIn } from "../../store/AuthReducer";
import { setLoading } from "../../store/LoadingReducer";
import { setUserData } from "../../store/UserReducer";
import "../../styles/login.scss";
import { setEncryptedCookie, setEncryptedLocalStorage, toastSuccess } from "../../utils/CommonFuncation";

const Login = () => {
	const registerPath = "/register";
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().required().email(),
			password: Yup.string().required()
		}),
		onSubmit: (values) => {
			dispatch(setLoading(true));
			if (registerPath === location?.pathname) {
				registerApi(values).then((res) => {
					if (res.status === 200) {
						// @ts-ignore
						handleReset();
						handleRedirect("/login");
						toastSuccess("you are successfully registered");
					}
					dispatch(setLoading(false));
				});
			} else {
				loginApi(values).then((res) => {
					toastSuccess("You are successfully logged in");
					handleLogin(res.data);
					dispatch(setUserData(res.data));
					dispatch(setLoading(false));
				});
			}
		}
	});

	const handleRedirect = (url: string) => {
		navigate(url);
	};

	const handleLogin = (data: any) => {
		const userData = {
			token: data?.token,
			userId: data?.id
		};
		// for user auth on beta and live
		setEncryptedCookie(cookieKeys.cookieUser, userData);
		setEncryptedLocalStorage(localStorageKeys.userToken, data);
		dispatch(onLogIn());
		handleRedirect("/chat");
	};
	const { values, errors, handleBlur, touched, handleChange, handleSubmit, handleReset } = formik;
	return (
		<div className="login-section">
			<div className="login-main p-40 d-flex flex-column w-100">
				<div className="d-flex align-items-center">
					<img src={images.logo} width={60} />
					<h1 className="ml-10 mb-0 c-black">
						<span className="fw-bold">Data</span>Scribe
					</h1>
				</div>
				<div className="h-100 w-100 p-40 d-flex flex-column justify-content-center align-items-center">
					<div className="d-flex flex-column align-items-center">
						<h1 className="c-black">{location.pathname === registerPath ? "Register" : "Login"}</h1>
						<p className="c-secondary">{location.pathname === registerPath ? "Register" : "Login"} to DataScribe</p>
						<div className="w-100">
							<Label className="c-black">Email</Label>
							<Input className="p-10" onBlur={handleBlur} invalid={Boolean(touched?.email && errors?.email)} value={values.email} onChange={handleChange} name="email" placeholder="Email" />
							{touched?.email && errors?.email && <p className="text-danger mb-0">{errors?.email}</p>}
						</div>
						<div className="mt-20 w-100">
							<Label className="c-black">Password</Label>
							<Input
								className="p-10"
								onBlur={handleBlur}
								invalid={Boolean(touched?.password && errors?.password)}
								placeholder="Password"
								value={values.password}
								onChange={handleChange}
								name="password"
							/>
							{touched?.password && errors?.password && <p className="text-danger mb-0">{errors?.password}</p>}
						</div>
						<Button className="mt-20 w-100 btn-primary" onClick={() => handleSubmit()}>
							{location.pathname === registerPath ? "Register" : "Login"}
						</Button>
						{location.pathname === registerPath ? (
							<p className="c-secondary mt-20">
								You do have an account yet?{" "}
								<span
									className="fw-bold c-primary cursor-pointer"
									onClick={() => {
										// @ts-ignore
										handleReset();
										handleRedirect("/login");
									}}>
									Sing in
								</span>
							</p>
						) : (
							<p className="c-secondary mt-20">
								You don't have an account yet?{" "}
								<span
									className="fw-bold c-primary cursor-pointer"
									onClick={() => {
										// @ts-ignore
										handleReset();
										handleRedirect("/register");
									}}>
									Sing up
								</span>
							</p>
						)}
						<p className="c-secondary">
							By {location.pathname === registerPath ? "signing in" : "signing up"} , you agree to our <span className="c-primary cursor-pointer">Terms & Conditions</span> and our
							<span className="c-primary cursor-pointer"> Privacy policy.</span>
						</p>
					</div>
				</div>
			</div>
			<div className="w-100 login-bg"></div>
		</div>
	);
};

export default Login;
