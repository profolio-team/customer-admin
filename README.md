### main-services - `microservices for Profolio team`

### customer-services - `microservices for each customer`

------------


### For start development process, run command from main-services folder

```
docker-compose -f docker-compose.yml up --build
```

### Main Urls

http://localhost:40000/ Main API

http://localhost:40001/ Main AdminPanel

http://localhost:40002/ WelcomPage

http://localhost:40003/ keycloak



### Setup KeyCloak

http://localhost:40003/auth/admin/master/console/#/realms/master

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


#### Admin Panel http://localhost:40001/
```
Login: john
Password: 1
```

