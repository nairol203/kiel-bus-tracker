import { useClickOutside } from '@mantine/hooks';
import { cloneElement, TouchEvent, useState } from 'react';
import { StyledDropdown } from '../styles/Dropdown.styled';

interface DropdownProps {
	trigger: JSX.Element;
	menu: JSX.Element[];
}

export default function Dropdown({ trigger, menu }: DropdownProps) {
	const [control, setControl] = useState();
	const [isOpen, setOpen] = useState(false);
	// @ts-expect-error
	useClickOutside(() => setOpen(false), null, [control, isOpen]);

	return (
		<StyledDropdown>
			{cloneElement(trigger, {
				ref: setControl,
				onClick: () => setOpen(!isOpen),
			})}
			{isOpen && (
				// @ts-expect-error
				<ul ref={setOpen}>
					<div>
						<div></div>
					</div>
					{menu.map((menuItem, index) => (
						<li key={index}>{menuItem}</li>
					))}
				</ul>
			)}
		</StyledDropdown>
	);
}
