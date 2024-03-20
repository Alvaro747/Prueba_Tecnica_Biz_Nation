"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert users
    await queryInterface.bulkInsert(
      "UserModels",
      [
        {
          fullName: "John Doe",
          dateOfBirth: new Date("1990-01-01"),
          email: "john@example.com",
          password: "password1",
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Jane Smith",
          dateOfBirth: new Date("1985-05-15"),
          email: "jane@example.com",
          password: "password2",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    // Obtener los IDs de los usuarios recién insertados
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM UserModels",
      {type: Sequelize.QueryTypes.SELECT}
    );
    const userIds = users.map((user) => user);

    // Insert courses
    await queryInterface.bulkInsert(
      "CourseModels",
      [
        {
          logo: "https://example.com/logo1.png",
          title: "Introduction to Programming",
          description:
            "A beginner-friendly course on programming fundamentals.",
          publicationDate: new Date(),
          introductoryVideo: "https://example.com/intro1.mp4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          logo: "https://example.com/logo2.png",
          title: "Web Development",
          description: "Learn web development from scratch.",
          publicationDate: new Date(),
          introductoryVideo: "https://example.com/intro2.mp4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    // Obtener los IDs de los usuarios recién insertados
    const courses = await queryInterface.sequelize.query(
      "SELECT id FROM CourseModels",
      {type: Sequelize.QueryTypes.SELECT}
    );
    const coursesIds = courses.map((course) => course);

    // Insert lessons
    await queryInterface.bulkInsert(
      "LessonModels",
      [
        {
          title: "Variables and Data Types",
          description: "Learn about variables and data types in programming.",
          video: "https://example.com/variables.mp4",
          courseId: coursesIds[0].id, // ID of the first created course
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "HTML Basics",
          description: "Introduction to HTML for web development.",
          video: "https://example.com/html.mp4",
          courseId: coursesIds[1].id, // ID of the second created course
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {returning: true}
    );
    // Obtener los IDs de los usuarios recién insertados
    const lessons = await queryInterface.sequelize.query(
      "SELECT id FROM LessonModels",
      {type: Sequelize.QueryTypes.SELECT}
    );
    const lessonsIds = lessons.map((lesson) => lesson);

    // Insert course progress
    await queryInterface.bulkInsert(
      "CourseProgressModels",
      [
        {
          status: "in_progress",
          userId: userIds[0].id, // ID of the first created user
          courseId: coursesIds[0].id, // ID of the first created course
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Insertar progreso de la lección
    await queryInterface.bulkInsert(
      "LessonProgressModels",
      [
        {
          status: "in_progress",
          userId: userIds[0].id, // ID del primer usuario creado
          lessonId: lessonsIds[0].id, // ID de la primera lección creada
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Delete all inserted data from tables
    await queryInterface.bulkDelete("UserModels", null, {});
    await queryInterface.bulkDelete("CourseModels", null, {});
    await queryInterface.bulkDelete("LessonModels", null, {});
    await queryInterface.bulkDelete("CourseProgressModels", null, {});
    await queryInterface.bulkDelete("LessonProgressModels", null, {});
  },
};
