import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from './lib/cn';
import './Field.scss';

export type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	label?: ReactNode;
	leading?: ReactNode;
	trailing?: ReactNode;
	invalid?: boolean;
	className?: string;
	inputClassName?: string;
};

export function Field({
	label,
	leading,
	trailing,
	invalid = false,
	disabled = false,
	readOnly = false,
	className,
	inputClassName,
	...inputProps
}: FieldProps) {
	const classes = cn(
		'ui-field',
		label ? 'ui-field--with-label' : '',
		invalid ? 'ui-field--invalid' : '',
		disabled ? 'ui-field--disabled' : '',
		readOnly ? 'ui-field--readonly' : '',
		className,
	);

	const resolvedInputClassName = cn('ui-field__input', inputClassName);

	return (
		<label className={classes}>
			{leading ? <span className="ui-field__leading">{leading}</span> : null}

			<span className="ui-field__content">
				{label ? <span className="ui-field__label">{label}</span> : null}
				<input
					{...inputProps}
					className={resolvedInputClassName}
					disabled={disabled}
					readOnly={readOnly}
					aria-invalid={invalid || undefined}
				/>
			</span>

			{trailing ? <span className="ui-field__trailing">{trailing}</span> : null}
		</label>
	);
}
