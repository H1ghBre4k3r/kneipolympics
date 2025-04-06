export type LabelElementProps = {
  value: string;
  onChange: (value: string) => void;
  readonly: boolean;
};

export function LabelElement({ value, onChange, readonly }: LabelElementProps) {
  return readonly ? (
    value
  ) : (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="small"
    />
  );
}
