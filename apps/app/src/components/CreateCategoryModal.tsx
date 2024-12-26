import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useApi } from "../context/expensive";

export function CreateCategoryModal({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { categories } = useApi();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => value.length <= 0,
    },
  });

  // TODO: add icon support for category
  const icon = "";
  const onSubmit = (name: string) => {
    categories!
      .create(name, icon)
      .then((response) => {
        form.reset();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      })
      .finally(() => close());
  };

  return (
    <Modal
      bg="var(--mantine-color-dark-6)"
      opened={opened}
      onClose={close}
      title="Create Category"
    >
      <form onSubmit={form.onSubmit(({ name }) => onSubmit(name))}>
        <TextInput
          key={form.key("name")}
          label="Category name"
          placeholder="Ethereum"
          {...form.getInputProps("name")}
        />

        <Button color="orange.6" type="submit" mt={10} w={"100%"}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
