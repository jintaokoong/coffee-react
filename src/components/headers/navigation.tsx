import React from 'react';
import {
  Button,
  Classes, Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

const Content = () => {
  return (
    <Menu>
      <MenuItem shouldDismissPopover={false} text={`Signed in as ${'asd'}`} />
      <MenuDivider />
      <MenuItem text={'Profile'} />
      <MenuItem icon={'log-out'} text={'Sign Out'} />
    </Menu>
  );
};

const onLinkClick = (route: string) => (e: any,) => {

}

export const Navigation = () => {
  return <Navbar>
    <NavbarGroup>
      <NavbarHeading>Blueprint</NavbarHeading>
      <NavbarDivider />
      <Button
        className={Classes.MINIMAL}
        icon="home"
        text="Home"
        onClick={onLinkClick('/')}
      />
      <Button
        className={Classes.MINIMAL}
        icon="document"
        text="Dashboard"
        onClick={onLinkClick('/dashboard')}
      />
    </NavbarGroup>
    <NavbarGroup align={'right'}>
      <Button
        className={Classes.MINIMAL}
        text={'Login'}
        onClick={onLinkClick('/login')}
      />

      <Popover2 placement={'bottom-end'} content={<Content />}>
        <Button className={Classes.MINIMAL} icon={'person'} />
      </Popover2>
    </NavbarGroup>
  </Navbar>;
}
