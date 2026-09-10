import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

export function FieldLabel({ children, ...rest }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className="block text-sm font-medium text-charcoal mb-1.5" {...rest}>
      {children}
    </label>
  );
}

const fieldClass =
  "w-full bg-white border border-fog rounded-sm px-3.5 py-2.5 text-sm text-ink placeholder:text-mist focus:outline-none focus:border-brand-red transition-brand";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={clsx(fieldClass, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={clsx(fieldClass, "resize-none", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={clsx(fieldClass, props.className)} />;
}

export function FormRow({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}>{children}</div>;
}

export function FormSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      {title && <p className="text-xs font-semibold uppercase tracking-wide text-stone">{title}</p>}
      {children}
    </div>
  );
}
