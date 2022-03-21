import { Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, createContext, useContext, useEffect, useState } from 'react';
import db from '../../services/firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { UserInfoDB } from '../../../../typescript-types/db.types';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { updateProfile, User } from 'firebase/auth';
import PopupState, { bindMenu, bindTrigger, InjectedProps } from 'material-ui-popup-state';
import { Delete, Photo } from '@mui/icons-material';
import { ErrorMessage } from '@hookform/error-message';
import {
    VALIDATION_HELPER_ONLY_LATTER,
    VALIDATION_HELPER_THIS_IS_REQUIRED,
    VALIDATION_REGEXP_ONLY_LATTER,
} from './constants';

export interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    phone: string;
    linkedIn: string;
}

enum EAvatarState {
    NOT_CHANGED = 'NOT_CHANGED',
    SHOULD_UPLOAD_NEW_FILE = 'SHOULD_UPLOAD_NEW_FILE',
    SHOULD_REMOVE = 'SHOULD_REMOVE',
}

interface IAvatarValue {
    state: EAvatarState;
    file: File | null;
}

const INITIAL_AVATAR_VALUE: IAvatarValue = {
    state: EAvatarState.NOT_CHANGED,
    file: null,
};

const AvatarFormContext = createContext(INITIAL_AVATAR_VALUE);

function AvatarForm({ onChange, url }: { onChange: (value: IAvatarValue) => void, url: string | null }) {
    const {  } = useContext(AvatarFormContext);
    const avatarUrl = avatarValue.file ? URL.createObjectURL(avatarValue.file) : url;

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
    useEffect(() => onChange(avatarValue), [avatarValue]);

    return <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
            <>
                <TextField
                    type={'file'}
                    sx={{ display: 'none' }}
                    id="select-image"
                    onChange={onFileUpdate}
                />
                <label>
                    <IconButton
                        sx={{ height: 160, width: 160 }}
                        component="span"
                        {...bindTrigger(popupState)}>
                        <Avatar sx={{ width: 160, height: 160 }}
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

interface UserInfoProps {
    preloadedValues: Inputs;
    user: User;
    uid: string;
}

export function UserInfoForm({ preloadedValues, user, uid }: UserInfoProps): JSX.Element {
    const [defaultValues, setDefaultValues] = useState<Inputs>(preloadedValues);
    const {
        register,
        formState: { errors, isDirty },
        setValue,
        reset,
        handleSubmit,
    } = useForm<Inputs>({ defaultValues });
    const optionsInput = {
        required: VALIDATION_HELPER_THIS_IS_REQUIRED,
        pattern: {
            value: VALIDATION_REGEXP_ONLY_LATTER,
            message: VALIDATION_HELPER_ONLY_LATTER,
        },
    };
    const [avatarValue, setAvatarValue] = useState<IAvatarValue>(INITIAL_AVATAR_VALUE);

    const cancelChanges = () => {
        reset(defaultValues);
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!isDirty) {
            return;
        }

        if (avatarValue.state === EAvatarState.SHOULD_UPLOAD_NEW_FILE) {
            await avatarUpdate(avatarValue.file!);
        }

        if (avatarValue.state === EAvatarState.SHOULD_REMOVE) {
            await deleteAvatar();
        }

        const userInfo: UserInfoDB = {
            about: data.about,
            lastName: data.lastName,
            firstName: data.firstName,
            linkedInUrl: data.linkedIn,
            phone: data.phone,
        };

        await setDoc(doc(db.users, uid), userInfo);

        setDefaultValues({ ...data });
    };

    async function deleteAvatar() {
        await updateProfile(user, {
            photoURL: '',
        });
    }

    async function avatarUpdate(avatarToUpdate: File) {
        const storageRef = ref(storage, `images/avatars/${uid}`);
        const uploadTask = await uploadBytes(storageRef, avatarToUpdate);
        await updateProfile(user, {
            photoURL: await getDownloadURL(uploadTask.ref),
        });
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: '48px' }}>
                    <Box sx={{ paddingBottom: '24px' }}>
                        <Typography variant="h2" component="h2">
                            User Info
                        </Typography>
                    </Box>
                    <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <AvatarForm onChange={} url={}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Stack spacing={'24px'} width={316} paddingLeft={'22.66px'}>
                                <TextField
                                    label={'First Name'}
                                    error={!!errors.firstName}
                                    helperText={<ErrorMessage errors={errors} name="firstName"/>}
                                    placeholder={'Enter your first name'}
                                    {...register('firstName', { ...optionsInput })}
                                />
                                <TextField
                                    label={'Last Name'}
                                    {...register('lastName', { ...optionsInput })}
                                    placeholder={'Enter your last name'}
                                    error={!!errors.lastName}
                                    helperText={<ErrorMessage errors={errors} name="lastName"/>}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <TextField
                        label={'Email'}
                        {...register('email', { required: false })}
                        disabled={true}
                        placeholder={'Placeholder'}
                    />
                    <TextField
                        multiline
                        rows={4}
                        label={'About'}
                        {...register('about', { required: false })}
                        placeholder={'Provide short description about yourself'}
                    />
                    <TextField
                        label={'Phone'}
                        {...register('phone', { required: false })}
                        placeholder={'+XXX (XX) XXX-XX-XX'}
                    />
                    <TextField
                        label={'LinkedIn'}
                        {...register('linkedIn', { required: false })}
                        placeholder={'Enter your LinkedIn URL'}
                    />
                    <Stack paddingTop={'40px'} spacing={2} direction={'row'}>
                        <Button variant={'contained'} type="submit">
                            Save Changes
                        </Button>
                        <Button variant={'outlined'} onClick={cancelChanges}>
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Container>
    );
}
