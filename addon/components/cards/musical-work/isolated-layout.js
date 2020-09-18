import Component from '@glimmer/component';

const HEADER_FIELDS = {
  "title": "title",
  "description": "writers"
};

export default class IsolatedLayout extends Component {
  header = HEADER_FIELDS;

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
      description: fields[fieldNameMap.description]
    }
  }
}
