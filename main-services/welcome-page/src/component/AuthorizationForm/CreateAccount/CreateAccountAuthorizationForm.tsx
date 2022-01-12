import React, { useContext, useState } from "react";
import styles from "../AuthorizationForm.module.css";
import { Button, Input } from "../../";
import { AuthContext } from "../../../store";
import { useNavigate } from "react-router-dom";

export const CreateAccountAuthorizationForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [adminInfo, setAdminInfo] = useState({
    email: "",
    company: "",
    policy: true,
  });

  const onChangeHander = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setAdminInfo({
      ...adminInfo,
      [name]: value,
    });
  };

  const isValidForm = (): boolean => {
    return adminInfo.policy && adminInfo.email.length > 1 && adminInfo.company.length > 1;
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errorMessage = await signup(adminInfo.email, adminInfo.company);
    if (!errorMessage) {
      navigate("/check-email");
    } else {
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Create Account</h1>

        <Input
          title={"Email Address"}
          type="email"
          placeholder={"Type your corporate Email"}
          name="email"
          onChange={onChangeHander}
          value={adminInfo.email}
        />

        <div className={styles.addressContainer}>
          <Input
            title={"Your company's portfolio adress"}
            placeholder={"Type your company name"}
            value={adminInfo.company}
            name="company"
            onChange={onChangeHander}
          />
          <span className={styles.profolioCreateAccount}>.profolio.com</span>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type={"checkbox"}
            name="policy"
            onChange={(e) => {
              setAdminInfo({
                ...adminInfo,
                policy: e.currentTarget.checked,
              });
            }}
            checked={adminInfo.policy}
          />
          <p className={styles.checkboxDescription}>
            By creating an account, you agree to our
            <a href="#TermsOfService">Terms of Service</a>
            and have read and understood the
            <a href="#Privacy">Privacy Policy</a>.
          </p>
        </div>

        <Button disabled={!isValidForm()} color={"blue"} type="submit" className={styles.button}>
          Create
        </Button>
      </div>
    </form>
  );
};
