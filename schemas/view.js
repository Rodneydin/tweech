export default {
  name: 'view',
  title: 'View',
  type: 'document',
  fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'text',
        title: 'Text',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'timestamp',
        title: 'Timestamp',
        type: 'datetime',
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  