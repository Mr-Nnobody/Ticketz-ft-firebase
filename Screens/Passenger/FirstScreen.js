import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import CustomButton from "../../components/CustomButton";

const FirstScreen = () => {
  const handleLogin = () => {
    // Handle login logic here
  };
  const handleSignup = () => {
    // Handle signup logic here
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/lewis.png")}
        style={styles.Image}
      />
      <Text style={styles.bold}>𝕋𝕚𝕔𝕜𝕖𝕥𝕫</Text>

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
    padding: 50,
    alignContent: "center",
    alignItems: "center",
  },
  Image: {
    marginTop: 170,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  bold: {
    fontWeight: "bolds",
    fontSize: 50,
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 260,
    color: "#17ff",
    letterSpacing: 10,
  },
  loginButtonstyle: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#17ff",
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
