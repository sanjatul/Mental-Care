import React from "react";
import styles from "./PersonalBlogs.module.css";
import PersonalBlog from "../personal-blog/PersonalBlog";
function PersonalBlogs() {
  const blogs = [
    {
      id: 1,
      title: "Anxiety",
      userId: "4c059121-fd59-4487-a4c4-49362fa9bb2a",
      userName: "Emily Smith",
      profilePicture:
        "https://localhost:7254/images/af6fc6e1-9ba8-495e-8d89-214980de2136.jpg",
      description:
        "Anxiety manifests as a relentless force, dragging individuals into a turbulent sea of worry and fear. It tightens its grip, hastens breaths, and propels thoughts into a relentless race. Amidst this chaos, a glimmer of calm exists, a beacon of hope for those willing to seek it. Through understanding and coping mechanisms, individuals can navigate this storm, finding solace and reclaiming their inner peace.",
      createdDate: "2024-04-27T15:12:45.8314362",
      image: "/images/Depression.jpg",
    },
    {
      id: 2,
      title: "Depression",
      userId: "4c059121-fd59-4487-a4c4-49362fa9bb2a",
      userName: "David Khanna",
      profilePicture:
        "https://localhost:7254/images/af6fc6e1-9ba8-495e-8d89-214980de2136.jpg",
      description:
        "Depression, a shadowed labyrinth of despair, engulfs individuals in its suffocating grip, distorting reality into a bleak canvas devoid of color. Once vibrant emotions are muted, hope seems but a distant memory. Yet, even within this darkness, a flicker of light persists—a plea for solace and understanding. Through support, therapy, and self-discovery, individuals can embark on a journey towards healing, embracing the resilience within them to overcome the shadows.",
      createdDate: "2024-04-27T15:12:45.8314362",
      image: "/images/depression5.jpeg",
    },
    {
      id: 3,
      title: "Stress Management",
      userId: "4c059121-fd59-4487-a4c4-49362fa9bb2a",
      userName: "Sophia Johnson",
      profilePicture:
        "https://localhost:7254/images/af6fc6e1-9ba8-495e-8d89-214980de2136.jpg",
      description:
        "Stress Management entails navigating the tempestuous waters of life's demands with grace and resilience. It requires cultivating mindfulness amidst chaos, finding moments of tranquility amidst the cacophony. By embracing techniques such as mindfulness, meditation, and self-care, individuals can weather the storm of stress, emerging stronger and wiser on the other side. It's a journey of self-discovery and empowerment, where each challenge becomes an opportunity for growth and transformation.",
      createdDate: "2024-04-26T11:45:19.8314362",
      image: "/images/depression2.jpg",
    },
    {
      id: 4,
      title: "Self-Care",
      userId: "4c059121-fd59-4487-a4c4-49362fa9bb2a",
      userName: "Michael Brown",
      profilePicture:
        "https://localhost:7254/images/af6fc6e1-9ba8-495e-8d89-214980de2136.jpg",
      description:
        "Self-Care stands as a gentle reminder to nurture one's well-being amidst life's incessant demands. It encompasses acts of compassion towards oneself, acknowledging and honoring personal needs and boundaries. In the quiet moments amidst the chaos, lies the opportunity for replenishment and rejuvenation. Self-care is not selfish but a necessary investment in one's physical, emotional, and mental health. It's a practice of self-love and acceptance, fostering resilience and empowerment in the face of adversity.",
      createdDate: "2024-04-25T14:37:59.8314362",
      image: "/images/depression3.jpg",
    },
    {
      id: 5,
      title: "Mindfulness",
      userId: "b6c7d8e9-f0a1-b2c3-d4e5-f6a7b8c9d0e1",
      userName: "Emma Wilson",
      profilePicture:
        "https://localhost:7254/images/af6fc6e1-9ba8-495e-8d89-214980de2136.jpg",
      description:
        "Mindfulness invites individuals on a journey inward, a practice of cultivating presence and awareness in each moment. It involves being fully engaged with the present experience, without judgment or attachment to past regrets or future worries. Through mindfulness practices such as meditation, deep breathing, and conscious living, individuals can foster a deeper connection with themselves and the world around them. It's a transformative journey that enhances well-being, reduces stress, and fosters greater clarity and inner peace in daily life.",
      createdDate: "2024-04-24T08:20:12.8314362",
      image: "/images/depression4.jpg",
    },
  ];

  return (
    <div className="mt-5 pe-5">
      {blogs.length == 0 && <h1>Sorry. No blogs yet...</h1>}
      {blogs.length > 0 &&
        blogs.map((blog) => (
          <div>
            <PersonalBlog key={blog.id} blog={blog} />
          </div>
        ))}
    </div>
  );
}

export default PersonalBlogs;
