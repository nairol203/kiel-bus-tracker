import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useEffect } from 'react';
import { Button } from '../styles/Core.styled';
import { StyledBackdrop, StyledModal, StyledModalRoot, StyledModalWrapper } from '../styles/Modal.styled';

interface ModalProps {
	children?: any;
	centered?: boolean;
	onClose: () => void;
	title: string;
	width: string;
	fullScreen?: boolean;
	withCloseButton?: boolean;
}

export default function Modal({ children, centered, onClose, title, width, fullScreen, withCloseButton }: ModalProps) {
	useEffect(() => {
		function close(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose();
			}
		}
		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, []);

	function preventClose(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<StyledModalRoot onClick={onClose}>
			<StyledBackdrop />
			<StyledModalWrapper fullScreen={fullScreen}>
				<StyledModal width={width} centered={centered} fullScreen={fullScreen} onClick={preventClose}>
					<header>
						<h2>{title}</h2>
						<FontAwesomeIcon height={30} width={30} icon={faXmark} onClick={onClose} style={{ cursor: 'pointer' }} />
					</header>
					<div className='modal-content'>{children}</div>
					{withCloseButton && (
						<div className='modal-close-button'>
							<Button variant='secondary' onClick={onClose}>
								Menü schließen
							</Button>
						</div>
					)}
				</StyledModal>
			</StyledModalWrapper>
		</StyledModalRoot>
	);
}
