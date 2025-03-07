import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {fetchUserProfile, updateUserProfile} from "../../store/reducers/authSlice"
import { IFormData } from '../../types/types';

const Profile = () => {
const dispatch = useAppDispatch();
const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

//   const handleUpdateProfile = (updatedData: Partial<IFormData>) => {
//     dispatch(updateUserProfile(updatedData));
//   }; 

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;