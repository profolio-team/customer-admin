import MaterialTable from 'material-table';
import { Autocomplete, Box, Button, Container, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { Loader } from '../../components';
import db from '../../services/firebase/firestore';
import { UserInfo } from '../../../../typescript-types/db.types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AutocompleteName } from '../../components/AutocompleteName';

interface UserColumn {
    title: string;
    field: keyof UserInfo;
}

interface FilteringFields {
    name?: string;
    job?: string;
    grade?: string;
    location?: string;
    role?: string;
    department?: string;
    head?: string;
    isActive?: boolean;
}

export function UsersPage() {
    const navigate = useNavigate();
    const [usersCollection] = useCollection(db.collections.users);
    const [filteringParams] = useDocumentData(db.documents.config.userParams);
    const defaultValues: FilteringFields = {};


    const {
        register,
        handleSubmit,
        setValue,
        unregister,
        resetField,
        reset,
        control,
    } = useForm<FilteringFields>({ defaultValues });
    if (!usersCollection || !filteringParams) {
        return <Loader/>;
    }

    // if (!filteringParams) {
    //   return <Loader />;
    // }
    const users: UserInfo[] = usersCollection.docs.map((usersDoc) => usersDoc.data());


    const columns: UserColumn[] = [
        { title: 'Email', field: 'email' },
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Phone', field: 'phone' },
    ];


    const onSubmit: SubmitHandler<FilteringFields> = async (data) => {
        console.log(data);
    };
    return (
        <Container maxWidth="xl" sx={{ padding: '2rem 0' }}>
            <Stack direction={'row'} sx={{ padding: '2rem 0' }} justifyContent={'space-between'}>
                <Typography variant="h2" component="h2">
                    Users
                </Typography>
                <Button variant="contained" onClick={() => navigate('invite')}>
                    Create New User
                </Button>
            </Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing={2}>
                    <Stack direction={'row'} spacing={2}>
                        <AutocompleteName/>
                        {/*<TextField {...register('name')} label={'Name'}/>*/}
                        <Autocomplete
                            disablePortal
                            id="jobs"
                            options={filteringParams.jobs}
                            onChange={(e, options) => setValue('job', options ? options : undefined)}
                            renderInput={(params) => <TextField {...params} label="Job"/>}
                        />

                        <Autocomplete
                            disablePortal
                            id="grades"
                            options={filteringParams.grades}
                            onChange={(e, options) => setValue('grade', options ? options : undefined)}
                            renderInput={(params) => <TextField {...params} label="Grade"/>}
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <Autocomplete
                            disablePortal
                            id="roles"
                            options={filteringParams.roles}
                            onChange={(e, options) => setValue('role', options ? options : undefined)}
                            renderInput={(params) => <TextField {...params} label="Role"/>}
                        />
                        <TextField {...register('department')} label={'Department'}/>
                        <TextField {...register('head')} label={'Head'}/>
                        <Autocomplete
                            disablePortal
                            id="status"
                            options={[
                                {
                                    label: 'Active',
                                    value: true,
                                },
                                {
                                    label: 'Inactive',
                                    value: false,
                                }]}
                            onChange={(e, options) => setValue('isActive', options ? options.value : undefined)}
                            renderInput={(params) => <TextField {...params} label="Role"/>}
                        />
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <Button variant={'contained'} type={'submit'}>Filter</Button>
                        <Button variant={'outlined'}>Clear Filter</Button>
                    </Stack>
                </Stack>

            </form>
            <MaterialTable title={'Users'} columns={columns} data={users}/>
        </Container>
    );
}
