// import React, { useState, useEffect, ChangeEvent } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { getUser, updateUser, deleteUser, updatePassword } from '@src/apis/mypageuser';
// import { useQuery, useMutation } from 'react-query';

// interface UserData {
//   nickname: string;
//   email: string;
//   profileImage: string;
// }

// const MyPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState<Boolean>(false);
//   const [isEditingPassword, setIsEditingPassword] = useState(false);

//   // 수정 사항
//   const [nickname, setNickname] = useState('');
//   const [email, setEmail] = useState('');
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [previewImage, setPreviewImage] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [nicknameError, setNicknameError] = useState('');

//   // 비밀번호
//   const [oldpassword, setOldPassword] = useState('');
//   const [newpassword, setNewPassword] = useState('');
//   const [checknewpassword, setCheckNewPassword] = useState('');
//   const [oldpasswordError, setOldPasswordError] = useState('');
//   const [newpasswordError, setNewPasswordError] = useState('');
//   const [checknewpasswordError, setCheckNewPasswordError] = useState('');
//   const [apiError, setApiError] = useState('');

//   const handleEditPasswordClick = () => {
//     setIsEditingPassword(true);
//   };

//   // 회원 조회
//   const { data, isLoading, isError, refetch } = useQuery<UserData>('userData', getUser);

//   useEffect(() => {
//     if (data) {
//       setNickname(data.nickname);
//       setEmail(data.email);
//       setPreviewImage(data.profileImage);
//     }
//   }, [data]);
//   // 에러 메시지
//   const updateUserMutation = useMutation(updateUser);
//   const deleteUserMutation = useMutation(deleteUser);
//   const updatePasswordMutation = useMutation(updatePassword, {
//     onError: error => {
//       setApiError(error.response.data.errorMessage);
//     },
//   });

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNickname(e.target.value);
//     setNicknameError('');
//   };

//   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setOldPassword(e.target.value);
//     setOldPasswordError('');
//   };

//   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNewPassword(e.target.value);
//     setNewPasswordError('');
//   };

//   const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCheckNewPassword(e.target.value);
//     setCheckNewPasswordError('');
//   };

//   // 수정 이미지
//   const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length >= 0) {
//       const fileList = e.target.files[0];
//       setProfileImage(fileList);

//       // 미리보기
//       const previewURLs = URL.createObjectURL(fileList);
//       setPreviewImage(previewURLs);
//     }
//   };

//   const removeProfileImage = () => {
//     setProfileImage(null);
//     setPreviewImage('');
//   };

//   const handleCloseClick = () => {
//     setIsEditing(false);
//   };

//   const handleWithdrawalClick = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleWithdrawal = async () => {
//     try {
//       await deleteUserMutation.mutateAsync();
//       console.log('User account deleted');
//       navigate('/');
//     } catch (error) {
//       console.error(error);
//     }
//     setShowModal(false);
//   };

//   // 비밀번호 수정
//   const handleSavePassword = async () => {
//     if (oldpassword.trim() === '') {
//       setOldPasswordError('현재 비밀번호를 입력해주세요.');
//       return;
//     }

//     if (newpassword.trim() === '') {
//       setNewPasswordError('새로운 비밀번호를 입력해주세요.');
//       return;
//     }

//     if (checknewpassword.trim() === '') {
//       setCheckNewPasswordError('비밀번호 확인을 입력해주세요.');
//       return;
//     }

//     if (newpassword !== checknewpassword) {
//       setCheckNewPasswordError('비밀번호가 일치하지 않습니다.');
//       return;
//     }

//     const passwordData = {
//       oldPassword: oldpassword,
//       newPassword: newpassword,
//       checkNewPassword: checknewpassword,
//     };

//     try {
//       await updatePasswordMutation.mutateAsync(passwordData);
//       setApiError('');
//       console.log('Password updated successfully');
//     } catch (error) {
//       console.log(error.response.data.errorMessage);
//       throw error;
//     }
//   };

//   // 저장버튼
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (nickname.trim() === '') {
//       setNicknameError('닉네임을 적어주세요.');
//       return;
//     }

//     const formData = new FormData();
//     const text = JSON.stringify({
//       nickname,
//     });
//     const nicknameBlob = new Blob([text], { type: 'application/json' });
//     formData.append('nickname', nicknameBlob);
//     formData.append('profileImage', profileImage);

//     try {
//       await updateUserMutation.mutateAsync(formData);
//       refetch();
//       setIsEditing(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
