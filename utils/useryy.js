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
      type: 'image',
      hotspot:true,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tweets',
      title: 'Tweets',
      type: 'array',
      of: [
        {
          type: 'object',
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
            {
              name: 'likes_count',
              title: 'Likes Count',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'retweets_count',
              title: 'Retweets Count',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'comments',
              title: 'Comments',
              type: 'array',
              of: [
                {
                  type: 'object',
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
                },
              ],
            },
          ],
        },
      ],
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
        },
      ],
    },
    {
      name: 'tweetContent',
      title: 'Tweet Content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'repliesContent',
      title: 'Replies Content',
      type: 'string',
    },
    {
      name: 'mediaContent',
      title: 'Media Content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'likesContent',
      title: 'Likes Content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'text',
                      title: 'Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'replies',
                      title: 'Replies',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'text',
                              title: 'Text',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'likes_count',
                      title: 'Likes Count',
                      type: 'number',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'retweets_count',
                      title: 'Retweets Count',
                      type: 'number',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
