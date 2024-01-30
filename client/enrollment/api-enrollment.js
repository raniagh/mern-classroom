const create = async (courseId, token) => {
  try {
    let response = await fetch("/api/enrollment/new/" + courseId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const read = async (enrollmentId, token) => {
  try {
    let response = await fetch("/api/enrollment/" + enrollmentId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

const complete = async (enrollmentId, token, enrollment) => {
  try {
    let response = await fetch("/api/enrollment/complete/" + enrollmentId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: enrollment,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export { create, read, complete };
