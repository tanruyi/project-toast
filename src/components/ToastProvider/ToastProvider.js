import React from 'react';

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

	function createToast(message, variant) {
		// add new toast to array
		const newToasts = [...toasts];
		newToasts.push(new ToastProps(crypto.randomUUID(), message, variant));
		setToasts(newToasts);

		setHasToast(true);
	}

	function dismissToast(id) {
		const newToasts = toasts.filter((element) => element.id !== id);
		setToasts(newToasts);

		setHasToast(newToasts.length > 0);
	}

	const value = React.useMemo(() => {
		return { toasts, hasToast, createToast, dismissToast };
	}, [toasts]);

	return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
