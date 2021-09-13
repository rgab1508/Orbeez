import { Flex, Text } from "@chakra-ui/react";

export default function Sidebar({ children }) {
  return (
    <Flex position="relative" right={0} bg="blue" w="15vw" h="100vh"></Flex>
  );
}
