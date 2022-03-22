import { doc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../hooks/useAuth';
import db from '../../services/firebase/firestore';
import { UserInfoForm } from './userInfoForm';

export function UserInfoPage(): JSX.Element {
  const { uid, user } = useAuth();

  const [userInfoDB] = useDocumentData(
    doc(db.users, uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return userInfoDB && user
    ? <UserInfoForm user={user}
                    userInfo={userInfoDB}
                    uid={uid}/>
    : <>Loading...</>;
}
