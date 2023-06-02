import { useField } from 'formik';
import { IFormikField } from './formikfield.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './formikfield.module.scss';
import { useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const FormikField: React.FC<IFormikField> = ({
	placeholder,
	type,
	...props
}) => {
	const [field, meta] = useField(props);

	const [isPassword, setPassState] = useState(() => {
		if (type === 'password') {
			return true;
		}
		return false;
	});

	return (
		<div
			className={`${style.formikfieldWrapper} ${
				meta.error ? style.error : style.success
			}`}
		>
			{props.icon && (
				<>
					{type === 'password' ? (
						isPassword ? (
							<FontAwesomeIcon
								className={`${type === 'password' && style.icon}`}
								icon={props.icon}
								onClick={() => {
									setPassState(!isPassword);
								}}
							/>
						) : (
							<FontAwesomeIcon
								className={`${type === 'password' && style.icon}`}
								icon={faEye}
								onClick={() => {
									setPassState(!isPassword);
								}}
							/>
						)
					) : (
						<FontAwesomeIcon
							icon={props.icon}
							onClick={() => {
								setPassState(!isPassword);
							}}
						/>
					)}
				</>
			)}
			<input
				type={type === 'password' ? (isPassword ? type : 'text') : type}
				id={field.name}
				disabled={props.disable}
				defaultValue={meta.value}
				placeholder={placeholder}
				onChange={field.onChange}
				onBlur={field.onBlur}
				name={field.name}
				className={`${style.inp} ${
					props.icon ? style.ificon : style.ifnoicon
				} ${meta.error ? style.error : style.success}`}
			/>
		</div>
	);
};

export default FormikField;
