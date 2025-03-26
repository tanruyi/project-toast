import React from 'react';

export function useKeydown(key, callback) {
	React.useEffect(() => {
		function handleKeydown(event) {
			if (event.code === key) {
				callback(event);
			}
		}

		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
        };
        // since callback is passed as dependency, it will be regenerated on every render
	}, [key, callback]);
}
