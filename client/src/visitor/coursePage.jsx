import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseFacade from "../services/courseFacade";

function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await courseFacade.getCourseById(courseId);
        setCourse(courseData);

        // Calculate progress
        const completedLessons = courseData.lessons.filter(lesson => lesson.completed).length;
        const totalLessons = courseData.lessons.length;
        setProgress((completedLessons / totalLessons) * 100);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Course Title Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img src={course.course_image} alt="Course Icon" className="w-32 h-32" />
              <h1 className="text-4xl font-bold">{course.name}</h1>
            </div>
            <div className="text-2xl font-semibold text-purple-600">{course.subtitle}</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Final Quiz Button */}
          <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg mb-8 flex items-center space-x-2">
            <span className="font-bold">Quiz Finale</span>
            {progress === 100 ? (
              <span role="img" aria-label="unlock icon">🔓</span>
            ) : (
              <span role="img" aria-label="lock icon">🔒</span>
            )}
          </button>

          {/* Topics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {course.lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-yellow-400 p-6 rounded-lg shadow-md flex items-start space-x-4"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                  <p className="text-lg">{lesson.description}</p>
                </div>
                <div className="ml-auto">
                  {lesson.completed ? (
                    <span className="text-green-500 font-bold text-xl">✔️</span>
                  ) : (
                    <span className="text-gray-500 font-bold text-xl">⏳</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CoursePage;