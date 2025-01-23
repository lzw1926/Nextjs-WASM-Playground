import { useLayoutEffect } from 'react';
import { css } from '../../styled-system/css';
import { useRouter } from 'next/router';
 
export default function Home() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.replace('/emscripten');
  }, []);
  return null;
}