import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';

export interface ProtectedRouteProps {
	protectedContent: any;
	elsePath: string;
	getProtected: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	protectedContent,
	...props
}) => {
	if (props.getProtected) {
		return <Fragment>{protectedContent}</Fragment>;
	} else {
		return <Navigate to={props.elsePath} replace />;
	}
};
