### For start development process, run command

```
docker-compose -f docker-compose.yml up --build
```

### Setup KeyCloak

http://localhost:8080/auth/admin/master/console/#/realms/master

```
Login: admin
Password: password
```

#### Init keycloak data:

1. On Top Left window side open dropdown and press "Add Realm"
2. Click on "Import: Select file"
3. Select 'main-services/real.json' file
4. Click "Create"

---

### Test aplication

1. Open in browser `http://localhost:3000/`
2. Click on `secured component`
3. You will be redirected to keycloak login page

```
Login: john
Password: 1
```

4. After login click on `Send API request`
5. **Expected result:** You shoud see json with hardcoded users (Data from backend)
6. Click logout
7. **Expected result:** You shoud be redirected to login page

---

### Urls

#### http://localhost:40000/ API

#### http://localhost:40001/ AdminPanel

#### http://localhost:40002/ WelcomPage

#### http://localhost:40003/ keyCloak
