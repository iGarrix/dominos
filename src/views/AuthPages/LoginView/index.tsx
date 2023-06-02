/* eslint-disable no-empty */
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import style from './loginview.module.scss';
import { DominoApi } from '../../../configurations/apis/DominoApi/domino.api';
import { ILoginByEmailRequest } from '../../../redux/reducers/authReducer/auth.fetch';
import { Form, Formik } from 'formik';
import { LoginByEmailScheme } from '../../../redux/reducers/authReducer/auth.types';
import FormikField from '../../../components/Fields/FormikField';
import {
	faEnvelope,
	faLock,
	faPersonWalkingArrowRight,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { DefButton } from '../../../components/Buttons/DefButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefToast } from '../../../components/Toasts/DefToast';

export const LoginView: React.FC = () => {
	const dispatch = useAppDispatch();
	const nav = useNavigate();
	const { AuthorizateByEmail } = DominoApi.Controllers.AuthController;
	const { isLoad, error } = useAppSelector(state => state.authReducer);

	const loginState: ILoginByEmailRequest = {
		email: '',
		password: '',
	};

	const onSubmitForm = async (values: ILoginByEmailRequest) => {
		try {
			if (values) {
				await dispatch(AuthorizateByEmail(values));
				nav('/admin');
			}
		} catch (error) {}
	};

	return (
		<section className={`${style.loginview} init`}>
			{error && <DefToast error={error} seconds={3000} type={'error'} />}
			<div className="border border-slate-300 rounded-lg py-[2vh] flex flex-col items-center justify-center gap-[3vh]">
				<h1 className="font-rubik text-2xl uppercase">Admin panel</h1>
				<Formik
					initialValues={loginState}
					onSubmit={onSubmitForm}
					validationSchema={LoginByEmailScheme}
				>
					<Form
						className="flex flex-col gap-[1.5vh] px-[3.5vw]"
						autoComplete=""
					>
						<FormikField
							name="email"
							placeholder="Email"
							type="email"
							icon={faEnvelope}
						/>
						<FormikField
							name="password"
							placeholder="Password"
							type="password"
							icon={faLock}
						/>
						<div className="flex w-full justify-between relative mt-[1rem] items-center">
							<FontAwesomeIcon
								icon={faPersonWalkingArrowRight}
								className="text-xl cursor-pointer transition-all hover:scale-105 hover:text-grapefruit"
								onClick={() => {
									nav('/');
								}}
							/>
							{isLoad && (
								<div className="absolute top-0 left-0 w-full h-full z-[100]"></div>
							)}
							<DefButton
								text={
									isLoad ? (
										<span className="flex items-center gap-[1rem]">
											<FontAwesomeIcon
												icon={faSpinner}
												className="animate-spin text-xl"
											/>{' '}
											loading
										</span>
									) : (
										'Authorize'
									)
								}
								type="submit"
							/>
						</div>
					</Form>
				</Formik>
			</div>
		</section>
	);
};
