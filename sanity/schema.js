import user from '../schemas/user';
import tweet from '../schemas/posts';
import view from '../schemas/view';
import bio from '../schemas/bio';
import directMessages from '../schemas/directMessages';
import likes from '../schemas/likes';

export const schema = {
  types: [
     tweet, bio, directMessages, likes, view,user,
  ],
};
