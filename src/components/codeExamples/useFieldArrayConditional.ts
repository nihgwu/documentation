export default `import React from 'react';
import { useForm, useWatch, useFieldArray, Control } from 'react-hook-form';

const ConditionField = ({
  control,
  index,
  register,
}: {
  control: Control;
  index: number;
}) => {
  const output = useWatch<any>({
    name: 'data',
    control,
    defaultValue: 'yay! I am watching you :)',
  });

  return (
    <>
      {output[index]?.name === "bill" && (
        <input {...register(\`data[$\{index\}].conditional\`)} />
      )}
      <input
        {...register(\`data[$\{index\}].easyConditional\`)}
        style={{ display: output[index]?.name === "bill" ? "block" : "none" }}
      />
    </>
  );
};

const UseFieldArrayUnregister: React.FC = () => {
  type FormValues = {
    data: { name: string }[];
  };

  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      data: [{ name: 'test' }, { name: 'test1' }, { name: 'test2' }],
    },
    mode: 'onSubmit',
    shouldUnregister: false,
  });
  const { fields } = useFieldArray({
    control,
    name: 'data',
  });
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((data, index) => (
        <>
          <input {...register(\`data[$\{index\}].name\`)} />
          <ConditionField control={control} register={register} index={index} />
        </>
      ))}
      <input type="submit" />
    </form>
  );
};

export default function App() {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      data: [{ name: "test" }, { name: "test1" }, { name: "test2" }]
    },
    mode: "onSubmit"
  });
  const { fields } = useFieldArray<{ name: string }>({
    control,
    name: "data"
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((data, index) => (
        <>
          <input {...register(\`data.\${index}.name\`)} />
          <ConditionField register={register} control={control} index={index} />
        </>
      ))}
      <input type="submit" />
    </form>
  );
};
`
