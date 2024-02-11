// DrawerApp.js
import React from 'react';
import { Drawer } from 'react-native-paper';

const DrawerApp = ({ isOpen, closeDrawer }) => {
  const [active, setActive] = React.useState('');

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
};

export default DrawerApp;
