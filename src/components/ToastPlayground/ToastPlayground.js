import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

class ToastProps {
	constructor(id, message, variant, display) {
		this.id = id;
		this.message = message;
		this.variant = variant;
		this.display = display;
	}
}

function ToastPlayground() {
	const [message, setMessage] = React.useState('');
	const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
	const [toasts, setToasts] = React.useState([]);

	const showToastShelf = toasts.some((element) => element['display'] === true);

	function createToast(event) {
		// prevent web page from reloading
		event.preventDefault();

		// add new toast to array
		const newToasts = [...toasts];
		newToasts.push(new ToastProps(crypto.randomUUID(), message, variant, true));
		setToasts(newToasts);

		// reset input fields
		setMessage('');
		setVariant(VARIANT_OPTIONS[0]);
	}

	function dismissToast(id) {
		const newToasts = toasts.filter((element) => element.id !== id);
		setToasts(newToasts);
	}

	return (
		<div className={styles.wrapper}>
			<header>
				<img alt='Cute toast mascot' src='/toast.png' />
				<h1>Toast Playground</h1>
			</header>

			{showToastShelf && <ToastShelf toasts={toasts} dismissToast={dismissToast}></ToastShelf>}
			<form onSubmit={(event) => createToast(event)} className={styles.controlsWrapper}>
				<div className={styles.row}>
					<label htmlFor='message' className={styles.label} style={{ alignSelf: 'baseline' }}>
						Message
					</label>
					<div className={styles.inputWrapper}>
						<textarea
							id='message'
							className={styles.messageInput}
							value={message}
							onChange={(event) => {
								setMessage(event.target.value);
							}}
						/>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label}>Variant</div>
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						{VARIANT_OPTIONS.map((option) => {
							const id = `variant-${option}`;
							return (
								<label key={id} htmlFor={id}>
									<input
										id={id}
										type='radio'
										name='variant'
										value={option}
										checked={variant === option}
										onChange={(event) => {
											setVariant(event.target.value);
										}}
									/>
									{option}
								</label>
							);
						})}
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label} />
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						<Button>Pop Toast!</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ToastPlayground;
