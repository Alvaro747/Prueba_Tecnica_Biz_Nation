import {CourseProgressStatus} from "@/enums/course-progress-status.enum";
import {ICourseProgressModel} from "@/interfaces";
import {Model, Sequelize} from "sequelize";

export default (sequelize: Sequelize, DataTypes: any) => {
  class CourseProgressModel
    extends Model<ICourseProgressModel>
    implements ICourseProgressModel
  {
    public status!: CourseProgressStatus;
    public approvalDate!: Date | null;
    public userId!: number;
    public courseId!: number;

    static associate(models: any): void {
      // Many-to-one relationship with UserModel
      this.belongsTo(models.UserModel, {
        foreignKey: "userId",
        as: "user", // Optional name for the association
      });

      // Many-to-one relationship with CourseModel
      this.belongsTo(models.CourseModel, {
        foreignKey: "courseId",
        as: "course", // Optional name for the association
      });
    }
  }

  CourseProgressModel.init(
    {
      status: DataTypes.ENUM("pending", "in_progress", "completed"),
      approvalDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseProgressModel",
      paranoid: true,
    }
  );

  // Hook to update the "Approved Date" when the status changes to "approved".
  CourseProgressModel.beforeUpdate(async (courseProgress: any, options) => {
    const previousCourseProgress = await CourseProgressModel.findByPk(
      courseProgress.id
    );
    if (
      courseProgress.status === "completed" &&
      previousCourseProgress?.status !== "completed"
    ) {
      courseProgress.approvalDate = new Date();
    }
  });

  return CourseProgressModel;
};
