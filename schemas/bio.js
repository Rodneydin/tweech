export default {
    name: 'bio',
    title: 'Bio',
    type: 'document',
    fields: [
      {
        name: 'text',
        title: 'Text',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'view',
        title: 'View',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  