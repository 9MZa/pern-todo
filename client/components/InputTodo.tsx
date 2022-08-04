import { useState } from "react";
import {
  Input,
  Button,
  Container,
  Stack,
  Modal,
  Box,
  Title,
  Group,
  Space,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const [opened, setOpened] = useState(false);

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch("http://localhost:5500/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Box
        sx={(theme) => ({
          paddingTop: theme.spacing.xl,
          paddingBottom: theme.spacing.xl,
          display: "flex",
          justifyContent: "space-between",
        })}
      >
        <Title
          sx={(theme) => ({
            color: theme.colors.gray[8],
          })}
        >
          TODO TODAY.
        </Title>
        <Button
          leftIcon={<Plus />}
          color="teal"
          variant="light"
          onClick={() => setOpened(true)}
        >
          Add
        </Button>
      </Box>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Todo">
        <form onSubmit={onSubmitForm}>
          <Stack>
            <Input
              size="lg"
              type="text"
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
            />
            <Button
              color="teal"
              leftIcon={<Plus />}
              size="lg"
              disabled={description.length < 1 ? true : false}
              onClick={onSubmitForm}
            >
              Add Todo
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default InputTodo;
