import { ReactNode } from 'react';
import { Field, type FieldProps } from './Field';
import { Icon } from './Icon';
import './Search.scss';

export type SearchProps = Omit<FieldProps, 'leading' | 'trailing' | 'type' | 'className'> & {
	className?: string;
	fieldClassName?: string;
	leftButton?: ReactNode;
	rightButton?: ReactNode;
	fieldAction?: ReactNode;
	fieldRightButton?: ReactNode;
	hideSearchIcon?: boolean;
	type?: 'search' | 'text';
};

export function Search({
	leftButton,
	rightButton,
	fieldAction,
	fieldRightButton,
	hideSearchIcon = false,
	autoFocus = false,
	value,
	defaultValue,
	placeholder = 'Поиск',
	type = 'search',
	name,
	autoComplete,
	id,
	disabled = false,
	readOnly = false,
	onChange,
	onFocus,
	onBlur,
	onKeyDown,
	label,
	invalid = false,
	className,
	fieldClassName,
	inputClassName,
	'aria-label': ariaLabelProp,
	'aria-labelledby': ariaLabelledBy,
	...fieldProps
}: SearchProps) {
	const ariaLabel = ariaLabelProp ?? (ariaLabelledBy ? undefined : 'Поиск');
	const trailing = fieldAction ?? fieldRightButton;
	const classes = ['ui-search', 'ui-search-bar', className ?? ''].filter(Boolean).join(' ');

	return (
		<div className={classes}>
			{leftButton ? (
				<div className="ui-search__action ui-search-bar__action">{leftButton}</div>
			) : null}

			<Field
				className={['ui-search__field', 'ui-search-bar__field', fieldClassName ?? '']
					.filter(Boolean)
					.join(' ')}
				inputClassName={inputClassName}
				type={type}
				id={id}
				name={name}
				autoFocus={autoFocus}
				autoComplete={autoComplete}
				disabled={disabled}
				readOnly={readOnly}
				value={value}
				defaultValue={defaultValue}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				label={label}
				leading={
					hideSearchIcon ? null : (
						<span className="ui-search__icon ui-search-bar__icon" aria-hidden="true">
							<Icon
								name="search"
								width={24}
								height={24}
								alt=""
								aria-hidden="true"
							/>
						</span>
					)
				}
				trailing={trailing}
				invalid={invalid}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledBy}
				{...fieldProps}
			/>

			{rightButton ? (
				<div className="ui-search__action ui-search-bar__action">{rightButton}</div>
			) : null}
		</div>
	);
}
