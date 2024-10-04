import { supabase } from "@/lib/supabase";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabaseUrl } from "@/constants";

// Interface for upload result
interface UploadResult {
  success: boolean;
  msg: string;
  data?: any;
}

interface UploadProps {
  folderName: string,
  fileUri: string,
  isImage: boolean
}

export const getUserData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", userId)
      .single();

    if (error) {
      return { success: false, msg: error?.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("error shown", error);
    return { success: false, msg: error };
  }
};


export const updateUserData = async (userId: string | undefined, data: any) => {
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId)

    if (error) {
      return { success: false, msg: error?.message };
    }

    return { success: true, msg: "Succesfully updated profile" };
  } catch (error) {
    console.log("error shown", error);
    return { success: false, msg: error };
  }
};

// user image service
export const getUserImageSrc = (imagePath: string | null): { uri: string } => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath) || { uri: require("../assets/icons/userImg.png") }
  } else {
    return { uri: require("../assets/icons/userImg.png") }
  }
}

export const getSupabaseFileUrl = (filePath: string): { uri: string } => {
  if (filePath) {
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`
    }
  } else {
    return { uri: '' }
  }
}



//upload image to supabase bucket
export const uploadFile = async ({ folderName, fileUri, isImage = true } : UploadProps): Promise<UploadResult> => {
  try {
    let fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let imageData = decode(fileBase64); // converts and gives an array buffer

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        contentType: isImage ? "image/*" : "video/*",
        cacheControl: "3600",
        upsert: false,
    });

    if (error) {
      console.log("file upload error", error);
      return { success: false, msg: "FAILED TO UPLOAD" };
    }

    return {
      success: true,
      msg: "File uploaded successfully",
      data: data.path,
    };
  } catch (error) {
    console.log("file upload error", error);
    return { success: false, msg: "FAILED TO UPLOAD" };
  }
};

export const getFilePath = (folderName: string, isImage: boolean): string => {
  return `/${folderName}/${(new Date()).getTime()}${isImage ? ".png" : ".mp4"}`;
};
