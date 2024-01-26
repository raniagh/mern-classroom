const create = async (userId, token, course) => {
  try {
    let response = await fetch("/api/courses/by/" + userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: course,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByInstructor = async (userId, token, signal) => {
  try {
    let response = await fetch("/api/courses/by/" + userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (courseId) => {
  try {
    let response = await fetch("/api/courses/" + courseId, {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const newLesson = async (courseId, lesson, token) => {
  try {
    let response = await fetch("/api/courses/" + courseId + "/lesson/new", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ lesson: lesson }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const update = async (courseId, course, token) => {
  try {
    let response = await fetch("/api/courses/" + courseId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: course,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const listPublished = async (signal) => {
  try {
    let response = await fetch("/api/courses/published", {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByInstructor, read, newLesson, update, listPublished };
