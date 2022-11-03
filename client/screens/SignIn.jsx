import { COLORS, SIZES } from "../constants";
import { useCallback, useState } from "react";
import styled from "styled-components/native";
import Constants from "expo-constants";
import auth from "@react-native-firebase/auth";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Snackbar } from "react-native-paper";

//'jane.doe@example.com', 'neil1234'

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ message: null });
  const onDismissSnackBar = () => setError(false);

  const handleSignIn = useCallback(() => {
    if (email.length === 0 || password.length === 0) {
      console.log("invalid");
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          console.log("The email address is not valid!");
		  setError({ message: "That email address is not valid!" });
        }
        if (error.code === "auth/user-disabled") {
          console.log("user is disabled!");
		  setError({ message: "User is disabled!" });
        }
        if (error.code === "auth/user-not-found") {
          console.log("no user for this email found!");
		  setError({ message: "No user for this email found!" });
        }
        if (error.code === "auth/wrong-password") {
          console.log("Invalid password!");
		  setError({ message: "Invalid password!" });
        }

        console.log(error);
      });
  }, [email, password]);

  return (
    <Container>
      <KeyboardAvoidingScrollView
        stickyFooter={
          <ButtonContainer onPress={handleSignIn}>
            <Label1>Sign In</Label1>
          </ButtonContainer>
        }
      >
        <WelcomeText>Hello Again!</WelcomeText>

        <Fields>
          <Box>
            <Label>Email ID</Label>
            <Input value={email} onChangeText={(text) => setEmail(text)} />
          </Box>

          <Box>
            <Label>Password</Label>
            <Input
              value={password}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </Box>
        </Fields>

        {/* <ButtonContainer onPress={handleSignIn}>
				<Label1>Sign In</Label1>
			</ButtonContainer> */}
      </KeyboardAvoidingScrollView>
      <Snackbar onDismiss={onDismissSnackBar} visible={error.message != null}>
        {error.message}
      </Snackbar>
    </Container>
  );
};

export default SignIn;

//styles
const Container = styled.View`
  flex: 1;
  padding: 30px;
  padding-top: ${Constants.statusBarHeight + 20}px;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.darkgrey : COLORS.white2};
  justify-content: center;
`;

const WelcomeText = styled.Text`
  font-family: Poppins_400Regular;
  font-size: 48px;
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.purple2 : COLORS.deepBlue};
  width: 60%;
`;

const Fields = styled.View`
  /* flex: 1; */
  padding: 20px 10px;
`;

const Box = styled.View`
  justify-content: center;
  margin: 20px 0px;
`;

const Label = styled.Text`
  font-size: 22px;
  font-family: Poppins_400Regular;
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
`;

const Input = styled.TextInput`
  padding: 12px 15px;
  margin-top: 8px;
  background-color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.purple2 : COLORS.white1};
  opacity: ${({ theme }) => (theme.name === "dark" ? 0.5 : 1)};
  color: ${({ theme }) =>
    theme.name === "dark" ? COLORS.white1 : COLORS.deepBlue};
  border-radius: ${SIZES.font}px;
  font-size: 18px;
  shadow-color: #233b7a;
  shadow-opacity: 1.5;
  shadow-radius: 20px;
  elevation: 10;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(p) =>
    p.theme.name === "dark" ? COLORS.purple2 : COLORS.deepBlue};
  align-items: center;
  border-radius: 30px;
  margin-bottom: ${RFValue(-10)}px;
  margin-top: ${RFValue(20)}px;
  padding: ${RFValue(5)}px;
`;

const Label1 = styled.Text`
  color: ${(p) => COLORS.white1};
  font-family: Poppins_400Regular;
  font-size: 22px;
  text-align: center;
`;
