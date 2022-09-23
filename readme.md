# CONCERTS API

## Setup

* ### Creating the database

Create a `concerts` table in MySQL Workbench using the SQL query:

```sql
CREATE SCHEMA `concerts`;

CREATE TABLE `concerts`.`concerts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL,
  `band` VARCHAR(255) NULL,
  `venue` VARCHAR(255) NULL,
  `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `performance_date` DATETIME NULL,
  `price` INT(45) NULL,
  PRIMARY KEY (`id`));
```

* ### .env file

Create a `.env` file in this week's root directory (`/Nodejs-exercise-template/week3`).

Fill the `.env` file with the credentials:
```
DB_HOST = 127.0.0.1
DB_USER = root
DB_PASSWORD = <replace with db_password!>
DB_NAME = <replace with db_name!>
DB_PORT = 3306

NODE_ENV=development
```

Setup and run the server in the same way as in the previous weeks.


## Requirements

## Routes

| Url                 | Verb   | Functionality               | Example              |
| ------------------- | ------ | --------------------------- | -------------------- |
| `api/concerts/`     | GET    | Returns all concerts        | `GET api/concerts/`  |
| `api/concerts/`     | POST   | Adds a new concert          | `POST api/concerts/` |
| `api/concerts/{id}` | GET    | Returns concert by `id`     | `GET api/concerts/2` |
| `api/concerts/{id}` | PUT    | Updates the concert by `id` | `PUT api/concerts/2` |
| `api/concerts/{id}` | DELETE | Deletes the concert by `id` | `DELETE api/concerts/2`  |

## Query parameters

| Parameter      | Description                                                                                                       | Data type | Example                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------- |
| `maxPrice`     | Get concerts that has a price smaller than `maxPrice`                                                             | Number    | `api/concerts?maxPrice=160`               |
| `title`        | Get concerts that partially match a title. `Metallic` will match the concert with the title `Metallica in Parken` | String    | `api/concerts?title=metallic`          |
| `createdAfter` | Get concerts that has been created after the date                                                                 | Date      | `api/concerts?createdAfter=2019-04-05` |
| `band`         | Get concerts with a specific band                                                                                 | String    | `api/concerts?band=metallica`          |


* Using `postman` insert some concerts, get some concerts using query parameters, delete some concerts and update some concerts
