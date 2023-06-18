import { View, Text } from 'react-native';
import { useState } from 'react';
import { Form, Input, validators } from '@/components/form';
import { Button } from '@/components/pressables';
import { requestsInstance as req } from '@/requests';

export default function SignUp({ navigation }) {
  const [serverError, setServerError] = useState(false);

  return (
    <View className='flex-1 p-[20px]'>
      {serverError && <Text className='text-error'>{serverError}</Text>}
      <Form
        onSubmit={async ({ values }) => {
          const res = await req.post('/user', values);
          const data = await res.json();
          if (!data.result) {
            setServerError(data.error);
            return;
          }
          setServerError(false);
          navigation.push('login');
        }}
        defaultValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        }}>
        <Input
          name='firstname'
          type='text'
          label='First name'
          rules={validators.name}
        />
        <Input
          name='lastname'
          type='text'
          label='Last name'
          rules={validators.name}
        />
        <Input
          name='email'
          type='email'
          label='Email'
          rules={validators.email}
        />
        <Input
          name='password'
          type='password'
          label='Password'
          rules={validators.password}
        />
        <Button
          submitter
          label='Submit'
        />
      </Form>
    </View>
  );
}
