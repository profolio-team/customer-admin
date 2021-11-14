For start development process run command

```
docker-compose -f docker-compose.yml up --build
```

Setup KeyCloak

http://localhost:8080/auth/admin/master/console/#/realms/master
Login: admin
Password: password

1. On Top Left window side open dropdown and press "Add Realm"
2. Click on "Import: Select file"
3. Select 'main-servises/real.json' file
4. Click "Create"

Open in browser `http://localhost:3000/`
Click on `secured component`
Login: john
Password: 1

After login click on `Send API request`
Expected result: You shoud see json with hardcoded users (Data from backend)
