import {
  Flex,
  Table,
  Thead,
  Th,
  Td,
  Tr,
  Text,
  Tbody,
  Menu,
  MenuButton,
  MenuIcon,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";

export default function BanList() {
  return (
    <>
      <Head>
        <title>Ban List</title>
      </Head>
      <Flex flexDirection="column" p="5px" mt={10}>
        <Text fontWeight="bold" fontSize="2xl" textAlign="center">
          BAN LIST
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>IP</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>100.0.0.1</Td>
              <Td>
                <Menu>
                  <MenuButton as={Button}>Options</MenuButton>
                  <MenuList>
                    <MenuItem>Ban</MenuItem>
                    <MenuItem>Unban</MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </>
  );
}
