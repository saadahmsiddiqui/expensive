import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useApi } from "../context/expensive";
import { toast } from "react-hot-toast";
import { useCallback } from "react";

const TOAST_MESSAGES = {
  loading: "Creating a category...",
  success: "Succesfully created a category.",
};

const CREATE_CATEGORY_NAME_PLACEHOLDER = "Food, Groceries";

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

  const onCreation = useCallback(() => {
    form.reset();
    close();
    return TOAST_MESSAGES.success;
  }, [form]);

  const onSubmit = useCallback(
    (name: string) => {
      if (categories) {
        // TODO: add icon support for category
        const icon = "";
        toast.promise(categories?.create(name, icon), {
          loading: TOAST_MESSAGES.loading,
          success: onCreation,
          error: (err) => err.message,
        });
      }
    },
    [categories, onCreation]
  );

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
          placeholder={CREATE_CATEGORY_NAME_PLACEHOLDER}
          {...form.getInputProps("name")}
        />

        <Button color="orange.6" type="submit" mt={10} w={"100%"}>
          Create
        </Button>
      </form>
    </Modal>
  );
}
