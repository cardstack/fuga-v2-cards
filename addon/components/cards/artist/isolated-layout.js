import Component from '@glimmer/component';

const HEADER_FIELDS = {
  "title": "title",
  "description": "role",
  "image": "img-url"
};

const VIEW_FIELDS = [
  "email",
  "website",
  "recordings"
];

export default class IsolatedLayout extends Component {
  header = HEADER_FIELDS;
  viewFields = VIEW_FIELDS;

  get isViewMode() {
    if (!this.args.mode) { return null; }
    return this.args.mode === 'view' || this.args.mode === 'layout';
  }

  get headerFields() {
    if (!this.args.card || !this.args.card.attributes || !this.header) { return null; }
    const fieldNameMap = this.header;
    const fields = this.args.card.attributes;

    return {
      title: fields[fieldNameMap.title],
      description: fields[fieldNameMap.description],
      image: fields[fieldNameMap.image]
    }
  }

  get fieldGroups() {
    if (!this.viewFields || !this.args.fields) { return null; }
    const fieldNames = this.viewFields;
    let fields = [];

    for (let field of fieldNames) {
      fields = [...fields, this.args.fields.find(f => f.name === field)];
    }

    return [{ fields }];
  }
}
