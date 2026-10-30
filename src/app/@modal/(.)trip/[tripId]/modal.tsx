'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, type ComponentRef } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const dialogRef = useRef<ComponentRef<'dialog'>>(null);

	useEffect(() => {
		if (!dialogRef.current?.open) {
			dialogRef.current?.showModal();
		}
	}, []);

	function onDismiss() {
		router.back();
	}

	return createPortal(
		<div className='bg-background/80 absolute inset-0 z-50 flex items-center justify-center sm:backdrop-blur-xs'>
			<dialog
				ref={dialogRef}
				className='bg-surface sm:border-border h-full max-h-none w-full max-w-none sm:m-auto sm:h-[75%] sm:max-w-150 sm:rounded sm:border md:w-[80%]'
				onClose={onDismiss}
			>
				{children}
				{/* <button onClick={onDismiss} /> */}
			</dialog>
		</div>,
		document.getElementById('modal-root')!,
	);
}
