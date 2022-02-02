import Link from 'next/link';
import { Box, Container, Text, Button, VStack } from '@chakra-ui/react';

import TimePicker from 'components/common/TimePicker';

const Content = () => {
  return (
    <Box>
      <Container>
        <VStack alignItems="flex-start" mt="20px">
          <Link href="/admin" passHref>
            <Button w="150px">관리자</Button>
          </Link>
          <Link href="/auth/start" passHref>
            <Button w="150px">로그인</Button>
          </Link>
          <Link href="/toktokhan" passHref>
            <Button w="150px">팀페이지</Button>
          </Link>
        </VStack>
        <Text mt="20px">여기에 랜딩페이지 만들어질 예정!</Text>
        <TimePicker />
      </Container>
    </Box>
  );
};

export default Content;
