import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import GradientButton from "@/components/UI/GradientBtn";
import { supabase } from "@/lib/supabase";

interface Errors {
  email?: string;
  password?: string;
}

const SignUp = () => {
  const router = useRouter();
  const [toogleBtn, setToogleBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const getErrors = (email: string, password: string) => {
    const errors: Errors = {};

    if (!email) {
      errors.email = "Enter your email";
    } else if (!email.includes("@") || !email.includes(".com")) {
      errors.email = "Kindly input a valid email.";
    }

    if (!password) {
      errors.password = "Enter your password";
    } else if (password.length < 8) {
      errors.password = "Enter password of 8 or more characters.";
    }

    return errors;
  };

  //Signup with supabase
  const handleSignUp = async () => {
    try {
      const newErrors = getErrors(email, password);
      if (Object.keys(newErrors).length > 0) {
        setShowErrors(true);
        setErrors(newErrors);
      } else {
        let trimName = name.trim()
        let trimEmail = email.trim()
        let trimPassword = password.trim()
        let trimNumber = phone.trim()

        setLoading(true);
        console.log("signing up", trimEmail)

        const { data: { session }, error } = await supabase.auth.signUp({
          email: trimEmail,
          password: trimPassword,
          options: {
            data: {
              name,
            },
          }
        })
        
        console.log("signed up", session)
        if (error) 
          {
            Alert.alert(error.message);
        }
        setLoading(false)
        setErrors({});
        setShowErrors(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Form Input */}
        <View>
          <Text style={styles.formText1}>Create Account</Text>
          <Text style={styles.formText2}>
            Create a free account and enjoy safer rides with Gac.
          </Text>

          <View style={styles.formBox1}>
            <View>
              <Text style={styles.userNameText}>Name</Text>
              <TextInput
                style={styles.userNameInput}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter full name"
                placeholderTextColor={Colors.gray}
                keyboardType="name-phone-pad"
              />
            </View>
            <View>
              <Text style={styles.userNameText}>Phone number</Text>
              <TextInput
                style={styles.userNameInput}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Input phone no.."
                placeholderTextColor={Colors.gray}
                keyboardType="name-phone-pad"
              />
            </View>
            <View>
              <Text style={styles.userNameText}>Email address</Text>
              <TextInput
                style={styles.userNameInput}
                placeholder="Hellofoodie@gmail.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={Colors.gray}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "red",
                    marginTop: 4,
                  }}
                >
                  {errors.email}
                </Text>
              )}
            </View>
            <View>
              <Text style={styles.userNameText}>Password</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomColor: Colors.dark,
                  borderBottomWidth: 1,
                }}
              >
                <TextInput
                  secureTextEntry={toogleBtn ? true : false}
                  style={{ paddingVertical: 7, width: "100%", flex: 0.9 }}
                  placeholder="Input your password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholderTextColor={Colors.gray}
                  keyboardType="ascii-capable"
                />
                <TouchableOpacity onPress={() => setToogleBtn(!toogleBtn)}>
                  <Ionicons
                    name={toogleBtn ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "red",
                    marginTop: 4,
                  }}
                >
                  {errors.password}
                </Text>
              )}
            </View>
          </View>

          {/* CheckBox Segment */}
          <View style={styles.checkBox}>
            <View>
              <BouncyCheckbox
                size={20}
                fillColor={Colors.primary}
                unFillColor={Colors.white}
                isChecked={checkBox}
                iconStyle={{ borderColor: `${Colors.primary}` }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={() => {
                  setCheckBox(!checkBox);
                }}
              />
            </View>
            <Text style={styles.checkBoxText}>
              <Text style={{ color: Colors.dark }}>
                By continuing you agree to our{" "}
              </Text>
              <Text style={{ color: Colors.primary }}>
                Terms of Services and Privacy Policy.
              </Text>
            </Text>
          </View>

          {loading ? (
            //LOADING SPINNER
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            // SIGN UP BUTTON
            <View style={{ flex: 1 }}>
              {checkBox ? (
                <GradientButton
                  disabled={false}
                  onPress={() => handleSignUp()}
                  title="Create account"
                />
              ) : (
                <GradientButton disabled={true} title="Create account" />
              )}
            </View>
          )}

          {/* SIGN IN SEGMENT */}
          <View style={styles.signInBox}>
            <Text style={{ fontSize: 15, color: Colors.dark }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/login");
              }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    color: Colors.dark,
    marginBottom: 20
  },
  checkBoxText: {
    flex: 1,
    flexWrap: "wrap",
    zIndex: 9999,
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  formBox1: {
    paddingTop: 30,
    paddingBottom: 60,
  },
  formText1: {
    fontSize: 40,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 3,
  },
  formText2: {
    fontSize: 18,
    color: Colors.dark,
    fontWeight: "300",
  },
  imgContainer: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 5,
    height: 60,
    width: 60,
  },
  logoImage: {
    height: "100%",
    width: "100%",
  },
  signInBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 6,
  },
  signUpBox: {
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
  },
  signUpText: {
    color: Colors.primarySec,
    fontSize: 18,
  },
  userNameText: {
    fontSize: 17,
    color: Colors.dark,
    fontWeight: "400",
    marginTop: 20,
  },
  userNameInput: {
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    paddingVertical: 7,
    width: "100%",
  },
});

export default SignUp;
