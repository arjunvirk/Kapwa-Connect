import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { createHomework } from "../actions/homeworkActions";

import { getStudents } from "../actions/userActions";
import { toast } from "sonner";

const CreateHomework = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState("");

  const [file, setFile] = useState(null);

  const [assignedTo, setAssignedTo] = useState("");

  const [assignToAll, setAssignToAll] = useState(false);

  // HOMEWORK CREATE

  const homeworkCreate = useSelector((state) => state.homeworkCreate);

  const { loading, error, success } = homeworkCreate;

  // STUDENT LIST

  const studentList = useSelector((state) => state.studentList);

  const {
    students,
    loading: studentsLoading,
    error: studentsError,
  } = studentList;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !description || !deadline) {
      toast.warning("Please fill all required fields");
      return;
    }

    if (!assignToAll && !assignedTo) {
      toast.error("Please select a student or assign to all");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);

    formData.append("description", description);

    formData.append("deadline", deadline);

    formData.append("assignToAll", assignToAll);

    formData.append("assignedTo", assignedTo);

    if (file) {
      formData.append("file", file);
    }

    dispatch(createHomework(formData));
  };

  // FETCH STUDENTS

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  // RESET FORM AFTER SUCCESS

  useEffect(() => {
    if (success) {
      toast.success("Homework created successfully");

      setTitle("");
      setDescription("");
      setDeadline("");
      setAssignToAll(false);
      setAssignedTo("");
      setFile(null);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (studentsError) {
      toast.error("Failed to load students");
    }
  }, [error, studentsError]);

  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border p-8 shadow-sm">
        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Create Homework</h1>

          <p className="mt-3 text-gray-600">
            Assign homework and activities to students.
          </p>
        </div>

        {/* Form */}

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Homework Title
            </label>

            <input
              type="text"
              placeholder="Enter homework title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Upload File */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Upload File
            </label>

            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full cursor-pointer rounded-xl border px-4 py-3"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows="6"
              placeholder="Write homework instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            ></textarea>
          </div>

          {/* Deadline */}

          <div>
            <label className="mb-2 block text-sm font-medium">Deadline</label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Assign Student */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Assign Student
            </label>

            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              disabled={assignToAll}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
            >
              <option value="">Select Student</option>

              {studentsLoading ? (
                <option>Loading students...</option>
              ) : studentsError ? (
                <option>Failed to load students</option>
              ) : (
                students?.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Assign To All */}

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={assignToAll}
              onChange={(e) => setAssignToAll(e.target.checked)}
              className="h-4 w-4"
            />

            <label className="text-sm font-medium">
              Assign to all students
            </label>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black py-3 text-white transition hover:opacity-90 disabled:opacity-70 cursor-pointer"
          >
            {loading ? "Publishing Homework..." : "Create Homework"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateHomework;
