import GradientButton from "@/components/UI/GradientBtn";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Errors {
  email?: string;
  password?: string;
}

const Page = () => {
  const router = useRouter();

  const [toogleBtn, setToogleBtn] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  //login with supabase
  const onSignIn = async () => {
    try {
      const newErrors = getErrors(email, password);
      if (Object.keys(newErrors).length > 0) {
        setShowErrors(true);
        setErrors(newErrors);
      } else {
        let trimEmail = email.trim()
        let trimPassword = password.trim()

        setErrors({});
        setShowErrors(false);
        setLoading(true);
        console.log("Signing in user");

        const { error } = await supabase.auth.signInWithPassword({
          email: trimEmail,
          password: trimPassword,
        });
        
        if (error) {
          Alert.alert(error.message);
        }
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Form Input */}
        <View>
          <Text style={styles.formText1}>Welcome back!</Text>
          <Text style={styles.formText2}>
            Securely login to your Gac account.
          </Text>

          <View style={styles.formBox1}>
            <View>
              <Text style={styles.userNameText}>Email address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  autoCorrect={false}
                  style={{ paddingVertical: 7, width: "100%", flex: 0.9 }}
                  placeholder="HelloGac@gmail.com"
                  placeholderTextColor={Colors.gray}
                  keyboardType="email-address"
                />
                <View style={styles.circle}>
                  <FontAwesome name="envelope-o" size={15} color="white" />
                </View>
              </View>
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
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={toogleBtn ? true : false}
                  style={{ paddingVertical: 7, width: "100%", flex: 0.9 }}
                  value={password}
                  onChangeText={(textPass) => setPassword(textPass)}
                  autoCorrect={false}
                  placeholder="Input your password"
                  placeholderTextColor={Colors.gray}
                  keyboardType="ascii-capable"
                />
                <TouchableOpacity
                  onPress={() => setToogleBtn(!toogleBtn)}
                  style={styles.circle}
                >
                  <Ionicons
                    name={toogleBtn ? "eye-off-outline" : "eye-outline"}
                    size={15}
                    color="white"
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

          <View style={{ marginTop: 10 }}>
            {loading ? (
              //LOADING SPINNER
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              // SIGN UP BUTTON
              <GradientButton
                onPress={() => onSignIn()}
                disabled={false}
                title="Sign In"
              />
            )}
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 25,
            }}
          >
            <TouchableOpacity>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                Forget Password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signInBox}>
            <Text style={{ fontSize: 15, color: Colors.dark }}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/signup");
              }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 0.6,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flex: 1,
    marginTop: 5,
  },
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  formBox1: {
    paddingTop: 30,
    paddingBottom: 35,
  },
  formText1: {
    fontSize: 40,
    color: Colors.primary,
    fontWeight: "bold",
    marginBottom: 1,
  },
  formText2: {
    fontSize: 18,
    color: Colors.dark,
    fontWeight: "300",
  },
  signInBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  signUpBox: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
  },
  signUpText: {
    color: Colors.primary,
    fontSize: 18,
  },
  userNameText: {
    fontSize: 17,
    color: Colors.primary,
    fontWeight: "400",
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  circle: {
    borderRadius: 40,
    backgroundColor: Colors.primary,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Page;
