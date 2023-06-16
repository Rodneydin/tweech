import { useState } from 'react';


const EditProfileForm = ({ user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  const handleSave = () => {
    
    const updatedProfile = {
      name,
      username,
      bio,
    };
    onSave(updatedProfile);
  };

  return (
    <div className='gap-4'>
      <h2 className='text-xl font-bold text-green-500'>Edit Profile</h2>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
        </label>
        <br />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
