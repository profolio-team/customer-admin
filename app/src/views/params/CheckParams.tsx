import { useParams } from 'react-router-dom';
import { DashboardPage } from '../Dashboard/Dashboard';
import React, { useEffect, useState } from 'react';
import { DepartmentFields, UsersPage } from '../Users/UsersPage';
import { Departments } from '../Department/Departments';
import { NotFoundPage } from '../Error/NotFoundPage';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import db from '../../services/firebase/firestore';
import { FullUserInfo } from '../Users/AllUsers';
import { Loader } from '../../components';
import { currentUsersInDepartments, departmentsNamesAndHeadsNames } from './utils';
import { query, where, limit, startAfter, orderBy, startAt, endAt, endBefore } from 'firebase/firestore';
import { Button } from '@mui/material';


export interface DepartmentInfoTable {
    name: string;
    headName: string;
    headID: string;
    id: string;
    current: number;
}

export function CheckParams() {
    const { page } = useParams();

    const filter = [
        {name: 'grade', value: 'Junior'},
        {name: 'role', value: 'User'},
        {name: 'job', value: 'BA'},
        {name: 'isActive', value: true}
    ];

    const wheres = filter.map(f => where(f.name, '==', f.value))
    const x = where('job', `==`, 'BA');
    const [q, setQ] = useState(query(db.adminUserInfos,
        where('firstName', '>=', 'A'),
        where('firstName', '<=', 'Z'),
        ...wheres,
        orderBy('firstName'),
        startAfter(0),
        limit(1),
    ));

    if (page === undefined) {
        return <DashboardPage/>;
    }
    // setTimeout(() => {
    //     setLast(last+2);
    //     setQ(query(db.adminUserInfos, limit(2), orderBy('firstName'), startAfter(last+2)));
    //     console.log(q);
    //     console.log(last);
    // }, 5000);
    // const q = q;

    const [usersCollection] = useCollection(q);
    const [departmentsCollections] = useCollection(db.departments);
    const goNext = () => {
        if (usersCollection?.docs[usersCollection.docs.length - 1]){

        }
        const lastVisible = usersCollection?.docs[usersCollection.docs.length - 2];
        setQ(query(db.adminUserInfos,
            where('firstName', '>=', 'A'),
            where('firstName', '<=', 'Z'),
            ...wheres,
            orderBy('firstName'),
            startAfter(lastVisible),
            limit(1),
        ))
    }
    //
    // useEffect(() => {
    //     setLast(last+2);
    // }, [usersCollection, q]);
    //
    console.log(usersCollection?.docs.map(d=>d.data().job))

    if (!usersCollection || !departmentsCollections) {
        return <Loader/>;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const NamesAndHeadsNames = departmentsNamesAndHeadsNames(departmentsCollections, usersCollection);
    const users: FullUserInfo[] = usersCollection.docs.map((usersDoc) => {
        return {
            id: usersDoc.id,
            ...usersDoc.data(),
            departmentName: NamesAndHeadsNames.get(usersDoc.data().departmentID)?.name || '',
            headName: NamesAndHeadsNames.get(usersDoc.data().departmentID)?.fullNameHead || '',
        };
    });

    const currentUsers = currentUsersInDepartments(users);
    const departmentsTableData: DepartmentInfoTable[] = departmentsCollections.docs.map(
        (departmentDoc) => {
            return {
                name: departmentDoc.data().name,
                id: departmentDoc.id,
                headName: NamesAndHeadsNames.get(departmentDoc.id)?.fullNameHead || 'Error: Head not find',
                headID: departmentDoc.data().head,
                current: currentUsers[departmentDoc.id],
            };
        },
    );
    const departmentForMenu: DepartmentFields[] = departmentsCollections.docs.map(
        (departmentsDoc) => {
            return {
                name: `${departmentsDoc.data().name}`,
                id: departmentsDoc.id,
            };
        },
    );

    function goBack() {
            const lastVisible = usersCollection?.docs[0];
            setQ(query(db.adminUserInfos,
                where('firstName', '>=', 'A'),
                where('firstName', '<=', 'Z'),
                ...wheres,
                orderBy('firstName'),
                endBefore(lastVisible),
                limit(1),
            ))
    }

    if (page === 'user') {
        return <>
            <Button onClick={goBack} variant={'contained'}>Back</Button>
            <Button onClick={goNext} variant={'contained'}>Next</Button>
            <UsersPage users={users} departmentForMenu={departmentForMenu}/>
        </>
    }

    if (page === 'department') {
        return <Departments departmentsTableData={departmentsTableData} users={users}/>;
    }
    // if (page === 'ebaa') {
    //     return <Ebaat/>;
    // }
    // if (page === 'table'){
    //     return <Table1/>
    // }
    return <NotFoundPage/>;
}

// export function Ebaat() {
//     const [last, setLast] = useState('');
//     const [q, setQ] = useState(query(db.adminUserInfos, orderBy('firstName'), startAfter(0), limit(2)));
//     const [q2, setQ2] = useState(query(db.adminUserInfos, orderBy('firstName'), startAfter(0), limit(2)));
//     const [usersCollection] = useCollection(q);
//     // const [usersCollection1] = useCollection(query(db.adminUserInfos, orderBy('firstName'), startAfter(2), limit(2)));
//     const dep = ['0SydfVnlhwawWAOJEQjT', '8w0UGZxiv6J1wlFq1Z0P'];
//     const hed = ['JF3COQDWPQwOlSTXBV69abOllIto', 'gWr9jCwgIss1lXYVytnuiToVNefN'];
//     const q1 = query(
//         db.adminUserInfos,
//         where('departmentID', 'in', dep),
//     );
//     //count
//     const [usersCollectionDep] = useCollection(q1);
//     useEffect(() => {
//         setQ(query(db.adminUserInfos, orderBy('firstName'), startAfter(last), limit(2)));
//     }, [last]);
//     const onClick = () => {
//         const lastVisible = usersCollection?.docs[usersCollection.docs.length - 1];
//         setLast(lastVisible);
//     };
//     const a = dep.map((d, i) => <div>{usersCollectionDep?.docs.filter(i => i.data().departmentID === d).length}</div>);
//     const b = hed.map((h, i) => <div>{usersCollectionDep?.docs.find(i => i.id === h)?.data().firstName}</div>);
//     const c = dep.map((d, i) => {
//         return {
//             curr: a[i],
//             name: b[i],
//         };
//     });
//     const columns = [
//         {
//             title: 'curr',
//             field: 'curr',
//         },
//         {
//             title: 'Head',
//             field: 'name',
//         },
//     ];
//     // console.log(usersCollectionDep);
//     console.log(usersCollectionDep);
//     // console.log(currentUsersInDepartments(usersCollectionDep));
//     return <>
//         <Button onClick={() => onClick()}>Ebaaa</Button>
//         <>{usersCollection?.docs.map(d => d.data().email)}</>
//         <MaterialTable title={'Dep'} columns={columns} data={c}/>
//
//         {/*<p>{usersCollectionDep?.docs.map(d => `${d.data().firstName} : ${d.data().departmentID}\n`)}</p>*/}
//
//     </>;
//
// }

// export function Table1(){
//     const [q, setQ] = useState(query(db.adminUserInfos, where("firstName", "==", "A"),orderBy('firstName'), startAfter(0), limit(2)));
//     const [usersCollection] = useCollection(q);
//     return <>
//         {/*<MaterialTable title={'Dep'} columns={columns} data={c}/>*/}
//         <Pagination count={10} variant="outlined" shape="rounded" defaultValue={2}/>
//     </>
//
// }