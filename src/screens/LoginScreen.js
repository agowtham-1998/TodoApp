import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import {auth} from '../services/firebaseConfig'


const LoginScreen = ({ navigation }) => {

    const checkIfLoggedIn = () => {
        onAuthStateChanged(auth,(user) => {
            if(user) {
               navigation.navigate('Home')
            }
        })
    }

    useEffect(() => {
        checkIfLoggedIn()
    },[])

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });


  const handleLogin = async (values, { resetForm }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Home')
      })
      resetForm();
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <AppTextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}  // admin123@gmail.com
              error={touched.email && errors.email}
              keyboardType="email-address"
            />
            <AppTextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')} //123456
              onBlur={handleBlur('password')}
              secureTextEntry
              error={touched.password && errors.password}
            />
            <AppButton title="Login" onPress={handleSubmit} style={styles.button} />
            <AppButton
              title="Don't have an account? Sign Up"
              mode="text"
              onPress={() => navigation.navigate('Signup')}
              textStyle={styles.signupText}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  signupText: {
    marginTop: 15,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default LoginScreen;
