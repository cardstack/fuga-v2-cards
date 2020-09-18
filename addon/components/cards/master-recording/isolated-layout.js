import Component from '@glimmer/component';

// TODO: Move this data elsewhere
const SECTIONS = [
  {
    "id": "master-details",
    "title": "Master Details",
    "fieldNames": [
      "title",
      "artist",
      "label",
      "genre",
      "duration",
      "language",
      "recording-date",
      "release-date",
      "parental-advisory",
      "copyright"
    ]
  },
  {
    "id": "registrations",
    "title": "Registrations",
    "fieldNames": ["verifi-id"]
  },
  {
    "id": "files",
    "title": "Files",
    "fieldNames": ["cover-art"]
  },
  {
    "id": "codes",
    "title": "Codes",
    "fieldNames": ["isrc", "catalog-no"]
  },
  {
    "id": "credits",
    "title": "Credits",
    "fieldNames": [
      "artist",
      "producer",
      "mastering-engineer",
      "mixing-engineer",
      "recording-engineer",
      "background-singer"
    ]
  }
];

// TODO: truncated-verifi-id should be a computed
const HEADER_FIELDS = {
  "title": "title",
  "description": "artist",
  "image": "cover-art",
  "fields": [
    "isrc",
    "truncated-verifi-id",
    "label"
  ]
};

export default class IsolatedLayout extends Component {
  header = HEADER_FIELDS;
  sections = SECTIONS;

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

  get headerDetailFields() {
    if (!this.header || !this.header.fields || !this.args.fields) { return null; }
    const fieldNames = this.header.fields;
    let fields = [];

    for (let field of fieldNames) {
      fields = [...fields, this.args.fields.find(f => f.name === field)];
    }

    return fields;
  }

  get fieldGroups() {
    if (!this.sections || !this.args.fields) { return null; }
    let groups = [];

    for (let s of this.sections) {
      let { id, title, fieldNames } = s;
      let fields = [];

      if (fieldNames) {
        for (let field of fieldNames) {
          fields = [...fields, this.args.fields.find(f => f.name === field)];
        }
      }

      groups = [...groups, {
        id,
        title,
        fields
      }];
    }

    return groups;
  }
}
