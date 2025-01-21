import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useApi } from "../context/expensive";
import { useCallback } from "react";
import toast from "react-hot-toast";

const TOAST_MESSASGES = {
  loading: "Adding currency...",
  success: "Succesfully added currency.",
};

const CREATE_CURRENCY_NAME_PLACEHOLDER = "Ethereum";
const CREATE_CURRENCY_SYMBOL_PLACEHOLDER = "ETH";

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

  const onCreation = useCallback(() => {
    form.reset();
    close();
    return TOAST_MESSASGES.success;
  }, [form]);

  const onSubmit = useCallback(
    (name: string, symbol: string) => {
      if (currencies) {
        toast.promise(currencies.create(name, symbol), {
          loading: TOAST_MESSASGES.loading,
          success: onCreation,
          error: (err) => err.message,
        });
      }
    },
    [currencies]
  );

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
          placeholder={CREATE_CURRENCY_NAME_PLACEHOLDER}
          {...form.getInputProps("name")}
        />
        <TextInput
          key={form.key("symbol")}
          label="Currency Symbol"
          placeholder={CREATE_CURRENCY_SYMBOL_PLACEHOLDER}
          {...form.getInputProps("symbol")}
        ></TextInput>

        <Button color="orange.6" type="submit" mt={10} w={"100%"}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
