import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Room() {
  const { roomId } = useParams();
  const authUser = localStorage.getItem("mc_authUser");
  const parsedAuthUser = JSON.parse(authUser);
  const meetingRef = useRef(null);
  const navigate = useNavigate();
  const myMeeting = async (element) => {
    function getUrlParams(url = window.location.href) {
      let urlStr = url.split("?")[1];
      console.log(urlStr);
      return new URLSearchParams(urlStr);
    }

    function randomID(len) {
      let result = "";
      if (result) return result;
      var chars =
          "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
        maxPos = chars.length,
        i;
      len = len || 5;
      for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return result;
    }

    const roomID = getUrlParams().get("roomId") || roomId;
    const appID = 625287655;
    const serverSecret = "2b4b2efd83e571b4c43efd171196cb73";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);

    meetingRef.current = zc; // Store the instance in ref

    const join_url =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?roomId=" +
      roomID;
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: join_url,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onLeaveRoom: () => {
        navigate(-1);
      },
    });
  };

  useEffect(() => {
    // Cleanup when the component unmounts
    return () => {
      if (meetingRef.current) {
        meetingRef.current.destroy(); // Use destroy() to clean up
      }
    };
  }, []);

  return (
    <div className="container">
      <div ref={myMeeting} style={{ height: "70%", width: "80%" }} />
    </div>
  );
}

export default Room;
