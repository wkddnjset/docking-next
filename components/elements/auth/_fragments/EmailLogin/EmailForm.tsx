import React from 'react';

import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { setEmail, setCheck, setError } from 'features/LoginForm/loginFormSlice';
import { useRootState } from 'components/hooks/useRootState';

import Text from 'components/common/Text';
// import Input from 'components/Input';

import { Input, VStack, Button, Box, Flex } from '@chakra-ui/react';

import { EmailLoginFormType } from './type';

import { passwordValidate, emailValidate } from 'utils/validate';

const EmailForm = ({ brand, watch, register, errors, isLoading }: EmailLoginFormType) => {
  // RTK
  const dispatch = useDispatch();
  const { email, error, check } = useRootState((state) => state.LOGIN_FORM);

  const formData = watch();

  console.log('errors : ', errors);
  return (
    <Flex direction="column" h="100%">
      <VStack w="100%" mb="15px" spacing="8px">
        <Box w="100%">
          <Input
            name="email"
            type="text"
            autoComplete="off"
            placeholder="이메일"
            value={email}
            {...register('email', {
              required: '빈칸을 입력해주세요.',
              validate: emailValidate,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setEmail(e.target.value));
                dispatch(setCheck({ isRegister: null, nickname: '' }));
                dispatch(setError({}));
              },
            })}
            borderColor={formData.email ? 'black' : 'transparent'}
            isInvalid={!!errors?.email?.message || !!error.email}
          />
          {(!!errors?.email?.message || !!error.email) && (
            <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
              {errors?.email?.message || error.email[0]}
            </Text>
          )}
        </Box>

        {check.isRegister !== null &&
          (check.isRegister ? (
            <Box w="100%">
              <Input
                name="password"
                type="password"
                autoComplete="off"
                placeholder="비밀번호"
                {...register('password', {
                  required: '빈칸을 입력해주세요.',
                  validate: passwordValidate,
                })}
                borderColor={formData.password ? 'black' : 'transparent'}
                isInvalid={!!errors?.password?.message || !!error.password}
              />
              {(!!errors?.password?.message || !!error.password) && (
                <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                  {errors?.password?.message || error.password[0]}
                </Text>
              )}
            </Box>
          ) : (
            <>
              <Box w="100%">
                <Input
                  autoComplete="off"
                  name="nickname"
                  type="text"
                  placeholder="닉네임"
                  {...register('nickname', {
                    required: '빈칸을 입력해주세요.',
                  })}
                  borderColor={formData.nickname ? 'black' : 'transparent'}
                  isInvalid={!!errors?.nickname?.message || !!error?.nickname}
                />
                {(!!errors?.nickname?.message || !!error?.nickname) && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.nickname?.message || error?.nickname[0]}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <Input
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="비밀번호"
                  {...register('password', {
                    required: '빈칸을 입력해주세요.',
                    validate: passwordValidate,
                  })}
                  borderColor={formData.password ? 'black' : 'transparent'}
                  isInvalid={!!errors?.password?.message || !!error.password}
                />
                {(!!errors?.password?.message || !!error.password) && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.password?.message || error.password[0]}
                  </Text>
                )}
              </Box>
              <Box w="100%">
                <Input
                  name="passwordConfirm"
                  type="password"
                  autoComplete="off"
                  placeholder="비밀번호 확인"
                  {...register('passwordConfirm', {
                    required: '빈칸을 입력해주세요.',
                    validate: {
                      isSame: (value: string) => (value === formData.password ? null : '비밀번호가 일치하지 않습니다.'),
                    },
                  })}
                  borderColor={formData.passwordConfirm ? 'black' : 'transparent'}
                  isInvalid={!!errors?.passwordConfirm?.message || !!error.passwordConfirm}
                />
                {(!!errors?.passwordConfirm?.message || !!error.passwordConfirm) && (
                  <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                    {errors?.passwordConfirm?.message || error.passwordConfirm[0]}
                  </Text>
                )}
              </Box>
              {brand.fieldSet.map((field, idx) => {
                return (
                  <Box w="100%" key={idx}>
                    <Input
                      autoComplete="off"
                      {...field}
                      {...register(field.name, {
                        required: '빈칸을 입력해주세요.',
                      })}
                      borderColor={formData[field.name] ? 'black' : 'transparent'}
                      isInvalid={!!errors?.[field.name]?.message || !!error?.[field.name]}
                    />
                    {(!!errors?.[field.name]?.message || !!error?.[field.name]) && (
                      <Text color="warning" textStyle="sm" textAlign="left" w="100%" mt="5px">
                        {errors?.[field.name]?.message || error?.[field.name][0]}
                      </Text>
                    )}
                  </Box>
                );
              })}
            </>
          ))}
      </VStack>
      <Box h={email ? '100px' : '0px'} opacity={email ? 1 : 0} transition="0.3s">
        <VStack spacing="20px">
          <Button w="100%" colorScheme={'dark'} type="submit" disabled={!email} isLoading={isLoading}>
            <Text color="#FFFFFF">{check.isRegister !== null ? (check.isRegister ? '로그인' : '회원가입') : '다음'}</Text>
          </Button>
          <Link href="/" passHref>
            <Text as="a" color="gray.700" cursor="pointer" decoration="underline">
              이메일을 잊으셨나요?
            </Text>
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default EmailForm;
