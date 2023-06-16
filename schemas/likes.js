export default {
    name: 'like',
    title: 'Like',
    type: 'document',
    fields: [
      {
        name: 'user_id',
        title: 'User ID',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'tweet_id',
        title: 'Tweet ID',
        type: 'number',
        validation: (Rule) => Rule.required(),
      },
    ],
  };
  