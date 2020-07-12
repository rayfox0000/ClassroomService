# ClassroomService

NodeJS Version: 6.9.0

Steps to run
1. Run the MYSQL patch script that is shown below or you can get it from the project directory scripts.

This will be the database patch script for MYSQL
```
CREATE DATABASE `classroom_service`

CREATE TABLE `student` (
	`id` VARCHAR(50) NOT NULL DEFAULT '',
	`email` VARCHAR(50) NOT NULL DEFAULT '',
	PRIMARY KEY (`id`),
	UNIQUE INDEX `id` (`id`)
);

CREATE TABLE `teacher` (
	`id` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `id` (`id`)
);

CREATE TABLE `classroom` (
	`id` VARCHAR(50) NOT NULL,
	`teacher_id` VARCHAR(50) NOT NULL,
	`student_id` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`),
	CONSTRAINT `FK__teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`),
	CONSTRAINT `FK__student` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`)
);

```

2. After running the patch script, you can either type  `npm test`  and run for mocha unit testing. (Currently all the data is hardcoded and testing for successful response only)

3. Other than that, you can run by writting `node app.js` to start up the nodejs service and use postman to api call it. Inside the project, it will contains a file `School Service.postman_collection` which can be import in postman.


Default Port:
3000


API specs :
http://localhost:3000/ (It will direct into swagger UI)
