import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useApi } from "../context/expensive";
import { Currency } from "../lib/expensive/currencies";
import { Category } from "../lib/expensive";

export function CreateIncomeModal({
  opened,
  currencies,
  categories,
  close,
}: {
  opened: boolean;
  close: () => void;
  currencies: Currency[];
  categories: Category[];
}) {
  const { income } = useApi();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      amount: 0,
      category: "",
      currency: "",
      note: "",
    },

    validate: {
      amount: (value) => value === 0,
      category: (value) => !categories.map((c) => c.name).includes(value),
      currency: (value) => !currencies.map((c) => c.name).includes(value),
      note: (_value) => false,
    },
  });

  const onSubmit = (
    amount: number,
    note: string,
    currency: string,
    category: string
  ) => {
    const currencyId = currencies.find((c) => c.name === currency)?.id;
    const categoryId = categories.find((c) => c.name === category)?.id;

    income
      ?.create(amount, note, currencyId!, categoryId!)
      .then(console.log)
      .catch(console.log)
      .finally(close);
  };

  return (
    <Modal
      bg="var(--mantine-color-dark-6)"
      opened={opened}
      onClose={close}
      title="Create Income"
    >
      <form
        onSubmit={form.onSubmit(({ category, currency, amount, note }) =>
          onSubmit(amount, note, currency, category)
        )}
      >
        <Select
          label="Currency"
          placeholder="Select currency"
          data={currencies.map((c) => c.name)}
          value={form.getValues().currency}
          onChange={(_value, option) => {
            if (_value) form.setValues({ currency: _value });
          }}
        />

        <Select
          label="Category"
          placeholder="Select category"
          data={categories.map((c) => c.name)}
          value={form.getValues().category}
          onChange={(_value, option) => {
            if (_value) form.setValues({ category: _value });
          }}
        />

        <NumberInput
          label="Amount"
          description="Enter amount"
          value={form.getValues().amount}
          placeholder="e.g 1.23"
          {...form.getInputProps("amount")}
        />

        <TextInput
          key={form.key("note")}
          label="Note"
          placeholder="e.g Salary"
          {...form.getInputProps("note")}
        ></TextInput>

        <Button color="orange.6" type="submit" mt={10} w={"100%"}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
