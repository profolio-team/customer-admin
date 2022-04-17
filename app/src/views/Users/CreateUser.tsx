import { TextField } from "@mui/material";
import { UserForm } from "./UserForm";
import { AdminUserInfo } from "../../../../typescript-types/db.types";
import { companyName, getFullUrlWithDomain, getRootFullUrl } from "../../utils/url.utils";
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebase";
import { InviteUserRequest, InviteUserResponse } from "../../../../functions/src/callable/user";
import { DepartmentFields } from "./UsersPage";

const inviteUser = httpsCallable<InviteUserRequest, InviteUserResponse>(
  functions,
  "registration-inviteUser"
);

export function CreateUser({ departments }: { departments: DepartmentFields[] }) {
  const [url, setUrl] = useState("");
  const createUser = async (userInfo: AdminUserInfo) => {
    if (!companyName) {
      return;
    }
    const rootDomainUrl = getRootFullUrl();
    const fullDomainUrl = getFullUrlWithDomain(companyName);
    const isAdmin = userInfo.role === "admin";
    const claims = {
      domain: companyName,
      isAdmin,
    };
    const resultFromFunction = await inviteUser({
      rootDomainUrl,
      fullDomainUrl,
      claims,
      userInfo,
    });
    const { result, error, verifyEmailLink } = resultFromFunction.data;
    console.log("registerCompany result:", result);
    if (error) {
      console.log(error);
    } else {
      setUrl(verifyEmailLink);
    }
  };
  return (
    <>
      <TextField value={url} placeholder={"invite url"} />
      <UserForm postUserInfo={createUser} departments={departments} />
    </>
  );
}
