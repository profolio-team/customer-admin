import { Button, Container, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CompanyInfo, CorporateUserInfo } from '../../../../typescript-types/db.types';
import { doc, endBefore, limit, orderBy, query, startAfter, updateDoc, where } from 'firebase/firestore';
import db from '../../services/firebase/firestore';
import React, { useEffect, useState } from 'react';
import { UsersTable } from './UsersTable';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCollection } from 'react-firebase-hooks/firestore';
import { departmentsNamesAndHeadsNames } from '../params/utils';

export interface FullUserInfo extends CorporateUserInfo {
    id: string;
    departmentName: string;
    headName: string;
}

interface FilterFields {
    grade: string;
    job: string;
}

export function AllUsers() {
    const navigate = useNavigate();
    const [last, setLast] = useState('');
    const [wheres, setWheres] = useState(
        [where('firstName', '>=', 'A'),
            where('firstName', '<=', 'Z')]);
    const { handleSubmit, register } = useForm<FilterFields>();
    const [users, setUsers] = useState<FullUserInfo[]>();
    const [q, setQ] = useState(query(db.adminUserInfos,
        ...wheres,
        where('firstName', '>=', 'A'),
        where('firstName', '<=', 'Z'),
        orderBy('firstName'),
        startAfter(0),
        limit(2),
    ));
    const [usersCollection] = useCollection(q);
    const [departmentsCollections] = useCollection(db.departments);
    console.log(usersCollection);
    console.log(departmentsCollections);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    useEffect(() => {
        if (!departmentsCollections || !usersCollection) {
            return;
        }
        const NamesAndHeadsNames = departmentsNamesAndHeadsNames(departmentsCollections, usersCollection);
        const users: FullUserInfo[] = usersCollection.docs.map((usersDoc) => {
            return {
                id: usersDoc.id,
                ...usersDoc.data(),
                departmentName: NamesAndHeadsNames.get(usersDoc.data().departmentID)?.name || '',
                headName: NamesAndHeadsNames.get(usersDoc.data().departmentID)?.fullNameHead || '',
            };
        });
        setUsers(users);

    }, [usersCollection]);
    const goNext = () => {
        if (usersCollection?.docs[usersCollection.docs.length - 1]) {

        }
        const lastVisible = usersCollection?.docs[usersCollection.docs.length - 2];
        setQ(query(db.adminUserInfos,
            where('firstName', '>=', 'A'),
            where('firstName', '<=', 'Z'),
            ...wheres,
            orderBy('firstName'),
            startAfter(lastVisible),
            limit(2),
        ));
    };

    function goBack() {
        const lastVisible = usersCollection?.docs[0];
        setQ(query(db.adminUserInfos,
            where('firstName', '>=', 'A'),
            where('firstName', '<=', 'Z'),
            ...wheres,
            orderBy('firstName'),
            endBefore(lastVisible),
            limit(2),
        ));
    }

    const onFilter: SubmitHandler<FilterFields> = (data) => {
        console.log(data);
        const wheres = Object.entries(data).map(([key, value]) => where(key, '==', value));
        setQ(query(db.adminUserInfos,
            where('firstName', '>=', 'A'),
            where('firstName', '<=', 'Z'),
            ...wheres,
            orderBy('firstName'),
            startAfter(0),
            limit(2),
        ));
        setWheres(wheres);
    };

    // useEffect(() => {
    //     setQ(query(db.adminUserInfos, orderBy('firstName'), startAfter(last), limit(2)));
    // }, [last]);


    return (
        <Container maxWidth="xl" sx={{ padding: '2rem 0' }}>
            <Stack direction={'row'} sx={{ padding: '2rem 0' }} justifyContent={'space-between'}>
                <Typography variant="h2" component="h2">
                    Users
                </Typography>
                <Button variant="contained" onClick={() => navigate('/user/create')}>
                    Create New User
                </Button>
            </Stack>

            <form onSubmit={handleSubmit(onFilter)}>
                <Stack spacing={'24px'} direction={'row'}>
                    <TextField label={'Name'}{...register('grade')}/>
                    <TextField label={'Job'}{...register('job')}/>
                </Stack>
                <Button type={'submit'}>Filter</Button>
            </form>
            <UsersTable users={users}/>
            <Stack direction={'row'}> <Button onClick={goBack} variant={'contained'}>Back</Button>
                <Button onClick={goNext} variant={'contained'}>Next</Button></Stack>
        </Container>
    );
}
