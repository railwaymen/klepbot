class StatusModel {
  constructor({ id, name, color }) {
    this.id = id;
    this.name = name || '';
    this.color = color || '';
  }

  toParams = () => ({
    name: this.name,
    color: this.color,
  })
}

export default StatusModel;
