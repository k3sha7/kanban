interface CheckBoxProps {
  label: string;
}

const CheckBox = (props: CheckBoxProps) => {
  const { label } = props;
  
  return (
    <label className={`CheckBox ${false ? 'CheckBox--checked' : ''}`}>
      <input type='checkbox' />
      {label}
    </label>
  );
};

export default CheckBox;