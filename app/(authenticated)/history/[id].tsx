import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import Colors from "@/constants/Colors";
import { format, differenceInDays, isFuture } from "date-fns";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useUserStore } from "@/store/motorStore";
import { details, drivers } from "@/data/data";
import CustomProfileHeader from "@/components/UI/Custom/CustomProfileHeader";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { formatNumber } from "@/utils/formatNumber";

interface RentalDetails {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  driverId?: string;
}

interface Comment {
  id: string;
  vehicleId: string;
  rentalId: string;
  comment: string;
  userId: string;
  user: User;
}

interface User {
  id: string;
  name: string;
}

export default function RentalDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [rental, setRental] = useState<RentalDetails | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();
  const progress = useSharedValue(0);
  const { user } = useUserStore();

  useEffect(() => {
    fetchRentalDetails();
  }, [id]);

  // Find the vehicle and driver details
  const vehicle = details.find((v) => v.id === rental?.vehicleId);
  const driver = rental?.driverId
    ? drivers.find((d) => d.id === rental?.driverId)
    : null;

  useEffect(() => {
    fetchComments();
  }, [rental]);

  useEffect(() => {
    if (rental && !isFuture(new Date(rental.startDate))) {
      const totalDays = differenceInDays(
        new Date(rental.endDate),
        new Date(rental.startDate)
      );
      const daysPassed = differenceInDays(
        new Date(),
        new Date(rental.startDate)
      );
      const newProgress = Math.min(Math.max(daysPassed / totalDays, 0), 1);
      progress.value = withTiming(newProgress, { duration: 1000 });
    } else {
      progress.value = 0;
    }
  }, [rental]);

  const fetchRentalDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("rentals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setRental(data);
    } catch (error) {
      console.error("Error fetching rental details:", error);
      Alert.alert("Error", "Failed to load rental details");
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
          *,
          user: users (id, name)
          `
        )
        .eq("vehicleId", rental?.vehicleId);

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      Alert.alert("Error", "Failed to load comments");
    }
  };

  const handleCallDriver = () => {
    if (rental?.driverId) {
      const driver = drivers.find((d) => d.id === rental.driverId);
      if (driver && driver.contact) {
        Linking.openURL(`tel:${driver.contact}`);
      } else {
        Alert.alert("Error", "Driver contact information not available");
      }
    }
  };

  const handleCancelOrder = async () => {
    Alert.alert(
      "Cancel Rental",
      "Are you sure you want to cancel this rental?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from("rentals")
                .delete()
                .eq("id", id);

              if (error) throw error;

              Alert.alert("Success", "Order cancelled successfully");
              router.replace("/(authenticated)/(tabs)/history");
            } catch (error) {
              console.error("Error cancelling order:", error);
              Alert.alert("Error", "Failed to cancel order");
            }
          },
        },
      ]
    );
  };

  const handleSaveComment = async () => {
    if (!newComment.trim()) {
      Alert.alert("Error", "Please enter a comment");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          vehicleId: rental?.vehicleId,
          rentalId: id,
          comment: newComment.trim(),
          userId: user?.id,
        })
        .select();

      if (error) throw error;

      setComments([...comments, data[0]]);
      setNewComment("");
      Alert.alert("Success", "Comment saved successfully");
    } catch (error) {
      console.error("Error saving comment:", error);
      Alert.alert("Error", "Failed to save comment");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete this comment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from("comments")
                .delete()
                .eq("id", commentId);

              if (error) throw error;

              setComments(
                comments.filter((comment) => comment.id !== commentId)
              );
              Alert.alert("Success", "Comment deleted successfully");
            } catch (error) {
              console.error("Error deleting comment:", error);
              Alert.alert("Error", "Failed to delete comment");
            }
          },
        },
      ]
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const showProgressBar = rental && !isFuture(new Date(rental.startDate));

  if (!rental) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomProfileHeader text="Rental History" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Rental Details</Text>
        <View style={styles.imageBox}>
          <Image
            source={vehicle?.image}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={[styles.detailText, { fontWeight: "bold" }]}>
            Vehicle Name: {vehicle?.name}
          </Text>
          <Text style={styles.detailText}>
            Start Date: {format(new Date(rental.startDate), "PPP")}
          </Text>
          <Text style={styles.detailText}>
            End Date: {format(new Date(rental.endDate), "PPP")}
          </Text>
          <Text style={styles.detailText}>
            Total Amount: ₦{formatNumber(rental.totalAmount)}
          </Text>
          <Text style={styles.detailText}>
            Driver: {driver ? driver.name : "Self Driven"}
          </Text>
          {driver && (
            <Text style={styles.detailText}>
              Driver Phone: {driver.contact}
            </Text>
          )}
        </View>

        {showProgressBar && (
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, animatedStyle]} />
          </View>
        )}

        {rental.driverId && (
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCallDriver}
          >
            <Ionicons name="call" size={24} color="white" />
            <Text style={styles.callButtonText}>Call Driver</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancelOrder}
        >
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </TouchableOpacity>

        <View style={styles.commentContainer}>
          <Text style={styles.commentTitle}>Reviews</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View>
                <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{comment?.user?.name || user?.name}</Text>
                <Text style={{ flex: 1, fontStyle: "italic" }}>~ {comment.comment}</Text>
              </View>
              {comment.userId === user?.id && (
                <TouchableOpacity
                  style={styles.deleteCommentButton}
                  onPress={() => handleDeleteComment(comment.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TextInput
            style={styles.commentInput}
            multiline
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a review here..."
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveComment}
          >
            <Text style={styles.saveButtonText}>Post Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
  deleteCommentButton: {
    padding: 4,
  },
  imageBox: {
    maxHeight: responsiveHeight(18),
    paddingVertical: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: Colors.gray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressContainer: {
    height: 10,
    backgroundColor: Colors.gray,
    borderRadius: 5,
    marginBottom: 16,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "green",
    borderRadius: 5,
  },
  callButton: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  callButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  commentContainer: {
    marginTop: 16,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentItem: {
    backgroundColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    marginTop: 8,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
