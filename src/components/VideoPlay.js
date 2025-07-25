import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";
import { toast } from "react-toastify";

const VideoPlay = ({ data, close, media_type }) => {
  const user = localStorage.getItem("auth");

  useEffect(() => {
    if (!user) {
      toast.error("Please login to watch the video.");
      close(); // Close the modal
    }
  }, [user, close]);

  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );

  if (!user) return null; // Don't render anything if not logged in

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full  max-h-[80vh] max-w-screen-lg aspect-video rounded  relative">
        <button
          onClick={close}
          className=" absolute -right-1 -top-6 text-3xl z-50"
        >
          <IoClose />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default VideoPlay;
