export const userData = [
    {
      "id": 1,
      "username": "user1",
      "name": "User One",
      "followers_count": 100,
      "following_count": 50,
      "image": "https://images.pexels.com/photos/2010877/pexels-photo-2010877.jpeg?auto=compress&cs=tinysrgb&w=600",
      "tweets": [
        {
          "id": 1,
          "text": "This is my first tweet!",
          "timestamp": "2023-05-25T10:30:00Z",
          "likes_count": 10,
          "retweets_count": 2,
          "comments": [
            {
              "id": 1,
              "text": "Great first tweet!",
              "timestamp": "2023-05-25T11:00:00Z"
            }
          ]
        }
      ],
      "bio": [
        {
          "text": "Digital Goodies Team - Web and Mobile UI/UX development;Graphics; Illustrations",
          "view": 2
        }
      ],
      "tweetContent": "This is my first tweet!",
      "repliesContent": "Great first tweet!",
      "mediaContent": "<img src='https://images.pexels.com/photos/2010877/pexels-photo-2010877.jpeg?auto=compress&cs=tinysrgb&w=600' alt='User Media' className='w-40 h-40 rounded-full' />",
      "likesContent": "Likes: 10",
      "menuItems": [
        {
          "label": "Tweet",
          "content": [
            {
              "text": "This is my first tweet!",
              "replies": [
                {
                  "text": "Great first tweet!"
                }
              ],
              "likes_count": 10,
              "retweets_count": 2
            }
          ]
        },
        {
          "label": "Message",
          "content": [
            {
              "text": "Sending you a message!"
            }
          ]
        },
        {
          "label": "Follow",
          "content": [
            {
              "text": "Follow me!"
            }
          ]
        }
      ]
    },
    // Add the remaining user data objects here
  ];
  