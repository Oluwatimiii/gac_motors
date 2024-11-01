import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "@/constants/Colors";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const Page = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const paymentMethods = [
    {
      id: 1,
      title: "Cards",
      icon: <FontAwesome name="credit-card" size={24} color={Colors.primary} />,
      cards: [
        { last4: "4242", brand: "cc-visa", expiry: "04/25" },
        { last4: "8888", brand: "cc-mastercard", expiry: "08/24" },
      ],
    },
    {
      id: 2,
      title: "PayPal",
      icon: <FontAwesome name="paypal" size={24} color={Colors.primary} />,
      connected: true,
    },
    {
      id: 3,
      title: "Bank Transfer",
      icon: (
        <MaterialCommunityIcons
          name="bank-transfer"
          size={24}
          color={Colors.primary}
        />
      ),
    },
    {
      id: 4,
      title: "Cash",
      icon: <FontAwesome name="money" size={24} color={Colors.primary} />,
    },
  ];

  const renderPaymentMethod = (method: any) => (
    <TouchableOpacity key={method.id} style={styles.paymentMethod}>
      <View style={styles.methodHeader}>
        {method.icon}
        <Text style={styles.methodTitle}>{method.title}</Text>
      </View>

      {method.cards && (
        <View style={styles.cardList}>
          {method.cards.map((card: any, index: number) => (
            <View key={index} style={styles.card}>
              <FontAwesome
                name={card.brand.toLowerCase()}
                size={20}
                color="green"
              />
              <Text style={styles.cardText}>
                ** {card.last4} | Expires {card.expiry}
              </Text>
            </View>
          ))}
        </View>
      )}

      {method.connected && <Text style={styles.connectedText}>Connected</Text>}

      {!method.cards && (
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={Colors.primary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, paddingTop }}>
      <CustomProfileHeader text="PAYMENT" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80,
        }}
        style={styles.container}
      >
        <View>
          <Text style={styles.detailTitle}>Payment Methods</Text>
          {paymentMethods.map(renderPaymentMethod)}
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    backgroundColor: "white",
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.primary,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.gray,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: "space-between",
  },
  methodHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    color: Colors.dark,
  },
  cardList: {
    flex: 1,
    marginLeft: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  cardText: {
    marginLeft: 8,
    color: Colors.dark,
    fontSize: 14,
  },
  connectedText: {
    color: "green",
    fontSize: 14,
    marginRight: 12,
  },
});
