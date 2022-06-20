import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import db from '../services/firebase/firestore';
import { doc, endBefore, limit, orderBy, query, startAfter, updateDoc, where } from 'firebase/firestore';
import { Loader } from './Loader/Loader';

export function AutocompleteName () {
    const [wheres, setWheres] = useState(
        [where('firstName', '>=', 'A'),
            where('firstName', '<=', 'Z')]);

    const [q, setQ] = useState(query(db.collections.users,
        ...wheres,
        where('firstName', '>=', 'G'),
        where('firstName', '<=', 'G~'),
        orderBy('firstName'),
        // where('lastName', '>=', ''),
        // where('lastName', '<=', '~'),
        orderBy('lastName'),
        startAfter(0),
        limit(5),
    ));
    const [users] = useCollectionData(q);

    const createQuery = (name: string) => {
        const fullName = name.split(' ');

        const firsName = fullName[0];
        const lastName = fullName[1];

        if(fullName.length > 1){
            return query(
                db.collections.users,
                where('lastName', '>=', lastName),
                where('lastName', '<=', `${lastName}~`),
                where('firstName', '==', firsName),
                orderBy('firstName'),
                startAfter(0),
                limit(5),
            )
        };

        return query( db.collections.users,
            where('firstName', '>=', name),
            where('firstName', '<=', `${name}~`),
            orderBy('firstName'),
            startAfter(0),
            limit(5),)
    };
    return <Autocomplete
        disablePortal
        id="status"
        options={users ? users.map(u => { return {label: `${u.firstName} ${u.lastName}`}}) : ["Не найдено"]}
        // onChange={(e, options) => }
        renderInput={(params) => <TextField onChange={event => setQ(createQuery(event.target.value))} {...params} label="users"/>}
    />;
}
