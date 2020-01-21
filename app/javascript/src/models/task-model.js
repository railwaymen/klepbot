class TaskModel {
  constructor({ id, user, created_at, created_by, user_id, send_at, description }) {
    this.id = id;
    this.user = user;
    this.createdAt = created_at;
    this.createdBy = created_by;
    this.userId = user_id;
    this.sendAt = send_at;
    this.description = description;
  }

  toParams = () => ({
    created_by: this.createdBy,
    user_id: this.userId,
    description: this.description,
    send_at: this.sendAt,
  });
}

export default TaskModel;
