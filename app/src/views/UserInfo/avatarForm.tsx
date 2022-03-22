import { Delete, Photo } from '@mui/icons-material';
import { Avatar, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import PopupState, { bindMenu, bindTrigger, InjectedProps } from 'material-ui-popup-state';
import React, { ChangeEvent, useEffect } from 'react';

export enum EAvatarState {
  NOT_CHANGED = 'NOT_CHANGED',
  SHOULD_UPLOAD_NEW_FILE = 'SHOULD_UPLOAD_NEW_FILE',
  SHOULD_REMOVE = 'SHOULD_REMOVE',
}

export interface IAvatarValue {
  state: EAvatarState;
  file: File | null;
}

export const INITIAL_AVATAR_VALUE: IAvatarValue = {
  state: EAvatarState.NOT_CHANGED,
  file: null,
};

interface IAvatarProps {
  setAvatarValue: (value: IAvatarValue) => void;
  url: string | null;
  avatarValue: IAvatarValue;
}

export function AvatarForm({ avatarValue, setAvatarValue, url }: IAvatarProps) {
  const avatarUrl = avatarValue.file
    ? URL.createObjectURL(avatarValue.file)
    : avatarValue.state === EAvatarState.SHOULD_REMOVE
      ? null
      : url;

  const onFileUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (!file) {
      return;
    }

    setAvatarValue({ state: EAvatarState.SHOULD_UPLOAD_NEW_FILE, file });
  };

  const onPhotoDelete = (popupState: InjectedProps) => {
    setAvatarValue({ state: EAvatarState.SHOULD_REMOVE, file: null });
    popupState.close();
  };

  useEffect(() => setAvatarValue(INITIAL_AVATAR_VALUE), [url]);

  return <PopupState variant="popover"
                     popupId="demo-popup-menu">
    {(popupState) => (
      <>
        <TextField
          type={'file'}
          sx={{ display: 'none' }}
          id="select-image"
          onChange={onFileUpdate}
        />
        <label htmlFor={!avatarUrl ? 'select-image' : ''}>
            <IconButton
              sx={{ height: 160, width: 160 }}
              component="span"
              {...bindTrigger(popupState)}>
                <Avatar draggable="false"
                        sx={{ width: 160, height: 160 }}
                        src={avatarUrl!}/>
            </IconButton>
        </label>
        {avatarUrl && (
          <Menu {...bindMenu(popupState)}>
            <label htmlFor="select-image">
              <MenuItem onClick={popupState.close}>
                <Photo sx={{ paddingRight: '5px' }}/>
                Change Photo
              </MenuItem>
            </label>
            <MenuItem onClick={() => onPhotoDelete(popupState)}>
              <Delete sx={{ paddingRight: '5px' }}/>
              Delete Photo
            </MenuItem>
          </Menu>
        )}
            </>
    )}
  </PopupState>;
}
