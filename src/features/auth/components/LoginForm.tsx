import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/types/auth.types';
import * as s from '@/features/auth/components/LoginForm.css';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  return (
    <motion.div
      className={s.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1 className={s.title}>로그인</h1>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputGroup}>
          <input
            {...register('email')}
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            className={s.input}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                className={s.errorText}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className={s.inputGroup}>
          <input
            type="password"
            {...register('password')}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            className={s.input}
          />
          <AnimatePresence>
            {errors.password && (
              <motion.p
                className={s.errorText}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={!isValid || isLoading}
          className={s.submitButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </motion.button>
      </form>
    </motion.div>
  );
};
