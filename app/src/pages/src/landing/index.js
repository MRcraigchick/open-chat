import { FullPageLayout } from '@/components/layouts';
import { H1 } from '@/components/text';
import { Chat as ChatIcon } from '@/components/graphics/icons';
import { Button } from '@/components/pressables';

export default function Landing({ navigation }) {
  return (
    <FullPageLayout className=''>
      <H1 className='text-first w-full text-center mb-[50px]'>Open Chat</H1>
      <ChatIcon className='h-[400px] mb-[30px]' />
      <Button
        label='Sign Up'
        onPress={() => navigation.push('sign-up')}
        classNames={{
          container: 'bg-third mb-[20px] md:max-w-[300px] ',
        }}
      />
      <Button
        label='Login'
        onPress={() => navigation.push('login')}
        classNames={{
          container: 'bg-third md:max-w-[300px]',
        }}
      />
    </FullPageLayout>
  );
}
