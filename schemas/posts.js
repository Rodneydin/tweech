export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
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
    {
      name: 'likes_count',
      title: 'Likes Count',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'reposts_count',
      title: 'Reposts Count',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image', // Change the type to 'image'
      options: {
        hotspot: true,
      },
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'object',
      fields: [
        {
          name: 'id',
          title: 'ID',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'username',
          title: 'Username',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'string',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'followers_count',
          title: 'Followers Count',
          type: 'number',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
