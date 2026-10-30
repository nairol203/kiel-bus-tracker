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
		<div className='absolute inset-0 z-50 flex items-center justify-center bg-black/70 md:backdrop-blur-xs'>
			<dialog ref={dialogRef} className='border-border bg-surface min-h-screen min-w-screen md:ml-auto md:min-w-100' onClose={onDismiss}>
				{children}
				{/* <button onClick={onDismiss} /> */}
			</dialog>
		</div>,
		document.getElementById('modal-root')!,
	);
}
