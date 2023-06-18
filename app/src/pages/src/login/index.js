import { View } from 'react-native';
import { Form, Input, validators } from '@/components/form';
import { Button } from '@/components/pressables';
import { requestsInstance as req } from '@/requests';

export default function Login({ navigation }) {
  return (
    <View className='flex-1 p-[20px]'>
      <Form
        onSubmit={async ({ values }) => {
          const res = await req.post('/user/session', values);
          const data = await res.json();
          if (!data.result) {
            console.log(data);
            setServerError(data.error);
            return;
          }
          setServerError(false);
          console.log(data);
        }}
        defaultValues={{
          email: '',
          password: '',
        }}>
        <Input
          name='email'
          type='email'
          labe='email'
        />
        <Input
          name='password'
          type='password'
          label='Password'
        />
        <Button
          submitter
          label='Login'
        />
      </Form>
    </View>
  );
}
