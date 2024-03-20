# Migraciones y Seeders con Sequelize

## Migraciones

### 1. Instalación de Sequelize CLI

Primero, necesitas instalar Sequelize CLI en tu proyecto. Puedes hacerlo con el siguiente comando:

```bash
npm install --save-dev sequelize-cli
```


### 2. Configuración

Antes de continuar, necesitarás configurar Sequelize CLI para conectarse a la base de datos. Para hacerlo, abre el archivo de configuración predeterminado `config/config.js` y establece las credenciales de la base de datos y el dialecto correctos.

para esto configura tos variables de entorno siguiendo este formato:

`DB_HOST`

`B_PORT`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

`DB_DIAlECT`


### 4. Creación del primer modelo y migración

Una vez que hayas configurado correctamente el archivo de configuración de Sequelize CLI, estás listo para crear tu primera migración. Es tan simple como ejecutar un comando:

#### generar la entidad user
```bash
npx sequelize-cli model:generate --name UserModel --attributes fullName:string,dateOfBirth:date,email:string,password:string,role:enum
```

#### generar la entidad course
```bash
npx sequelize-cli model:generate --name CourseModel --attributes logo:string,title:string,description:text,publicationDate:date,introductoryVideo:string
```

#### generar la entidad lesson
```bash
npx sequelize-cli model:generate --name LessonModel --attributes title:string,description:text,video:string,courseId:integer

```

#### generar la entidad progress course
```bash
npx sequelize-cli model:generate --name CourseProgressModel --attributes "status:enum,approvalDate:date,userId:integer,courseId:integer"

```

#### generar la entidad progress lesson
```bash

npx sequelize-cli model:generate --name LessonProgressModel --attributes "status:enum,userId:integer,lessonId:integer"

```
### 5. Ejecución de las migraciones

Para ejecutar las migraciones pendientes, puedes usar el siguiente comando:

```bash
npm run migration:dev
```



## Seeders

### 1. Creación del seeder

Para crear un seeder, puedes usar el siguiente comando:

```bash
npx sequelize-cli seed:generate --name demo-seeder
```


### 2. Edición del seeder

Abre el archivo del seeder generado y edita la función `up` para insertar los datos que deseas agregar a la tabla.

### 3. Ejecución de los seeders

Para ejecutar los seeders, puedes usar el siguiente comando:

```bash
npm run seed:dev
```
