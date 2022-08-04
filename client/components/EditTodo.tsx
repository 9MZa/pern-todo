import { useState } from "react";
import { Modal, Stack, Button, Group, Input } from "@mantine/core";
import { Edit } from "tabler-icons-react";

const EditTodo = ({ todo }: any) => {
  const [opened, setOpened] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e: any) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`http://localhost:5500/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setOpened(false);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => (setOpened(false), setDescription(todo.description))}
        title="Edit Todo"
      >
        <Stack>
          <Input
            type="text"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
          <Button
            leftIcon={<Edit />}
            onClick={(e: any) => updateDescription(e)}
            color="yellow"
          >
            Edit
          </Button>
        </Stack>
      </Modal>
      <Group position="center">
        <Button
          leftIcon={<Edit />}
          variant="subtle"
          color="yellow"
          onClick={() => setOpened(true)}
        >
          Edit
        </Button>
      </Group>
    </>
  );
};

export default EditTodo;
