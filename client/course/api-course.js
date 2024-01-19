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

const read = async (courseId, signal) => {
  try {
    let response = await fetch("/api/courses/" + courseId, {
      method: "GET",
      signal: signal,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, listByInstructor, read };
