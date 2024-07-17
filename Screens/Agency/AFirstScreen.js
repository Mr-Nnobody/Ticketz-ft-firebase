//TODO: need to only adjust icon.
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import CustomButton from "../../components/CustomButton";

const FirstScreen = ({ navigation }) => {
  const handleLogin = (navigation) => {
    // Handle login logic here
    navigation.navigate("ALoginScreen");
  };
  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate("ARegistrationScreen");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/ideal_logo.png")}
        style={styles.Image}
      />
      <Text style={styles.bold}>Ticketz</Text>

      <View>
        <CustomButton
          title="SIGN UP"
          onPress={handleSignup}
          style={styles.loginButtonstyle}
        />
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={{ padding: 5, fontSize: 18 }}>
            {" "}
            Already have an account?
          </Text>
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.4} onpress={handleLogin}>
            <View>
              <Text style={styles.signinbutton}>Sign In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  Image: {
    marginTop: 170,
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  bold: {
    fontWeight: "bolds",
    fontSize: 50,
    fontStyle: "normal",
    marginTop: 10,
    marginBottom: 260,
    color: "#3498DB",
    letterSpacing: 10,
  },
  loginButtonstyle: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#3498DB",
    width: 300,
    color: "white",
    padding: 12,
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "space-between",
  },
  signinbutton: {
    fontSize: 18,
    color: "#17ff",
    borderBottomWidth: 1,
    borderBottomColor: "#17ff",
  },
});
