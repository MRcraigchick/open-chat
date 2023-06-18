import { ScrollView, SafeAreaView, View } from 'react-native';

export default function FullPageLayout({ style = {}, children, scrollable = false }) {
  return (
    <>
      {scrollable ? (
        <SafeAreaView className='flex-1'>
          <ScrollView className='flex-1'>
            <View
              style={style}
              className='flex-1 p-[30px] font-body-400 text-dark'>
              {children}
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView className='flex-1'>
          <View
            style={style}
            className='flex-1 p-[30px] font-body-400 text-dark'>
            {children}
          </View>
        </SafeAreaView>
      )}
    </>
  );
}
