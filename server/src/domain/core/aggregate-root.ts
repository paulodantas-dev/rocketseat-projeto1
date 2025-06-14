export abstract class AggregateRoot<T extends object> {
  protected props: T

  constructor(props: T) {
    this.props = props
  }

  getProps(): T {
    return this.props
  }

  protected touch() {
    if ('updatedAt' in this.props) {
      this.props.updatedAt = new Date()
    }
  }
}
