import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/api-actions';
import { NewUser } from '../../types/new-user';

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File | undefined>();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isProRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setAvatar(evt.target.files[0]);
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    const formData: NewUser = {
      name: nameRef.current?.value as string,
      email: emailRef.current?.value as string,
      password: passwordRef.current?.value as string,
      isPro: isProRef.current?.checked as boolean,
      avatar,
    };

    const response = await dispatch(registerUser(formData));
    if (response.meta.requestStatus === 'rejected') {
      toast.error('Can\'t sign up');
    } else {
      toast.success('Success! Please sign in!');
      navigate(AppRoute.Login);
    }
  };

  return (
    <form
      className="login__form form register-form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Name</label>
        <input
          className="login__input form__input"
          type="text"
          name="name"
          placeholder="Name"
          required
          minLength={1}
          maxLength={15}
          ref={nameRef}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          ref={emailRef}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          maxLength={12}
          ref={passwordRef}
        />
      </div>
      <div
        className="login__input-wrapper form__input-wrapper register-form__avatar-wrapper"
      >
        <input
          className="visually-hidden"
          type="file"
          name="avatar"
          id="avatar"
          accept="image/png, image/jpeg"
          onChange={handleAvatarUpload}
        />
        <label htmlFor="avatar" className="register-form__avatar-label">
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Avatar preview"
              className="register-form__avatar-preview"
            />
          ) : (
            'Upload avatar'
          )}
        </label>
      </div>
      <div className="register-form__is-pro-wrapper">
        <input
          type="checkbox"
          name="isPro"
          id="isPro"
          value="true"
          ref={isProRef}
        />
        <label htmlFor="isPro" className="register-form__is-pro-label">
          Create pro account
        </label>
      </div>
      <button className="login__submit form__submit button" type="submit">
        Sign up
      </button>
    </form>
  );
}

export default RegisterForm;
