For start development process run command

```
docker-compose -f docker-compose.yml up --build
```

Setup KeyCloak
https://scalac.io/blog/user-authentication-keycloak-1/

```
cd keycloak-react
npm i
npm run start
```

Where to get Publick Key for backend:

```
http://localhost:8080/auth/admin/master/console/#/realms/master/keys
RS256	RSA	6JrB3BFryap_xpWPh-C3eON0-J4fVcBGhvv3x8JugmU	SIG	100	rsa-generated >>> Publick Key
```

---

### Prepare realm

Open the Keycloak admin console, click on Add Realm, click on import 'Select file',
select realm.json and click Create.
