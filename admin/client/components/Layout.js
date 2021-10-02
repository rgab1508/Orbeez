import { Flex } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./navbar/Sidebar";

export default function Layout({ children }) {
  return (
    <Flex direction="column">
      <Navbar />
      <Flex direction="row" w="100%">
        <Sidebar />
        <Flex direction="column" w="100%">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
