import React, { forwardRef, useImperativeHandle } from 'react';
import { Drawer } from 'react-native-paper';

const DrawerApp = forwardRef(({ isOpen, closeDrawer }, ref) => {
  const [active, setActive] = React.useState('');

  useImperativeHandle(ref, () => ({
    openDrawer: () => setActive(true),
    closeDrawer: () => setActive(false),
  }));

  return (
    <Drawer visible={isOpen} onDismiss={closeDrawer} elevation={16}>
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          active={active === 'first'}
          onPress={() => setActive('first')}
        />
        <Drawer.Item
          label="Second Item"
          active={active === 'second'}
          onPress={() => setActive('second')}
        />
      </Drawer.Section>
    </Drawer>
  );
});

export default DrawerApp;
