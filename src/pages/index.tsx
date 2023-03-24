import Head from 'next/head';
import Commander from '@/components/Commander/Commander';
import { CommandProps, COMMANDS } from '@/constants/Commands';
import Container from '@/components/UI/Container/Container';
import {
  BaseSyntheticEvent,
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [inputVal, setInputVal] = useState<string>('');
  const [command, setCommand] = useState<string | CommandProps[]>([]);
  const [valid, setValid] = useState<boolean>(true);

  const inputRef = useRef<any>(null);

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setInputVal('');

    if (!inputVal || !COMMANDS.hasOwnProperty) {
      setValid(false);
      return;
    }

    setCommand(COMMANDS[inputVal]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // todo: handle mobile return key
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Head>
        <title>MMCoding</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Container
        width="100vw"
        height="100vh"
        as="main"
        flexDirection="column"
      >
        {!valid && <span>Invalid Command...</span>}
        {command && <Commander commands={command} />}
        <form onSubmit={() => handleSubmit}>
          <div className={styles.input_container}>
            <span className={styles.input_pre}>
              visitor@mmcoding.dev:~$&nbsp;
            </span>
            <div className={styles.cursor}>
              <textarea
                ref={inputRef}
                className={styles.input_field}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                autoFocus
                onKeyDown={(e) => handleKeyPress(e)}
              />
              <i></i>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}
