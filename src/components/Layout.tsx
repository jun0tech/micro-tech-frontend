import { Outlet } from 'react-router-dom';
import {
  Box,
  Flex,
  Drawer,
  Portal,
  Grid,
  Icon,
} from '@chakra-ui/react';
import { LuMenu, LuX } from 'react-icons/lu';
import SideBar from './SideBar';

export default function Layout() {
  return (
    <Flex bg="bg" h="100vh">
      {/* Desktop Sidebar */}
      <Box
        w="250px"
        borderRight="1px"
        p={3}
        hideBelow="md"
      >
        <SideBar />
      </Box>

      <Box
        flex="1"
        p={4}
        bg="bg.secondary"
      >
        {/* Mobile nav */}
        <Grid
          hideFrom="md"
          justifyContent="flex-end"
          position="absolute"
          top="5"
          right="5"
        >
          <Drawer.Root placement="end">
            <Drawer.Trigger>
              <Icon
                color="fg"
                size="xl"
                _hover={{
                  bg: "transparent"
                }}
              >
                <LuMenu />
              </Icon>
            </Drawer.Trigger>

            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Body bg="bg">
                    <SideBar />
                  </Drawer.Body>
                  <Drawer.CloseTrigger>
                    <Icon
                      color="fg"
                      _hover={{
                        bg: "bg"
                      }}
                      size="sm"
                    >
                      <LuX />
                    </Icon>
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        </Grid>

        {/* Main Content Area */}
        <Grid h="100%" w="100%">
          <Outlet />
        </Grid>
      </Box>
    </Flex>
  );
}
