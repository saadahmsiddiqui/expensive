import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useApi } from "../context/expensive";

export function CreateCurrencyModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { currencies } = useApi();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      symbol: "",
    },

    validate: {
      name: (value) => value.length <= 0,
      symbol: (value) => value.length <= 0 || value.match(/a-z/),
    },
  });

  const onSubmit = (name: string, symbol: string) => {
    currencies!
      .create(name, symbol)
      .then((response) => {
        console.log(response);
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => close());
  };

  return (
    <Modal
      bg="var(--mantine-color-dark-6)"
      opened={opened}
      onClose={close}
      title="Create Currency"
    >
      <form
        onSubmit={form.onSubmit(({ name, symbol }) => onSubmit(name, symbol))}
      >
        <TextInput
          key={form.key("name")}
          label="Currency name"
          placeholder="Ethereum"
          {...form.getInputProps("name")}
        />
        <TextInput
          key={form.key("symbol")}
          label="Currency Symbol"
          placeholder="ETH"
          {...form.getInputProps("symbol")}
        ></TextInput>

        <Button color="orange.6" type="submit" mt={10} w={"100%"}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
