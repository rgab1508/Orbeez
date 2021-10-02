import { Flex } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({ children }) {
  return (
    <Flex
      flexDirection="column"
      position="relative"
      right={0}
      bg="blue.100"
      w="20vw"
      h="100vh"
    >
      <SidebarItem itemName={"Home"} to={"/"} />
      <SidebarItem itemName={"Ban List"} to={"/banlist"} />
      <SidebarItem itemName={"Skins"} to={"/skins"} />
    </Flex>
  );
}
