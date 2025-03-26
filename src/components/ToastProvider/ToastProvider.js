import React, { useCallback } from 'react';
import { useKeydown } from '../../hooks/use-keydown';

export const ToastContext = React.createContext();

class ToastProps {
	constructor(id, message, variant) {
		this.id = id;
		this.message = message;
		this.variant = variant;
	}
}

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([]);
	const [hasToast, setHasToast] = React.useState(false);

	// memoise the callback passed to useKeydown hook so it does not get regenerated on every render
	const handleEscape = React.useCallback(() => {
		dismissAllToasts();
	}, []);

	useKeydown('Escape', handleEscape);

	const createToast = useCallback(
		(message, variant) => {
			// add new toast to array
			const newToasts = [...toasts];
			newToasts.push(new ToastProps(crypto.randomUUID(), message, variant));
			setToasts(newToasts);

			setHasToast(true);
		},
		[toasts]
	);

	const dismissToast = useCallback(
		(id) => {
			const newToasts = toasts.filter((element) => element.id !== id);
			setToasts(newToasts);

			setHasToast(newToasts.length > 0);
		},
		[toasts]
	);

	function dismissAllToasts() {
		setToasts([]);
		setHasToast(false);
	}

	const value = React.useMemo(() => {
		return { toasts, hasToast, createToast, dismissToast };
	}, [createToast, dismissToast, hasToast, toasts]);

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
