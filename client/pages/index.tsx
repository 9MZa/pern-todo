import type { NextPage } from "next";
import InputTodo from "../components/InputTodo";
import ListTodos from "../components/ListTodos";
import Layout from "../components/Layout";
import { Title } from "@mantine/core";
const Home: NextPage = () => {
  return (
    <Layout>
      <InputTodo />
      <ListTodos />
    </Layout>
  );
};

export default Home;
