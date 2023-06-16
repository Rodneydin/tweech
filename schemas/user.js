export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'followers_count',
      title: 'Followers Count',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'following_count',
      title: 'Following Count',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'url',
      hotspot: true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'views',
              title: 'Views',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'notificationPref',
      title: 'Notification Preference',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'feedback',
      title: 'Feedback',
      type: 'string',
    },
  ],
};
