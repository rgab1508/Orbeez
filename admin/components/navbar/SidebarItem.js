import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function SidebarItem({ itemName, to, props }) {
  return (
    <Link href={to}>
      <Flex
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        {...props}
        w="100%"
        p="10px"
        _hover={{ bg: "blue.400", color: "white" }}
        color="blue.400"
        {...props}
      >
        <Text fontSize="20pt" fontWeight="bold">
          {itemName}
        </Text>
      </Flex>
    </Link>
  );
}
