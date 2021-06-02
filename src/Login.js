import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signIn = async () => {
    const respoonse = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYV3YrSkQwgZXJrqwpCPNVQC9nzQB3m7c',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!respoonse.ok) {
      const erroeResData = await respoonse.json();
      const errId = erroeResData.error.message;
      var msg = 'This email could not be found';
      setError(msg);
      if (errId == 'EMAIL_NOT_FOUND') {
        setError(msg);
      } else if (errId == 'INVALID_PASSWORD') {
        msg = 'The password is invalid';
        setError(msg);
      }
      console.log(errId);
      throw new Error(msg);
    }

    const data = await respoonse.json();
    const token = data.idToken;

    props.navigation.navigate('Dummy');
    setError('');
  };

  const googleSignIn = async () => {
    //    await Google.logInAsync(config).then((resutl) => {
    //        const {type, user} = resutl;
    //        if (type === 'success') {
    //         handleMessage('Google sign in succeeded')
    //         props.navigation.navigate("Dummy");
    //       } else {
    //         handleMessage('Google sign in canceled')
    //       }
    //    }).catch((error) => {
    //         console.log(error)
    //         handleMessage('An error occured')
    //     });

    try {
      const result = await Google.logInAsync({
        androidClientId: `181557170242-ce4sedotnr1ctu289jjm9qm9uef8h83h.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        props.navigation.navigate('Dummy');
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const faceBook = async () => {
    console.log('facebook');
    await Facebook.initializeAsync({
      appId: '193426132654305',
    });

    let { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });

    if (type === 'success') {
      console.log('success');
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );

      props.navigation.navigate('Dummy');
    } else {
      console.log('Cancel');
    }
  };

  const faceBook1 = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '193426132654305',
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        props.navigation.navigate('Dummy');
      } else {
        alert(`Cancel`);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error`);
    }
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontFamily: 'CairoBold' }}>
          تسجيل دخول
        </Text>

        <TextInput
          style={styles.input2}
          placeholder="البريد الالكتروني"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input2}
          placeholder="كلمة المرور"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={signIn}>
          <Text
            style={{ fontSize: 20, fontFamily: 'CairoRegular', color: 'white' }}
          >
            دخول
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '75%',
            marginVertical: 10,
          }}
        >
          <View style={styles.hor} />
          <Text style={{ fontSize: 20, fontFamily: 'CairoRegular' }}>أو</Text>
          <View style={styles.hor} />
        </View>

        <TouchableOpacity
          style={styles.newButton}
          onPress={() => props.navigation.navigate('SingUP')}
        >
          <Text
            style={{ fontSize: 20, fontFamily: 'CairoRegular', color: 'white' }}
          >
            تسجيل حساب جديد
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookButton} onPress={faceBook}>
          <Text
            style={{ fontSize: 20, fontFamily: 'CairoRegular', color: 'white' }}
          >
            تسجيل بحساب فيسبوك
          </Text>
          <FontAwesome
            name="facebook"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={googleSignIn}>
          <Text
            style={{ fontSize: 20, fontFamily: 'CairoRegular', color: 'white' }}
          >
            تسجيل بحساب جوجل
          </Text>
          <AntDesign
            name="google"
            size={24}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input1: {
    width: '40%',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    borderColor: 'lightgrey',
    padding: 7,
    marginVertical: 10,
    fontFamily: 'CairoRegular',
  },
  input2: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    borderColor: 'lightgrey',
    padding: 7,
    marginVertical: 10,
    fontFamily: 'CairoRegular',
  },
  loginButton: {
    width: '80%',
    height: 45,

    borderRadius: 25,
    backgroundColor: '#388bcb',
    padding: 7,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newButton: {
    width: '80%',
    height: 45,

    borderRadius: 25,
    backgroundColor: 'black',
    padding: 7,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButton: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 25,
    backgroundColor: '#4267b2',
    padding: 7,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',

    borderRadius: 25,
    backgroundColor: '#d44638',
    padding: 7,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hor: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
    width: '40%',
  },
});
