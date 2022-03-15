import { fStorage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState, useEffect } from "react";
import useAppToast from "@/hooks/useAppToast";

export const useFirebaseStorage = (
  userId: string,
  file: File | null,
  setImgSrc: Function
) => {
  const { triggerToast } = useAppToast();
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  // runs every time the file value changes
  useEffect(() => {
    if (file) {
      // storage ref
      const storageRef = ref(
        fStorage,
        // @ts-ignore
        `/profiles/${userId}.${file.name.split(".")[1]}`
      );

      uploadBytesResumable(storageRef, file).on(
        "state_changed",
        (snap) => {
          // track the upload progress
          let percentage = Math.round(
            (snap.bytesTransferred / snap.totalBytes) * 100
          );
          // @ts-ignore
          setProgress(percentage);
        },
        (err: any) => {
          setError(err);
          triggerToast("Upload Error", err.message, "error");
        },
        async () => {
          // get the public download img url
          const downloadUrl = (await getDownloadURL(storageRef)) as string;

          // save the url to local state
          // @ts-ignore
          setImgSrc((prev) => ({ ...prev, src: downloadUrl }));
        }
      );
    }
  }, [file]);

  return { progress, error };
};
