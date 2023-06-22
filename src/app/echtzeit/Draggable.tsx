'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export default function Draggable({ children }: { children: React.ReactNode }) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [dragging, setDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	useEffect(() => {
		handleScroll();
	}, [sliderRef.current?.scrollWidth]);

	const handleScroll = () => {
		if (sliderRef.current) {
			setShowLeftButton(sliderRef.current.scrollLeft > 10);
			setShowRightButton(sliderRef.current.scrollLeft < sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 10);
		}
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDown(true);
		if (sliderRef.current) {
			setStartX(e.pageX - sliderRef.current.offsetLeft);
			setScrollLeft(sliderRef.current.scrollLeft);
		}
	};

	const handleMouseLeave = () => {
		setIsDown(false);
		setDragging(false);
	};

	const handleMouseUp = () => {
		requestAnimationFrame(() => {
			setIsDown(false);
			setDragging(false);
		});
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDown) return;
		e.preventDefault();
		const walk = e.pageX - startX;

		if (walk !== 0) {
			setDragging(true);
		}
		if (sliderRef.current) {
			sliderRef.current.scrollLeft = scrollLeft - walk;
		}
	};

	const handleScrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: -400,
				behavior: 'smooth',
			});
		}
	};

	const handleScrollRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: 400,
				behavior: 'smooth',
			});
		}
	};

	const handleResetScroll = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollTo({
				left: 0,
			});
		}
	};

	const childrenWithClickHandler = React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, {
				// @ts-expect-error
				onClick: (event: React.MouseEvent<HTMLDivElement>) => {
					if (isDown && dragging) return;
					handleResetScroll();
					if (child.props.onClick) {
						child.props.onClick(event);
					}
				},
			});
		}
		return child;
	});

	const currentMask = showLeftButton && showRightButton ? 'mask' : showLeftButton ? 'left-mask' : showRightButton ? 'right-mask' : '';

	return (
		<>
			{showLeftButton && (
				<button className='absolute px-2.5 py-1.5 z-20 bg-black/25 dark:bg-white/25 rounded-full' onClick={handleScrollLeft}>
					<Image src='/chevron-left.svg' alt='X Icon' height={15} width={15} className='dark:invert' />
				</button>
			)}
			<div
				className={`flex gap-2 whitespace-nowrap overflow-x-auto no-scrollbar ${currentMask}`}
				ref={sliderRef}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onScroll={handleScroll}
			>
				{childrenWithClickHandler}
			</div>
			{showRightButton && (
				<button className='absolute top-0 right-0 px-2.5 py-1.5 z-20 bg-black/25 dark:bg-white/25 rounded-full' onClick={handleScrollRight}>
					<Image src='/chevron-right.svg' alt='X Icon' height={15} width={15} className='dark:invert' />
				</button>
			)}
		</>
	);
}
