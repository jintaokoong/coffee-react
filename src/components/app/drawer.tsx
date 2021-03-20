import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import React, { useCallback, useContext } from 'react';
import { CLOSE_DRAWER, UIContext } from '../../state/context/ui-context';


export const AppDrawer = () => {
  const [uiState, uiDispatch] = useContext(UIContext);
  const handleOnClose = useCallback((event: any) => {
    uiDispatch({ type: CLOSE_DRAWER });
  }, []);
  
  return <Drawer open={uiState.drawerIsOpen} onClose={handleOnClose}>
    <div style={{ width: '250px' }}
      onClick={handleOnClose}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon/>
          </ListItemIcon>
          <ListItemText>Inbox</ListItemText>
        </ListItem>
      </List>
    </div>
  </Drawer>
}